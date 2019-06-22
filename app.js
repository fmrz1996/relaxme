var info = document.getElementById("info");
var logo = document.getElementById("logo");
var landscape = document.getElementById("landscape");
var playButton = document.getElementById("playButton");
var menuButton = document.getElementById("menuButton");
var lsVideo = document.getElementById("lsVideo");
var footer = document.getElementById("footer");
var timer;
var fadeInBuffer = false;
var isPlayingVideo = true;

function menuFunction() {
  info.classList.remove('opacity-off');
  info.classList.add('opacity-on');
  logo.classList.remove('opacity-off');
  logo.classList.add('opacity-on');
  footer.classList.remove('opacity-off');
  footer.classList.add('opacity-on');
  landscape.classList.remove('opacity-on');
}

function lsFunction() {
  landscape.classList.add('opacity-on');
  info.classList.remove('opacity-on');
  info.classList.add('opacity-off');
  logo.classList.remove('opacity-on');
  logo.classList.add('opacity-off');
  footer.classList.remove('opacity-on');
  footer.classList.add('opacity-off');
}

$(document).mousemove(function(){
  if(!fadeInBuffer){
    if(timer){
      clearTimeout(timer);
      timer = 0;
    }
  } else {
    landscape.classList.remove('hide-cursor');
    $("#menuButton").css("opacity", "");
    $(".togglePlayButton").css("opacity", "");
    $(".nextButton").css("opacity", "");
    fadeInBuffer = false;
  }
timer = setTimeout(
  function(){
    if(isPlayingVideo){
      if($('.btn:hover').length == 0){
        landscape.classList.add('hide-cursor');
        $("#menuButton").css("opacity", 0);
        $(".togglePlayButton").css("opacity", 0);
        $(".nextButton").css("opacity", 0);
        fadeInBuffer = true;
      }
    }
  }, 5000);
});

function playFunction() {
    playButton.classList.add('init-opacity-off');
    logo.classList.add('init-opacity-off');
    footer.classList.add('init-opacity-off');
    setTimeout(
      function(){
        playButton.classList.add('d-none');
        landscape.classList.add('opacity-on');
        info.classList.add('opacity-off');
        logo.classList.add('opacity-off');
        footer.classList.add('opacity-off');
        setTimeout(
          function(){
            document.getElementById("sectionMusic").innerHTML = "<div id='videoMusic'></div>";
            document.getElementById("sectionFx").innerHTML = "<div id='videoFx'></div>";
            document.getElementById("infoMusic").classList.remove('d-none');
            document.getElementById("infoFx").classList.remove('d-none');
            document.getElementById("lsButton").classList.remove('d-none');
            document.getElementById("player").classList.remove('d-none');
            menuButton.classList.remove('d-none');
            logo.classList.add('logo');
            footer.classList.add('fade-in');
            logo.classList.remove('init-opacity-off');
            footer.classList.remove('init-opacity-off');

            var tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          }, 3000)
      }, 300);
}

var playerMusic;
var playerFx;
var randomIndexMusic = Math.floor(Math.random() * 23);
var randomIndexFx = Math.floor(Math.random() * 113);
function onYouTubeIframeAPIReady() {
    playerMusic = new YT.Player('videoMusic', {
        width: '100%',
        playerVars: {
          listType:'playlist',
          list: 'PLDMVPWmf2MSVR2M_krZ27xyisejTG-tQp',
          index: randomIndexMusic
        },
        events: {
            'onReady': onPlayerMusicReady
        }
    });
    playerFx = new YT.Player('videoFx', {
        width: '100%',
        playerVars: {
          listType:'playlist',
          list: 'PLfy5ErD61bt9GB5QY1NWKVEQqcxdtI-Xw',
          index: randomIndexFx
        },
        events: {
            'onReady': onPlayerFxReady
        }
    });
}

function onPlayerMusicReady(event) {
    event.target.setVolume(75);
    event.target.seekTo(0);
    event.target.playVideo();
    setTimeout(function() {
      event.target.setShuffle({'shufflePlaylist': true});
      event.target.setLoop({'loopPlaylists': true});
    }, 1000);
}

function onPlayerFxReady(event) {
    event.target.setVolume(100);
    event.target.seekTo(30);
    event.target.playVideo();
    setTimeout(function() {
      event.target.setLoop({'loopPlaylists': true});
      event.target.setShuffle({'shufflePlaylist': true});
    }, 1000);
}

function pauseVideo() {
  if (isPlayingVideo) {
    fadeOutSound();
    document.getElementById("togglePlayButton").src="img/play.png";
    lsVideo.pause();
    isPlayingVideo = false;
    setTimeout(function() {
      playerMusic.pauseVideo();
      playerFx.pauseVideo();
    }, 500);
  } else {
    playerMusic.playVideo();
    playerFx.playVideo();
    fadeInSound();
    document.getElementById("togglePlayButton").src="img/pause.png";
    lsVideo.play();
    isPlayingVideo = true;
  }
}

function nextVideo() {
  document.getElementById("togglePlayButton").src="img/pause.png";
  isPlayingVideo = false;
  lsVideo.play();
  fadeOutSound();
  setTimeout(function() {
    playerMusic.nextVideo();
    playerFx.nextVideo();
    isPlayingVideo = true;
    fadeInSound();
  }, 500);
}

function fadeInSound() {
  fadeInInterval = setInterval(function() {
    if(isPlayingVideo){
      console.log('subiendo');
      changeVolume(1) , 10 * 10
    }
   });
}

function fadeOutSound() {
  fadeOutInterval = setInterval(function() {
    if(!isPlayingVideo){
      console.log('bajando');
      changeVolume(0) , 10 * 10
    }
   });
}

function changeVolume(i) {
  if(i) {
    if(playerMusic.getVolume() <= 70) {
      playerMusic.setVolume(playerMusic.getVolume() + 1);
    }
    playerFx.setVolume(playerFx.getVolume() + 1);
    if(playerFx.getVolume() == 100) {
      clearInterval(fadeInInterval);
    }
  } else {
    playerMusic.setVolume(playerMusic.getVolume() - 1);
    playerFx.setVolume(playerFx.getVolume() - 1);
    if(playerFx.getVolume() == 0) {
      clearInterval(fadeOutInterval);
    }
  }
}
