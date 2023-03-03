<script>
  import { Facilities } from "./utils/facilitiesData";
  import { createTimeStamps, createEventLinks } from "./utils";
  import * as qs from "qs";
  import moment from "moment-timezone";

  // console.log("Error Response: ", qs.parse('refresh_token=1%2F%2F06FGBqARp6BL4CgYIARAAGAYSNgF-L9IrkRqNfCKhU_XaVBgCRfjF3LaPKCDcHMOVS12GUU_OIP0yDUvF0qKebAA-PBsY8H_wDw&client_id=1071390240354-h2qj0tkgp5omhduvicda8s8r6165cmgv.apps.googleusercontent.com&client_secret=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&grant_type=refresh_token'))

  /**
   * Problem:
   * I cannot figure out how to pass in a timezone. I can forsee this being an issue if the user adding it into their own calendar, might be booking an appointment for a neighboring border in a different timezone.
   *
   * Devils Advocate: Since they're making the event themselves, they're responsible for verifying the right information?
   */
  let selectedFacility = null;
  let summary = "";
  let location = "";
  let description = "";
  let startTime = "";
  let endTime = "";
  let startDate = "";
  let endDate = "";
  // let attendees = [];
  let facilityChanged = false;
  let googleLink = "";
  let outlookLink = "";
  let startTimeStamp = "";
  let endTimeStamp = "";
  let disableButton = true;
  let zipcode = "";
  let timezone;

  $m: {
    if (selectedFacility && facilityChanged) {
      // auto input a facilities data
      summary = "Medical Booking";
      facilityChanged = false;
      location = selectedFacility.getFullAddress();
      description = `Thank you for booking through Per Diem: \n\n [Appointment info here]\n\nLocated at ${selectedFacility.getFullAddress()}.\n\nIf you have any questions, reach us at ${
        selectedFacility.phoneNumber
      }`;
    }
    if (startTime && endTime && startDate && endDate) {
      console.log(startTime, endTime);
      const res = createTimeStamps(startTime, endTime, startDate, endDate);

      let newStartTimeStamp = new Date(res.startTimeStamp);
      let newEndTimeStamp = new Date(res.endTimeStamp);

      let localStartTimeStamp = moment(newStartTimeStamp).format(); //string
      let localEndTimeStamp = moment(newEndTimeStamp).format();

      startTimeStamp = localStartTimeStamp;
      endTimeStamp = localEndTimeStamp;

      const links = createEventLinks(
        startTimeStamp,
        endTimeStamp,
        location,
        description,
        summary
      );
      googleLink = links.googleLink;
      outlookLink = links.outlookLink;
    }

    // When all the fields are filled, create the links.
    // if (startTimeStamp && endTimeStamp && location && description && summary) {
    //   // console.log(String(startTime), String(endTime), String(startDate), String(endDate));
    //   disableButton = false;
    //   const googleObj = {
    //     action: "TEMPLATE",
    //     dates:
    //       startTimeStamp.toISOString().replace(/([-:.])/g, "") +
    //       "/" +
    //       endTimeStamp.toISOString().replace(/([-:.])/g, ""),
    //     details: description,
    //     location,
    //     text: summary,
    //   };

    //   // create google link
    //   googleLink =
    //     "https://calendar.google.com/calendar/render?" +
    //     qs.stringify(googleObj);

    //   const outlookObj = {
    //     body: description,
    //     enddt: endTimeStamp.toISOString().replace(/([.])/g, ""),
    //     location,
    //     path: "/calendar/action/compose",
    //     rru: "addevent",
    //     startdt: startTimeStamp.toISOString().replace(/([.])/g, ""),
    //     subject: summary,
    //   };
    //   // create outlook link
    //   outlookLink =
    //     "https://outlook.live.com/calendar/0/deeplink/compose?allday=false&" +
    //     qs.stringify(outlookObj);
    // } else {
    //   disableButton = true;
    // }
  }

  const getTimezone = () => {
    Meteor.call("convertZipToTimezone", zipcode, (err, res) => {
      console.log("res:", res);
      timezone = res;
    });
  };

  const setFacility = (name) => {
    facilityChanged = true;
    selectedFacility = Facilities.filter((f) => f.name === name)[0];
    // reset if none is selected
    if (!selectedFacility) {
      description = "";
      location = "";
      summary = "";
    }
  };
  const outlook = "https://outlook.live.com/calendar/0/deeplink/compose?allday=false&body=Describe&enddt=2023-03-05T04%3A45%3A00%2B00%3A00&location=los%20Angeles%2C%20CA&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2023-03-05T03%3A15%3A00%2B00%3A00&subject=Medical%20Booking";
  console.log(outlook, qs.parse(outlook))

  const google = "https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20230305T031500Z%2F20230305T044500Z&details=Test&location=Los%20Angeles%2C%20California&text=Test";
  console.log(google, qs.parse(google));
  // console.log(qs.parse());
  // console.log(qs.parse());
