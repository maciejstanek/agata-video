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
      translations = {
        "video": "odtwarzanie wideo",
        "music": "odtwarzanie audio",
        "reset": "odtwarzanie zatrzymane",
      }
      $('#status').text(translations[data])
    })
  }, interval)
})
