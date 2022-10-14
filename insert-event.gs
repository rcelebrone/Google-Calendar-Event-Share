function main() {
  const fromCalendar = "rcelebrone@gmail.com";
  const toCalendar = "rodrigo.celebrone@madeiramadeira.com.br";
  updateEvents(fromCalendar, toCalendar);
}

function lastMinuteReferenceDate() {
  const now = new Date();
  now.setMinutes(-1);
  return now.toISOString();
}

function events(from) {
  return Calendar.Events.list(from, {
    updatedMin: lastMinuteReferenceDate(),
    maxResults: 15,
    showDeleted: true,
    showHiddenInvitations: true
  });
}

function updateEvents(from, to) {
  const eventsItems = events(from);

  if (eventsItems.items && eventsItems.items.length > 0) {
    for (var i = 0; i < eventsItems.items.length; i++) {
        var event = eventsItems.items[i];
        copyEventToAgenda(event, to);
    }
  } else {
    console.log('No events found.');
  }
}

function copyEventToAgenda(event, to) {

  event.eventType = 'focusTime';
  event.summary = '[personal agenda]';
  delete event.etag;
  //delete event.id;
  delete event.iCalUID;
  delete event.htmlLink;
  delete event.status;
  event.transparency = 'opaque';
  event.colorId = 8;
  event.status = 'confirmed';

  try {
    Calendar.Events.insert(event, to);
  } catch(e) {
    Logger.log(event);
  }
}
