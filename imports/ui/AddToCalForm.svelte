<script>
  import { Facilities } from "./facilitiesData";
  import { createTimeStamps } from "./utils";
  import * as qs from "qs";

  /**
   * Problem:
   * I cannot figure out how to pass in a timezone. I can forsee this being an issue if the user adding it into their own calendar, might be booking an appointment for a neighboring border in a different timezone.
   *
   * Devils Advocate: Since they're making the event themselves, they're responsible for verifying the right information?
   */
  $m: selectedFacility = null;
  let summary = "";
  $m: location = "";
  $m: description = "";
  $m: startTime = "";
  let endTime = "";
  $m: startDate = "";
  let endDate = "";
  $m: attendees = [];
  let facilityChanged = false;
  $m: googleLink = "";
  $m: outlookLink = "";
  $m: startTimeStamp = "";
  $m: endTimeStamp = ":";
  let disableButton = true;

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
    if ((startTime, endTime, startDate, endDate)) {
      const res = createTimeStamps(startTime, endTime, startDate, endDate);
      startTimeStamp = res.startTimeStamp;
      endTimeStamp = res.endTimeStamp;
    }

    // When all the fields are filled, create the links.
    if ((startTimeStamp, endTimeStamp, location, description, summary)) {
      disableButton = false;
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
      googleLink =
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
      };
      // create outlook link
      outlookLink =
        "https://outlook.live.com/calendar/0/deeplink/compose?allday=false&" +
        qs.stringify(outlookObj);
    } else {
      disableButton = true;
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

  <a
    href={disableButton ? "#" : googleLink}
    rel="noreferrer"
    target="_blank"
    class="addToCalendar">Add to Google Calendar</a
  >
  <a
    href={disableButton ? "#" : outlookLink}
    rel="noreferrer"
    target="_blank"
    on:click={() => console.log(outlookLink)}
    class="addToCalendar">Add to Outlook Calendar</a
  >
  {outlookLink}
</div>
