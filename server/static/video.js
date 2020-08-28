$(function() {
  $("*").click(function() {
    $("video").get(0).play();
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
