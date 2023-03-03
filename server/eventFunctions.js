import { Meteor } from "meteor/meteor";
import { google } from "googleapis";
import { authorize } from "./authentication";
import { emailInvitee } from "./postmark";
import * as zipcode_to_timezone from 'zipcode-to-timezone';
// import { ZipToTz } from 'zip-to-timezone';
const { lookup } = require('zip2tz');
// let zipcode_to_timezone = require( 'zipcode-to-timezone' );

Meteor.methods({
  async "event.create"(summary, location, description, startTimeStamp, endTimeStamp, timeZone, attendees, htmlData) {
    console.log('getting: ', startTimeStamp, endTimeStamp);
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
      // emailInvitee(summary, location, description, startTimeStamp, endTimeStamp, attendees, htmlData)
      return res.data.htmlLink;
    } catch (error) {
      console.log("Error in event.create: ", error);
      throw new Meteor.Error('Error contacting the Calendar service: ', error);
    }
  },

  async "event.email"(summary, location, description, startTimeStamp, endTimeStamp, attendees, htmlData) {
    try {

      const { POSTMARK_TOKEN, SERVICE_EMAIL } = process.env;
      emailInvitee(summary, location, description, startTimeStamp, endTimeStamp, attendees, htmlData, SERVICE_EMAIL, POSTMARK_TOKEN);
      return 'Success';
    } catch (error) {
      console.log("Error in event.email: ", error);
      throw new Meteor.Error('Error emailing the invitee: ', error);
    }
  },

  "convertZipToTimezone"(zipcode) {
    try {
      const tz2 = zipcode_to_timezone.lookup(zipcode);
      console.log('zipcode', tz2);
      const tz3 = lookup(zipcode);
      console.log('zip2tz', tz3);
      // const tz = new ZipToTz().short(String(zipcode)); // busteddd
      // console.log('zip:', tz);

      return tz2;
    } catch (err) {
      console.log(err);
    }
  }

});
