$(function() {
  // $("*").click(function() {
  //   $("audio").get(0).play();
  // });
  setInterval(function() {
    $.get('/api/status', function(data, status) {
      var music = $('audio').get(0)
      if (data == 'music') {
        if (music.currentTime == 0) {
          music.play()
        }
      }
      else if (data == 'reset') {
        music.pause()
        music.currentTime = 0;
      }
      else {
        music.pause()
        // Music should go back ot start when restarting.
        music.currentTime = 0;
      }
    })
  }, interval)
})
