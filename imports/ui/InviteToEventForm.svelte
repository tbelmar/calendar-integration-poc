<script>
  import { Meteor } from "meteor/meteor";
  import { Facilities } from "./utils/facilitiesDataesData";
  import { createEventLinks, createTimeStamps, getMonthString } from "./utils";
  // import * as qs from "qs";

  $m: selectedFacility = null;
  let summary = "";
  $m: location = "";
  $m: description = "";
  $m: startTime = "";
  let endTime = "";
  $m: startDate = "";
  let endDate = "";
  process;
  let invitee = "";
  $m: attendees = [];
  let facilityChanged = false;
  $m: link = "";

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
  }

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

  // const createEventLinks = () => {}; // export to util

  const createCalendar = async () => {
    try {
      let timeZone =
        "America/" + selectedFacility.address.city.replace(/([" "])/g, "_");

      const { startTimeStamp, endTimeStamp } = createTimeStamps(
        startTime,
        endTime,
        startDate,
        endDate
      );

      // const links = createEventLinks(startTimeStamp, endTimeStamp, location, description, summary);

      // const html = createEmailHTML(googleLink, outlookLink);


      // const eventLink = await Meteor.callAsync(
      //   "event.create",
      //   summary,
      //   location,
      //   description,
      //   startTimeStamp,
      //   endTimeStamp,
      //   timeZone,
      //   attendees,
      //   links
      // );

      // if (eventLink) window.open(eventLink);
    } catch (error) {
      alert("Error creating event");
    }
  };

  const emailEvent = async () => {
    try {

      const { startTimeStamp, endTimeStamp } = createTimeStamps(
        startTime,
        endTime,
        startDate,
        endDate
      );

      const startTimeStampStr = startTimeStamp.toISOString();
      const endTimeStampStr = endTimeStamp.toISOString();
      
      const links = createEventLinks(startTimeStampStr, endTimeStampStr, location, description, summary);

      const htmlData = {
        inviteTitle: "Calendar Event",
        inviteText: "Get ready for " + summary,
        inviteMonth: getMonthString(startTimeStamp),
        inviteDayOfMonth: startTimeStamp.getDate(),
        ...links
      };

      const eventLink = await Meteor.callAsync(
        "event.email",
        summary,
        location,
        description,
        startTimeStampStr,
        endTimeStampStr,
        attendees,
        htmlData
      );

      if (eventLink) alert('Successfully Sent');
    } catch (error) {
      alert("Error creating event: ", error);
    }
  };
</script>

<div class="container">
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
  <button on:click={emailEvent} class="addToCalendar" type="button"
    >Invite to Event</button
  >
</div>
