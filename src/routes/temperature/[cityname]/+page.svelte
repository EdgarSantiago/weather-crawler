<script>
  // @ts-nocheck

  import WeatherInfo from "../../../components/WeatherInfo.svelte";
  // @ts-nocheck
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  let cityname = "";
  let href = "";

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isBeta = urlParams.get("href");

    console.log("page.params:", $page.params);
    console.log("page.query:", $page.query);
    console.log("page.query:", isBeta);
    cityname = $page.params.cityname || "Default City";
    href = isBeta || "Default Href";
  });
</script>

<section class="flex justify-center flex-col gap-20 min-h-screen text-center">
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
      Sol com muitas nuvens de manhã e pancadas de chuva à tarde. À noite a
      chuva para.
    </p>

    <!-- min - max -->
    <div class="flex gap-5">
      <p class="text-2xl text-blue-400 rounded-3xl">18ºmin</p>
      <p class="text-2xl text-red-400 rounded-3xl">34ºmáx</p>
    </div>

    <!-- data -->
    <div class="flex flex-col gap-5">
      <WeatherInfo title="Prob. de Chuva" percentage="11% • 0mm" />
      <WeatherInfo title="Nascer do Sol	" percentage="05:49" />
      <WeatherInfo title="Pôr do Sol" percentage="18:17" />
      <WeatherInfo title="Vento" percentage="22km/h • ENE" />
    </div>
  </div>
</section>
