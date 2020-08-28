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
    $.get('/automation/status', function(data, status) {
      $('#automation_status').text(JSON.stringify(data))
    })
  }, interval)
})
function automation_start() {
  $.get('/automation/start', {
    period: $('#automation_period').val(),
    audio_time: $('#automation_audio_time').val()
  })
}
function automation_stop() {
  $.get('/automation/stop')
}
