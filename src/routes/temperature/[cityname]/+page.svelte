<script>
  // @ts-nocheck

  import { onMount } from "svelte";
  import WeatherInfo from "../../../components/WeatherInfo.svelte";
  import { page } from "$app/stores";

  let cityname = "";
  let href = "";
  let responseData = null; // Variable to store API response data
  let loading = false; // Variable to track loading state

  async function handleSubmit(href) {
    loading = true; // Set loading state to true
    // Build the URL for the API request, using encodeURIComponent to handle special characters in the city name
    try {
      // Send a GET request to the API
      const response = await fetch("http://localhost:5000/scrape/weather", {
        method: "POST", // Use POST method
        headers: {
          "Content-Type": "application/json", // You can adjust the content type as needed
        },
        body: JSON.stringify({ href: href }), // Send data as JSON
      });

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

  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const isBeta = urlParams.get("href");
    cityname = $page.params.cityname || "Default City";
    href = isBeta || "Default Href";

    // Set loading to true before making the request
    loading = true;

    await handleSubmit(href); // Call the submit function

    // Set loading to false after the request is completed
    loading = false;
  });
</script>

<div class="typewriter">
  <h1 class="text-3xl lg:text-7xl">Crawler de Previsão !!!</h1>
</div>

<div
  class="max-w-md mx-auto p-5 rounded-3xl border-4 flex flex-col gap-2 text-start"
>
  <!-- Conditionally render the loading indicator -->
  {#if loading}
    <p class="text-2xl">Carregando...</p>
  {:else}
    <!-- Display the response data if responseData is not null -->
    {#if responseData !== null}
      <p class="text-4xl">Hoje em {cityname}</p>
      <p class="text-4xl text-red-400">{responseData.max}</p>
      <p class="text-4xl text-blue-400">{responseData.min}</p>

      <p class="text-2xl">
        Nascer do Sol: {responseData.data["Nascer do Sol"]}
      </p>
      <p class="text-2xl">
        Prob. de Chuva: {responseData.data["Prob. de Chuva"]}
      </p>
      <p class="text-2xl">Pôr do Sol: {responseData.data["Pôr do Sol"]}</p>
      <p class="text-2xl">Raios UV: {responseData.data["Raios UV"]}</p>
      <p class="text-2xl">Umidade: {responseData.data["Umidade"]}</p>
    {:else}
      <p class="text-2xl">No data available.</p>
    {/if}
  {/if}
</div>
