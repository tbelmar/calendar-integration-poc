import { Meteor } from 'meteor/meteor';
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
  ).toJSON();
  endTimeStamp = new Date(
    endDateYr,
    endDateMon,
    endDateDay,
    endTimeHr,
    endTimeMin
  ).toISOString();

  return { startTimeStamp, endTimeStamp };

} catch (error) {
  throw new Meteor.Error('Error in parsing dateTime: ', error);
}
};