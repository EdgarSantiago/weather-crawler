<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import { onMount } from 'svelte';

  /**
   * @type {null}
   */
  let scrapedData = null;

  onMount(async () => {
    // Call the scrapeData function when the component is mounted.
    // @ts-ignore
    scrapedData = await scrapeData();
  });
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1 class="text-2xl">
		to your new SvelteKit app
	</h1>
	<h1>Scraped Data</h1>
	<pre>{JSON.stringify(scrapedData, null, 2)}</pre>
</section>

