<script>
  // Create a constant array containing the alphabet
  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode("a".charCodeAt(0) + i)
  );
</script>

<section class="flex justify-center flex-col gap-8 min-h-screen text-center">
  <div class="typewriter">
    <h1 class="text-3xl lg:text-7xl">crawler de previsão !!!</h1>
  </div>
  <p class="text-xl lg:text-3xl">Escolha a primeira letra da sua cidade</p>
  <ul class="grid grid-cols-3 lg:flex gap-8 justify-center">
    {#each alphabet as letter (letter)}
      <li class="">
        <a
          class="text-4xl lg:text-5xl hover:text-purple-400"
          href={`/citiesbyletter/${letter}`}>{letter}</a
        >
      </li>
    {/each}
  </ul>
</section>
