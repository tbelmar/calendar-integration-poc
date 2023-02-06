import { Meteor } from "meteor/meteor";
import { google } from "googleapis";
import { authorize } from "./authentication";

Meteor.methods({
    "event.create"() {
        const event = {
            'summary': 'Moment of truth',
            'location': '800 Howard St., San Francisco, CA 94103',
            'description': 'A chance to hear more about Google\'s developer products.',
            'start': {
                'dateTime': '2023-02-06T09:00:00-07:00',
                'timeZone': 'America/Los_Angeles',
            },
            'end': {
                'dateTime': '2023-02-07T17:00:00-07:00',
                'timeZone': 'America/Los_Angeles',
            },
            'attendees': [
                {'email': 'tomasbelmarcosta@gmail.com'},
            ],
            'reminders': {
                'useDefault': false,
            },
        };

        authorize().then(auth => {
            const calendar = google.calendar({version: "v3", auth});

            calendar.events.insert({
                auth: auth,
                calendarId: 'primary',
                resource: event,
                }, function(err, event) {
                if (err) {
                    console.log('There was an error contacting the Calendar service: ' + err);
                    return;
                }
                console.log('Event created: %s', event.htmlLink);
            });
        })
    }
});