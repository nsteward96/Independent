function initPreferences() {

}

function savePreferences() {
  var dependsOnPreference = $('#depends-on-checkbox').checked;
  chrome.storage.sync.set({
    // thing: 'thing!'
  }, function() {
    var status = document.getElementById('saved-status');
    setTimeout(function() {status.textContent = '';}, 4000);
  });
}

function setup_save_listener() {
  save_button = $('#save-button');
  $(save_button).off('click.savePreferences').on('click.savePreferences', savePreferences);
}

$(document).ready(function() {

});