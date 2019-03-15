$(document).ready(function() {
  update_depend_wording_for_jira();
  update_issue_time_stamps_to_show_specific_time();
  turn_idea_icons_orange();

  setInterval(function() {
    update_depend_wording_for_jira();
    update_issue_time_stamps_to_show_specific_time();
    turn_idea_icons_orange();
  }, 500);
});

function update_depend_wording_for_jira() {
  var dependent_array = document.querySelectorAll('[title="is dependent upon"]');
  for (let i = 0; i < dependent_array.length; i++) {
    dependent_array[i].innerText = 'Issues that cannot be started until this is complete (dependent upon):';
    dependent_array[i].title = 'Issues that cannot be started until this is complete (dependent upon):';
  }

  var depends_array = document.querySelectorAll('[title="depends on"]');
  for (let i = 0; i < depends_array.length; i++) {
    depends_array[i].innerText = 'Issues that must be completed before this can be worked (depends on):'
    depends_array[i].title = 'Issues that must be completed before this can be worked (depends on):'
  }
}

// Updates various time stamps while viewing a ticket.
function update_issue_time_stamps_to_show_specific_time() {
  // If we currently need to add the new elements - this is false if the elements already exist.
  if (document.querySelectorAll('.nates-awesome-date-element').length === 0) {
    update_history_section();
  }

  // If we don't carefully check that the iframe exists on the page, it will throw errors.
  activity_iframe = document.getElementById('gadget-0');
  if (activity_iframe != null) {
    if (activity_iframe.contentDocument.getElementsByClassName('nates-awesome-date-element').length === 0) {
      update_activity_section();
    }
  }
}

// When viewing the history of a ticket, you will now see the specific time without having to mouse over it.
// I would have modified the original time element, but Jira auto-updates that regularly, so we make a new element near it instead.
// I followed a similar convention in update_activity_section.
// TODO: Update to be specific to the history section.
// TODO: Update to target based on the time element (possibly?)
function update_history_section() {
  var container_array = document.querySelectorAll('div.action-details');
  var time_stamp_array = [];

  for (let i = 0; i < container_array.length; i++) {
    container_array[i].children[1].style = 'display: none;';
    time_stamp_array.push(container_array[i].children[1]);
  }

  for (let i = 0; i < time_stamp_array.length; i++) {
    var inserted_element = document.createElement('div');
    inserted_element.className = 'nates-awesome-date-element';
    time_stamp = time_stamp_array[i].title || time_stamp_array[i].children[0].title // In the Comments section, you need the second part of this 'or' statement in order for the cooler date times to show up.
    inserted_element.innerText = time_stamp;

    container_array[i].appendChild(inserted_element);
  }
}

// Updates the timestamps to be explicit in the activity section of a ticket.
function update_activity_section() {
  // Activity section displays changes within iframes, so we can't target it directly like with the history section.
  var iframe_container = document.getElementById('gadget-0').contentDocument;
  var container_array = iframe_container.getElementsByClassName('activity-item-info');
  var time_stamp_array = [];

  for (let i = 0; i < container_array.length; i++) {
    container_array[i].children[1].style = 'display: none;';
    time_stamp_array.push(container_array[i].children[1]);
  }

  for (let i = 0; i < time_stamp_array.length; i++) {
    var inserted_element = document.createElement('div');
    inserted_element.className = 'nates-awesome-date-element';
    inserted_element.style = 'display: inline-block; position: relative; width: 225px;' // iframes don't receive the styling from our css unfortunately. :(
    inserted_element.innerText = time_stamp_array[i].title;

    container_array[i].appendChild(inserted_element);
  }
}

// Updates the background of the icons of Idea tickets orange
function turn_idea_icons_orange() {
  idea_icon_substring = '&avatarId=14930';
  images = document.querySelectorAll('img');

  for (let i = 0; i < images.length; i++) {
    if (images[i].src.indexOf(idea_icon_substring) != -1) {
      images[i].src = chrome.extension.getURL("/images/jira_idea_question_mark_better.jpg");
    }
  }
}