</script>


<div class="container">


  
    <!-- GOAL: {console.log(qs.parse("https://outlook.live.com/calendar/0/deeplink/compose?allday=false&body=Describe&enddt=2023-02-09T01%3A30%3A00%2B00%3A00&location=los%20Angeles%2C%20CA&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2023-02-09T01%3A30%3A00%2B00%3A00&subject=Medical%20Booking"))} -->



  <label for="zip">Zipcode:</label>
  <input
    bind:value={zipcode}
    id="zip"
    class="cal-field"
    type="text"
    placeholder="XXXXXX"
  />
  <button on:click={getTimezone}>Submit</button>

  <label for="facilities-list">Select a Facility</label>
  <select
    on:change={(e) => setFacility(e.target.value)}
    name="facilities"
    id="facilities-list:3000"
  >
    <option>--</option>
    {#each Facilities as facility}
      <option>{facility.name}</option>
    {/each}
  </select>

  <label for="summary">Summary:</label>
  <input
    bind:value={summary}
    id="summary"
    class="cal-field"
    type="text"
    placeholder="Summary..."
  />

  <label for="location">Location:</label>
  <input
    bind:value={location}
    id="location"
    class="cal-field"
    type="text"
    placeholder="Location..."
  />

  <label for="description">Description:</label>
  <textarea
    bind:value={description}
    id="description"
    class="cal-field"
    type="text"
    placeholder="Description..."
  />

  <label for="start-time">Start of Event</label>
  <div>
    <input
      bind:value={startDate}
      class="datetime-elem cal-field"
      type="date"
      id="start-date"
    />
    <input
      bind:value={startTime}
      class="datetime-elem cal-field"
      type="time"
      id="start-time"
    />
  </div>

  <label for="end-time">End of Event</label>
  <div>
    <input
      bind:value={endDate}
      class="datetime-elem cal-field"
      type="date"
      id="end-date"
    />
    <input
      bind:value={endTime}
      class="datetime-elem cal-field"
      type="time"
      id="end-time"
    />
  </div>

  <br />
  Google:{googleLink}

  <br />
  Outlook:{outlookLink}

  <div>
    <a href={googleLink} rel="noreferrer" target="_blank" class="addToCalendar"
      >Add to Google Calendar</a
    >
    <a href={outlookLink} rel="noreferrer" target="_blank" class="addToCalendar"
      >Add to Outlook Calendar</a
    >
    <style>
      .addToCalendar {
        background-color: #44c767;
        border: 1px solid #18ab29;
        display: inline-block;
        cursor: pointer;
        color: #ffffff;
        font-family: Arial;
        font-size: 16px;
        padding: 16px 31px;
        text-decoration: none;
        text-shadow: 0px 1px 0px #2f6627;
      }

      .addToCalendar:hover {
        background-color: #5cbf2a;
      }

      .addToCalendar:active {
        position: relative;
        top: 1px;
      }
    </style>
  </div>
</div>
