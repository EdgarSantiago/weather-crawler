<script>
  // @ts-nocheck

  import { page } from "$app/stores";
  export let cities;
  cities ? console.log(cities) : console.log("not yet");
  let loading = true;
  let error = null;

  // Add an onload handler to detect when the data is loaded
  $: {
    if (cities) {
      loading = false;
      console.log(cities); // Log the data when it's available
    }
  }
</script>

<div class="typewriter">
  <h1 class="text-3xl lg:text-7xl">crawler de previsão !!!</h1>
</div>
<p class="text-xl lg:text-3xl">
  Cidades com a letra <span class="text-purple-600">{$page.params.letter}</span>
</p>

<!-- Display loading or error message while data is being fetched -->
{#if loading}
  <div class="text-xl lg:text-3xl">Loading...</div>
{:else if error}
  <div class="text-xl lg:text-3xl">Error: {error.message}</div>
{:else}
  <h1>carregado</h1>
  <ul class="grid grid-cols-2 lg:grid-cols-4 gap-y-10 justify-center">
    {#each cities as cityGroup, i}
      {#each cityGroup as city, j}
        <li>
          <a href={city.href}>{city.textContent}</a>
        </li>
      {/each}
    {/each}
  </ul>
{/if}
