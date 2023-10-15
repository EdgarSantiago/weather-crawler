<script>
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

  <a href={`${href}`} class="text-4xl">
    {cityname}
  </a>
</section>
