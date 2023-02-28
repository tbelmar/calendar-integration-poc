import { Meteor } from "meteor/meteor";
import { google } from "googleapis";
import { authorize } from "./authentication";
import { emailInvitee } from "./nodemailer";

Meteor.methods({
  async "event.create"(summary, location, description, startTimeStamp, endTimeStamp, timeZone, attendees, htmlData) {
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
      emailInvitee(summary, location, description, startTimeStamp, endTimeStamp, attendees, htmlData)
      return res.data.htmlLink;
    } catch (error) {
      console.log("Error in event.create: ", error);
      throw new Meteor.Error('Error contacting the Calendar service: ', error);
    }
  },

  async "event.email"(summary, location, description, startTimeStamp, endTimeStamp, attendees, htmlData) {
    try {
      emailInvitee(summary, location, description, startTimeStamp, endTimeStamp, attendees, htmlData);
      return 'Success';
    } catch (error) {
      console.log("Error in event.email: ", error);
      throw new Meteor.Error('Error emailing the invitee: ', error);
    }
  },
});
