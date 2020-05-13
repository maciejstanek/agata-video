function api_music() {
  $.get('/api/music')
}
function api_video() {
  $.get('/api/video')
}
function api_reset() {
  $.get('/api/reset')
}
$(function() {
  setInterval(function() {
    $.get('/api/status', function(data, status) {
      $('#status').text(data)
    })
  }, interval)
})
