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

const FILL_ME_IN = null;
const Email = ""
const Pass = ""
const Service = "Outlook365";


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
  // const path = __dirname + '/uploads/' + eventObj.id + '.ics';
  // console.log('path1: ', path);
  await cal.save(path);
  // console.log('saved: ', path);
  return path;
} catch (error) {
  throw new Meteor.Error('Error generating .ICS file: ', error);
}
};

export const emailInvitee = async (summary, location, description, startTimeStamp, endTimeStamp, timeZone, attendees) => {
  try {
    const path = await createICSFile(startTimeStamp, endTimeStamp, summary, description, location);
    console.log(attendees);
    const invitee = attendees[0].email;
    console.log('path2: ', path);

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
      html: `
      <html>
        <h1>hello ${invitee}</h1>
        <button>Add to Calendar</button>
      </html>`,
      // text: "To add to Apple Calendar, download the .ics file and add to iCalendar.",
      attachments: [{ path }],
    };

    await transporter.sendMail(mailObj, function (err, info) {
      console.log(err, info);
    });
  } catch (error) {
    throw new Meteor.Error('Error sending email: ', error)
  }
}
