export async function load({ fetch, params }) {
  const res = await fetch(
    `http://localhost:5000/scrape/cities/${params.letter}`
  );
  const cities = await res.json();

  return { cities };
}
