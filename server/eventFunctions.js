import { Meteor } from "meteor/meteor";
import { google } from "googleapis";
import { authorize } from "./authentication";
import { emailInvitee } from "./nodemailer";

Meteor.methods({
  async "event.create"(summary, location, description, startTimeStamp, endTimeStamp, timeZone, attendees) {
    try {
      const event = {
        summary,
        location,
        description,
        'start': {
          'dateTime': startTimeStamp,
          timeZone,
        },
        'end': {
          'dateTime': endTimeStamp,
          timeZone,
        },
        attendees,
        'reminders': {
          'useDefault': false,
        },
      };

      const auth = await authorize();
      const calendar = google.calendar({ version: "v3", auth });
      const res = await calendar.events.insert({
        auth: auth,
        calendarId: 'primary',
        resource: event,
      });
      emailInvitee(summary, location, description, startTimeStamp, endTimeStamp, timeZone, attendees)
      return res.data.htmlLink;
    } catch (error) {
      throw new Meteor.Error('Error contacting the Calendar service: ' + error);
    }
  }
});
    // authorize().then(auth => {
    //   const calendar = google.calendar({ version: "v3", auth });
    //   calendar.events.insert({
    //     auth: auth,
    //     calendarId: 'primary',
    //     resource: event,
    //   }, function (err, event) {
    //     if (err) {
    //       console.log('There was an error contacting the Calendar service: ' + err);
    //     }
    //     console.log('Event created: %s', event.data.htmlLink);
    //   });
    // });

    //   const event = {
    //     'summary': 'Moment of truth',
    //     'location': '800 Howard St., San Francisco, CA 94103',
    //     'description': 'A chance to hear more about Google\'s developer products.',
    //     'start': {
    //         'dateTime': '2023-02-06T09:00:00-07:00',
    //         'timeZone': 'America/Los_Angeles',
    //     },
    //     'end': {
    //         'dateTime': '2023-02-07T17:00:00-07:00',
    //         'timeZone': 'America/Los_Angeles',
    //     },
    //     'attendees': [
    //         {'email': 'tomasbelmarcosta@gmail.com'},
    //     ],
    //     'reminders': {
    //         'useDefault': false,
    //     },
    // };
