<script>
  import Header from "./Header.svelte";
  import "./styles.css";
</script>

<div class="app bg-slate-950 text-gray-50">
  <!--<Header />-->
  <main class="max-w-6xl mx-auto p-5">
    <section
      class="flex justify-center flex-col gap-20 min-h-screen text-center"
    >
      <slot />
    </section>
  </main>
</div>
