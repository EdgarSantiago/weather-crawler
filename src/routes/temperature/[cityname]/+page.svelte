<script>
  // @ts-nocheck

  import WeatherInfo from "../../../components/WeatherInfo.svelte";
  // @ts-nocheck
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  let cityname = "";
  let href = "";
  let responseData = null; // Variable to store API response data
  let loading = false; // Variable to track loading state

  async function handleSubmit(href) {
    loading = true; // Set loading state to true
    const apiUrl = `http://localhost:5000/scrape/weather`;
    // Build the URL for the API request, using encodeURIComponent to handle special characters in the city name
    try {
      // Send a GET request to the API
      const response = await fetch(apiUrl, {
        method: "POST", // Use POST method
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ href: href }), // Send data as JSON
      });
      console.log(response);
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
    await handleSubmit(href); // Call the submit function
  });
</script>

<div class="typewriter">
  <h1 class="text-3xl lg:text-7xl">crawler de previsão !!!</h1>
</div>

<div
  class="max-w-md mx-auto p-5 rounded-3xl border-4 flex flex-col gap-2 text-start"
>
  <!-- about -->
  <p class="text-2xl">Hoje, sábado</p>
  <p class="text-4xl">
    {cityname}
  </p>
  <p class="text-2xl">
    Sol com muitas nuvens de manhã e pancadas de chuva à tarde. À noite a chuva
    para.
  </p>

  <!-- min - max -->
  <div class="flex gap-5 my-3">
    <p class="text-2xl text-blue-400 rounded-3xl">18ºmin</p>
    <p class="text-2xl text-red-400 rounded-3xl">34ºmáx</p>
  </div>

  <!-- data -->
  <div class="flex flex-col gap-5">
    <WeatherInfo title="Prob. de Chuva" percentage="11% • 0mm" />
    <WeatherInfo title="Nascer do Sol	" percentage="05:49" />
    <WeatherInfo title="Pôr do Sol" percentage="18:17" />
    <WeatherInfo title="Vento" percentage="22km/h • ENE" />
    <WeatherInfo title="Raios UV" percentage="Muito alto" />
    <WeatherInfo title="Umidade" percentage="67%	37%" />
  </div>
</div>
