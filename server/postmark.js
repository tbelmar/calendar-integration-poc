/**
 * Creates an .ics file and sends to an email
 *
 * Notable issues:
 *
 */

import { Meteor } from "meteor/meteor";
import ical from "ical-generator";
import * as postmark from "postmark";
import { createHTML } from "./createHTML";
import * as fs from "fs";


const createICSFile = async (start, end, title, description, location, SERVICE_EMAIL) => {
  try {
    const eventObj = {
      start,
      end,
      title,
      description,
      id: "invite", //Some unique identifier
      owner: { name: "ActualFood", email: SERVICE_EMAIL },
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
    await cal.save(path);
    return path;
  } catch (error) {
    throw new Meteor.Error("Error generating .ICS file: ", error);
  }
};


export const emailInvitee = async (summary, location, description, startTimeStamp, endTimeStamp, attendees, htmlData, SERVICE_EMAIL, POSTMARK_TOKEN) => {
  try {
    const path = await createICSFile(startTimeStamp, endTimeStamp, summary, description, location, SERVICE_EMAIL);

    const client = new postmark.ServerClient(POSTMARK_TOKEN);

    const html = createHTML(htmlData);

    attendees.forEach(async ({ email }) => {
      const res = await client.sendEmail({
        From: SERVICE_EMAIL,
        To: email,
        Subject: "Calendar Invite for " + summary,
        TextBody: "Hello from Postmark!",
        HtmlBody: html,
        Attachments: [
          {
            name: "invite.ics",
            Content: fs.readFileSync(path).toString('base64'), // Not sure if correct
            ContentType: "text/calendar",
          }
        ],
      });
    });
  } catch (error) {
    throw new Meteor.Error('Error sending email: ', error)
  }
}
