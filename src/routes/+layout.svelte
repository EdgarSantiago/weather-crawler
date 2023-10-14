<script>
  import Header from "./Header.svelte";
  import "./styles.css";
</script>

<div class="app">
  <!--<Header />-->
  <main class="max-w-4xl bg-blue-400 mx-auto p-5">
    <slot />
  </main>
</div>
