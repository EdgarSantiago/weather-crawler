<script>
  // @ts-nocheck
  import { page } from "$app/stores";
  let temperatureHref =
    "https://g1.globo.com/previsao-do-tempo/go/abadia-de-goias.ghtml";
  let places = [
    "Abadia de Goiás",
    "Abadia dos Dourados",
    "Abadia dos Dourados",
    "Abadiânia",
    "Abaeté",
    "Abaetetuba",
    "Abaiara",
    "Abaiara",
    "Abaíra",
    "Abaré",
    "Abatiá",
    "Abatiá",
    "Abdon Batista",
    "Abel Figueiredo",
    "Abel Figueiredo",
    "Abelardo Luz",
    "Abre Campo",
    "Abreu e Lima",
    "Abreu e Lima",
    "Abreulândia",
    "Abreulândia",
    "Acaiaca",
    "Açailândia",
    "Açailândia",
    "Acajutiba",
    "Acará",
    "Acarape",
    "Acaraú",
    "Acari",
  ];
</script>

<div class="typewriter">
  <h1 class="text-3xl lg:text-7xl">crawler de previsão !!!</h1>
</div>
<p class="text-xl lg:text-3xl">
  Cidades com a letra <span class="text-purple-600">{$page.params.letter}</span>
</p>
<ul class="grid grid-cols-2 lg:grid-cols-4 gap-y-10 justify-center">
  {#each places as place (place)}
    <li>
      <a
        class="text-xl lg:text-3xl hover:text-purple-400"
        href={`/temperature/${place}?href=${temperatureHref}`}>{place}</a
      >
    </li>
  {/each}
</ul>
