/**
 * Creates an .ics file and sends to an email
 *
 * Notable issues:
 *
 */

import { Meteor } from "meteor/meteor";
import ical from "ical-generator";
import * as postmark from "postmark";

const FILL_ME_IN = null;
const POSTMARK_TOKEN = "";
const Email = "daurham95@live.com";
const Pass = "Bentley1279";
const Service = "Outlook365";

const createICSFile = async (start, end, title, description, location) => {
  try {
    const eventObj = {
      start,
      end,
      title,
      description,
      id: "invite", //Some unique identifier
      owner: { name: "ActualFood", email: Email },
      location,
    };

    const cal = ical();

    await cal.events([
      {
        start: eventObj.start,
        end: eventObj.end,
        summary: eventObj.title,
        uid: eventObj.id, // Some unique identifier
        sequence: 0,
        description: eventObj.description,
        location: eventObj.location,
        organizer: {
          name: eventObj.owner.name,
          email: eventObj.owner.email,
        },
        method: "request",
      },
    ]);
    const path = eventObj.id + ".ics";
    // const path = __dirname + '/uploads/' + eventObj.id + '.ics';
    // console.log('path1: ', path);
    await cal.save(path);
    // console.log('saved: ', path);
    return path;
  } catch (error) {
    throw new Meteor.Error("Error generating .ICS file: ", error);
  }
};


export const emailInvitee = async (summary, location, description, startTimeStamp, endTimeStamp, timeZone, attendees, html) => {
  try {
    const path = await createICSFile(startTimeStamp, endTimeStamp, summary, description, location);
    const invitee = attendees[0].email;

    // Send an email:
    const client = new postmark.ServerClient(POSTMARK_TOKEN);

    const res = await client.sendEmail({
      From: Email,
      To: invitee,
      Subject: "Calendar Invite for " + summary,
      TextBody: "Hello from Postmark!",
      HtmlBody: html,
      Attachments: [
        {
          name: "invite.ics",
          Content: path, // Not sure if correct
          ContentType: "text/calendar",
        }
      ],
    });
  } catch (error) {
    throw new Meteor.Error('Error sending email: ', error)
  }
}
