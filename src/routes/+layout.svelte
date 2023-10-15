<script>
  import Header from "./Header.svelte";
  import "./styles.css";
</script>

<div class="app bg-slate-950 text-gray-50">
  <!--<Header />-->
  <main class="max-w-6xl mx-auto p-5">
    <slot />
  </main>
</div>
