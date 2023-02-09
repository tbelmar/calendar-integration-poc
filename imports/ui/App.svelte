<script>
  import AddToCalForm from "./AddToCalForm.svelte";
  import InviteToEventForm from "./InviteToEventForm.svelte";

  $m: showInvite = true;
  const toggleInvite = () => (showInvite = !showInvite);
</script>

<div class="container">
  {#if showInvite}
    <h1>Invite User to Event</h1>
    <button on:click={toggleInvite} class="cal-field">Switch to method2</button>
    <InviteToEventForm />
  {:else}
    <h1>Add to your Calendar</h1>
    <button on:click={toggleInvite} class="cal-field">Switch to method1</button>
    <AddToCalForm />
  {/if}
</div>
