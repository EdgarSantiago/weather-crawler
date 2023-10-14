<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="app">
	<Header />
	<main class="max-w-2xl bg-blue-400 mx-auto">
		<slot />
	</main>

</div>

