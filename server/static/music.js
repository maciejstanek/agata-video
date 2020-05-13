$(function() {
  setInterval(function() {
    $.get('/api/status', function(data, status) {
      var music = $('audio').get(0)
      if (data == 'music') {
        music.play()
      }
      else if (data == 'reset') {
        music.pause()
        music.currentTime = 0;
      }
      else {
        music.pause()
      }
    })
  }, interval)
})
