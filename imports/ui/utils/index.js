import { Meteor } from 'meteor/meteor';
import * as qs from "qs";

export const createTimeStamps = (startTime, endTime, startDate, endDate) => {
  try {

  // parse the input time & date
  const startTimeHr = startTime.slice(0, 2);
  const startTimeMin = startTime.slice(3, 5);
  const endTimeHr = endTime.slice(0, 2);
  const endTimeMin = endTime.slice(3, 5);

  const startDateYr = startDate.slice(0, 4);
  let startDateMon = startDate.slice(5, 7);
  const startDateDay = startDate.slice(8, 10);
  const endDateYr = endDate.slice(0, 4);
  let endDateMon = endDate.slice(5, 7);
  const endDateDay = endDate.slice(8, 10);

  // need to subtract 1 from the month due to the way datetime calculates
  startDateMon =
    Number(startDateMon) < 11
      ? `0${Number(startDateMon) - 1}`
      : `${Number(startDateMon) - 1}`;
  endDateMon =
    Number(endDateMon) < 11
      ? `0${Number(endDateMon) - 1}`
      : `${Number(endDateMon) - 1}`;

  // create timestamps
  startTimeStamp = new Date(
    startDateYr,
    startDateMon,
    startDateDay,
    startTimeHr,
    startTimeMin
  );
  endTimeStamp = new Date(
    endDateYr,
    endDateMon,
    endDateDay,
    endTimeHr,
    endTimeMin
  );

  return { startTimeStamp, endTimeStamp };

} catch (error) {
  throw new Meteor.Error('Error in parsing dateTime: ', error);
}
};


export const createEventLinks = (startTimeStamp, endTimeStamp, location, description, summary) => {

  const googleObj = {
    action: "TEMPLATE",
    dates:
      startTimeStamp.replace(/([-:.])/g, "") +
      "/" +
      endTimeStamp.replace(/([-:.])/g, ""),
    details: description,
    location,
    text: summary,
  };

  // create google link
  const googleLink =
    "https://calendar.google.com/calendar/render?" +
    qs.stringify(googleObj);

  const outlookObj = {
    body: description,
    enddt: endTimeStamp.replace(/([.])/g, ""),
    location,
    path: "/calendar/action/compose",
    rru: "addevent",
    startdt: startTimeStamp.replace(/([.])/g, ""),
    subject: summary,
    allday: false,
  };
  // create outlook link
  const outlookLink =
    "https://outlook.live.com/calendar/0/deeplink/compose?" +
    qs.stringify(outlookObj);

  return { googleLink, outlookLink };
};

const months = {
  "1": "J A N",
  "2": "F E B",
  "3": "M A R",
  "4": "A P R",
  "5": "M A Y",
  "6": "J U N",
  "7": "J U L",
  "8": "A U G",
  "9": "S E P",
  "10": "O C T",
  "11": "N O V",
  "12": "D E C",
};
export const getMonthString = (timeStamp) => months[timeStamp.getMonth() + 1];