function open_fullscreen(video) {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) { /* Firefox */
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) { /* IE/Edge */
    video.msRequestFullscreen();
  }
}
$(function() {
  $("*").click(function() {
    var video = $("video").get(0)
    video.play()
    // $("body").css("background", "red")
    open_fullscreen(video)
  });
  setInterval(function() {
    $.get('/api/status', function(data, status) {
      var video = $('video').get(0)
      if (data == 'video') {
        video.play()
      }
      else if (data == 'reset') {
        video.pause()
        video.currentTime = 0;
      }
      else {
        video.pause()
      }
    })
  }, interval)
})
