<script>
  import { Meteor } from "meteor/meteor";
  let Summary = "";
  let Location = "";
  let Description = "";
  let StartTime = "";
  let EndTime = "";
  let Attendee = "";

  const createCalendar = () => Meteor.call("event.create");

</script>

<div class="container">
  <h1>Hello :)</h1>
  <button />
  <form action="">
    <input bind:value={Summary} type="text" placeholder="Summary" />
    <input bind:value={Location} type="text" placeholder="Location" />
    <input bind:value={Description} type="text" placeholder="Description" />
    <input bind:value={StartTime} type="time" placeholder="" id="start-time" />
    <input bind:value={EndTime} type="time" placeholder="" id="end-time" />
    <input bind:value={Attendee} type="email" placeholder="Attendee" />
  </form>
  <button on:click={createCalendar}>Create Event</button>
</div>
