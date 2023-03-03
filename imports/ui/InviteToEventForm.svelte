<script>
  import { Meteor } from "meteor/meteor";
  import { Facilities } from "./utils/facilitiesData";
  import { createEventLinks, createTimeStamps, getMonthString } from "./utils";
  import moment from "moment-timezone";

  // var zipcode_to_timezone = require( 'zipcode-to-timezone' );
  // import * as zipcode_to_timezone from 'zipcode-to-timezone';
  // import * as qs from "qs";

  let selectedFacility = null;
  let summary = "";
  let location = "";
  let description = "";
  let startTime = "";
  let endTime = "";
  let startDate = "";
  let endDate = "";
  let invitee = "";
  let attendees = [
    { email: "daurham95@gmail.com"},
    { email: "jlin2744@gmail.com" },
    { email: "jimlee827@yahoo.com" },
    { email: "tacocat1928@outlook.com" },
    { email: "actualfooddevs@gmail.com" },
    { email: "actualfooddevs@outlook.com" },
    { email: "actualfooddevs@yahoo.com" },
    { email: "actualfooddevs@aol.com" },
    { email: "daurham95@icloud.com" },
  ];
  let facilityChanged = false;
  let link = "";
  let timezone = "";
  let zipcode = "";
  let tz = "";

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
    if (timezone) {
      console.log(timezone);

      let nz_date_string = new Date().toISOString("en-US", { timeZone: timezone });
      console.log(timezone + ":", nz_date_string);
      tz = nz_date_string.slice(0, -1);

      // var tz = zipcode_to_timezone.lookup( '94110' );
      // console.log( tz ); // America/Los_Angeles
    }
  }

  const getTimezone = () => {
    Meteor.call("convertZipToTimezone", zipcode, (err, res) => {
      console.log('res:', res);
      timezone = res;
    })
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

  const addAttendee = () => {
    attendees = [...attendees, { email: invitee }];
    invitee = "";
  };

  const removeAttendee = ({ email }) => {
    attendees = attendees.filter((listItem) => listItem.email !== email);
  };

  const createCalendar = async () => {
    try {
      // let timeZone =
        // "America/" + selectedFacility.address.city.replace(/([" "])/g, "_");

        // TODO
        // make startTime string a new Date to adhere to timezone first
        // then turn it back to original string format to create timeStamps 
        // lastly pass that into the createTimeStamps function and also console.log to see if youre getting the correct date and time based off of timezone.
      const { startTimeStamp, endTimeStamp } = createTimeStamps(
        startTime,
        endTime,
        startDate,
        endDate
      );

      console.log(typeof startTimeStamp)

      let newStartTimeStamp = new Date(startTimeStamp);
      let newEndTimeStamp = new Date(endTimeStamp);
      
      let localStartTimeStamp = moment(newStartTimeStamp).format();//string
      let localEndTimeStamp = moment(newEndTimeStamp).format();
      console.log("newStartTimeStamp",localStartTimeStamp);

      const startTimeStampStr = startTimeStamp.toISOString();
      const endTimeStampStr = endTimeStamp.toISOString();

      
      const links = createEventLinks(
        startTimeStampStr,
        endTimeStampStr,
        location,
        description,
        summary
      );

      const htmlData = {
        inviteTitle: "Calendar Event",
        inviteText: "Get ready for " + summary,
        inviteMonth: getMonthString(startTimeStamp),
        inviteDayOfMonth: startTimeStamp.getDate(),
        ...links,
      };
      let startStampString = startTimeStamp.toISOString().slice(0, -5);
      let endStampString = endTimeStamp.toISOString().slice(0, -5);
      console.log('start:', startStampString);
      console.log('end:', endStampString);

      let testStartStampString = localStartTimeStamp.slice(0,-6);
      let testEndStampString = localEndTimeStamp.slice(0,-6);

      console.log("Test Start time string:", testStartStampString);
      console.log("Test End time string:", testEndStampString);

      // const stz = moment.tz(startTimeStamp, timezone);

      // const etz = moment.tz(endTimeStamp, timezone);

      // console.log(stz.format());
      // console.log(etz.format());

      // const s = stz.format().split().splice(1, -4, "0")
      // console.log(s);

      // console.log('utc:',stz.utc().format()) // utc: 2023-03-03T03:08:00Z
      // console.log('utc:',etz.utc().format()) // utc: 2023-03-03T03:08:00Z


      const eventLink = await Meteor.callAsync(
        "event.create",
        summary,
        location,
        description,
        // startTimeStamp,
        // endTimeStamp,
        // "2023-03-02T17:24:11-07:00",
        // "2023-03-02T17:24:11",
        // "2023-03-02T17:24:11",
        // startStampString + "Z",
        // endStampString + "Z",
        // stz.utc().format(),
        testStartStampString,
        testEndStampString,
        // stz.format() + "Z",
        // etz.utc().format(),
        // etz.format() + "Z",
        // "2023-03-02T18:24:11-07:00",
        // "",
        // timezone,
        // "America/New_York",
        timezone,
        attendees,
        htmlData
      );

      if (eventLink) window.open(eventLink);
    } catch (error) {
      alert("Error creating event", error);
    }
  };

  // const emailEvent = async () => {
  //   try {
  //     const { startTimeStamp, endTimeStamp } = createTimeStamps(
  //       startTime,
  //       endTime,
  //       startDate,
  //       endDate
  //     );

  //     const startTimeStampStr = startTimeStamp.toISOString();
  //     const endTimeStampStr = endTimeStamp.toISOString();

  //     const links = createEventLinks(
  //       startTimeStampStr,
  //       endTimeStampStr,
  //       location,
  //       description,
  //       summary
  //     );

  //     const htmlData = {
  //       inviteTitle: "Calendar Event",
  //       inviteText: `Get ready for ${summary}`,
  //       inviteMonth: getMonthString(startTimeStamp),
  //       inviteDayOfMonth: startTimeStamp.getDate(),
  //       ...links,
  //     };

  //     const eventLink = await Meteor.callAsync(
  //       "event.email",
  //       summary,
  //       location,
  //       description,
  //       startTimeStampStr,
  //       endTimeStampStr,
  //       attendees,
  //       htmlData
  //     );

  //     if (eventLink) alert("Successfully Sent");
  //   } catch (error) {
  //     alert("Error creating event: ", error);
  //   }
  // };
</script>

<div class="container">
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
    id="facilities-list"
  >
    <option>--</option>
    {#each Facilities as facility}
      <option>{facility.name}</option>
    {/each}
  </select>

  <form class="cal-field">
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

    <ul>
      <h4>Attendees:</h4>
      {#each attendees as attendee}
        <span>
          <li>{attendee.email}</li>
          <button on:click|preventDefault={() => removeAttendee(attendee)}
            >-</button
          >
        </span>
      {/each}
    </ul>

    <span>
      <input
        bind:value={invitee}
        type="text"
        id="email"
        placeholder="Add Attendee"
      />
      <button on:click|preventDefault={addAttendee}>+</button>
    </span>
  </form>

  <button on:click={createCalendar} class="addToCalendar" type="button"
    >Create Event</button
  >
  <!-- <button on:click={emailEvent} class="addToCalendar" type="button"
    >Invite to Event</button
  > -->
</div>
