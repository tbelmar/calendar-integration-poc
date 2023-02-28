/**
 * Creates an .ics file and sends to an email
 *
 * Notable issues:
 *
 *  - Using gmail: https://nodemailer.com/usage/using-gmail/
 *
*/

import { createTransport } from 'nodemailer';
import { Meteor } from 'meteor/meteor';
import ical from 'ical-generator';
import { createHTML } from './createHTML';
import * as fss from "fs";
import * as path from "path";
const fs = fss.promises;

// const TOKEN_PATH = path.join(process.env.PWD, ".config.json");
// const content = await fs.readFile(TOKEN_PATH);

const FILL_ME_IN = null;

const Email = FILL_ME_IN
const Pass = FILL_ME_IN
const Service = FILL_ME_IN


const createICSFile = async (start, end, title, description, location) => {
  try {
  const eventObj = {
    start,
    end,
    title,
    description,
    id: 'invite', //Some unique identifier
    owner: { 'name': 'ActualFood', 'email': Email },
    location,
  }

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
        email: eventObj.owner.email
      },
      method: 'request'
    }
  ]);
  const path = eventObj.id + '.ics';
  await cal.save(path);
  return path;
} catch (error) {
  throw new Meteor.Error('Error generating .ICS file: ', error);
}
};

export const emailInvitee = async (summary, location, description, startTimeStamp, endTimeStamp, attendees, htmlData) => {
  try {
    const path = await createICSFile(startTimeStamp, endTimeStamp, summary, description, location);
    const invitee = attendees[0].email;

    const html = createHTML(htmlData);
    const transporter = await createTransport({
      service: Service,
      auth: {
        user: Email,
        pass: Pass
      }
    });

    const mailObj = {
      from: Email,
      to: invitee,
      subject: "Invite to " + summary,
      html,
      text: "To add to Apple Calendar, download the .ics file and add to iCalendar.",
      attachments: [{ path }],
    };

    const res = await transporter.sendMail(mailObj, function (err, info) {
      console.log(err, info);
      return 'Success';
    });
  } catch (error) {
    throw new Meteor.Error('Error sending email: ', error)
  }
}
