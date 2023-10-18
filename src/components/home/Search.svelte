<!-- YourComponent.svelte -->

<script>
  // @ts-nocheck

  let cityInput = ""; // Variable to hold the user's input
  let responseData = null; // Variable to store API response data
  let loading = false; // Variable to track loading state

  async function handleSubmit() {
    loading = true; // Set loading state to true

    // Build the URL for the API request, using encodeURIComponent to handle special characters in the city name
    const apiUrl = `http://localhost:5000/scrape/searchcity/${encodeURIComponent(
      cityInput
    )}`;

    try {
      // Send a GET request to the API
      const response = await fetch(apiUrl);

      if (response.ok) {
        // Process the response data
        responseData = await response.json();
      } else {
        console.error("Failed to fetch data from the API");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      loading = false; // Set loading state to false when the request is completed
    }
  }

  import { onMount } from "svelte";

  onMount(async () => {
    // This code will run when the component is mounted.
    // You can place your initial API request logic here.
    const initialCity = "São Paulo"; // Initial city to fetch
    cityInput = initialCity; // Set the input field value
    //await handleSubmit(); // Call the submit function
  });
</script>

<!-- Your form -->
<form on:submit={handleSubmit} method="GET">
  <div class="mb-3 mx-auto w-full">
    <div
      class="relative mb-4 mx-auto flex max-w-md flex-row items-stretch w-full"
    >
      <input
        type="text"
        class="relative w-full block mx-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
        placeholder="Digite uma cidade"
        aria-label="Digite uma cidade"
        bind:value={cityInput}
        disabled={loading}
      />
      <!--Search button-->
      <button
        class="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
        type="submit"
        id="button-addon3"
        data-te-ripple-init
        disabled={loading}
      >
        {#if loading}
          Procurando... <!-- Display loading text when loading is true -->
        {:else}
          Procurar
        {/if}
      </button>
    </div>
  </div>
</form>

<!-- Display API response data -->
{#if responseData}
  <!-- Button to view temperature -->
  <a
    href={`/temperature/${responseData.data.textContent}?href=${responseData.data.href}`}
  >
    <button
      class="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
    >
      Ver temperatura
    </button>
  </a>
{/if}
