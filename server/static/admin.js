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
function automation_start() {
  $.get('/automation?command=start')
  // automation_period
  // automation_audio_time
}
function automation_stop() {
  $.get('/automation?command=stop')
}
