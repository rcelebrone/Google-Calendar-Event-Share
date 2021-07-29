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
    maxResults: 100,
    showDeleted: true,
    showHiddenInvitations: true
  });
}

function updateEvents(from, to) {
  const eventsItems = events(from);

  if (eventsItems.items && eventsItems.items.length > 0) {
    for (var i = 0; i < eventsItems.items.length; i++) {
        var event = eventsItems.items[i];
        inviteSomeoneToEvent(from, to, event);
    }
  } else {
    console.log('No events found.');
  }
}

function inviteSomeoneToEvent(from, to, event) {
  event.attendees.push({
      "displayName": to,
      "email": to
    });

  Calendar.Events.patch({
    "attendees": event.attendees
  }, from, event.id);
}
