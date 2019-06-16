var info = document.getElementById("info");
var logo = document.getElementById("logo");
var landscape = document.getElementById("landscape");
var playButton = document.getElementById("playButton");
var menuButton = document.getElementById("menuButton");
var lsVideo = document.getElementById("lsVideo");
var timer;
var fadeInBuffer = false;
var isPlayingVideo = true;

function menuFunction() {
  info.classList.remove('opacity-off');
  info.classList.add('opacity-on');
  logo.classList.remove('opacity-off');
  logo.classList.add('opacity-on');
  landscape.classList.remove('opacity-on');
}

function lsFunction() {
  landscape.classList.add('opacity-on');
  info.classList.remove('opacity-on');
  info.classList.add('opacity-off');
  logo.classList.remove('opacity-on');
  logo.classList.add('opacity-off');
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
    setTimeout(
      function(){
        playButton.classList.add('d-none');
        landscape.classList.add('opacity-on');
        info.classList.add('opacity-off');
        logo.classList.add('opacity-off');
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
            logo.classList.remove('init-opacity-off');

            // 2. This code loads the IFrame Player API code asynchronously.
            var tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          }, 3000)
      }, 300);
}

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads._j5QY5LbCOM
var playerMusic;
var playerFx;
function onYouTubeIframeAPIReady() {
    playerMusic = new YT.Player('videoMusic', {
        width: '100%',
        videoId: 'IPSRJ0CBqBw',
        events: {
            'onReady': onPlayerMusicReady
        }
    });
    playerFx = new YT.Player('videoFx', {
        width: '100%',
        videoId: '_j5QY5LbCOM',
        events: {
            'onReady': onPlayerFxReady
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerMusicReady(event) {
    event.target.setVolume(95);
    event.target.seekTo(0);
    event.target.playVideo();
}

function onPlayerFxReady(event) {
    event.target.setVolume(60);
    event.target.seekTo(30);
    event.target.playVideo();
}

function pauseVideo() {
  if (isPlayingVideo) {
    playerMusic.pauseVideo();
    playerFx.pauseVideo();
    document.getElementById("togglePlayButton").src="img/play.png";
    lsVideo.pause();
    isPlayingVideo = false;
  } else {
    playerMusic.playVideo();
    playerFx.playVideo();
    document.getElementById("togglePlayButton").src="img/pause.png";
    lsVideo.play();
    isPlayingVideo = true;
  }
}
