<script>
  // Create a constant array containing the alphabet
  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode("a".charCodeAt(0) + i)
  );
</script>

<section>
  <h1 class="text-2xl">weather-crawler</h1>

  <ul>
    {#each alphabet as letter (letter)}
      <li class="my-5 text-2xl">
        <a href={`/citiesbyletter/${letter}`}>{letter}</a>
      </li>
    {/each}
  </ul>
</section>
