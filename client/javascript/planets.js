let nameH1;
let climate;
let diameter;
let terrain;
let filmsUl;
let planetDiv;
let charactersUl;
const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  nameH1 = document.querySelector('h1#name');
  climate = document.querySelector('span#climate');
  diameter = document.querySelector('span#diameter');
  terrain = document.querySelector('span#terrain');
  filmsUl = document.querySelector('#films>ul');
  charactersUl = document.querySelector('#characters>ul');

  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getPlanet(id)
});

async function getPlanet(id) {
  let planet;
  try {
    planet = await fetchPlanet(id)
    console.log("Planet fetch:", planet);
    planet.characters = await fetchCharacters(planet)
    planet.films = await fetchFilms(planet)
  }
  catch (ex) {
    console.error(`Error reading planet ${id} data.`, ex.message);
  }
  renderPlanet(planet);

}


async function fetchPlanet(id) {
  let planetUrl = `${baseUrl}/planets/${id}`;
  return await fetch(planetUrl)
    .then(res => res.json())
}

async function fetchCharacters(planet) {
  const url = `${baseUrl}/planets/${planet?.id}/characters`;
  const character = await fetch(url)
    .then(res => res.json())
  return character;
}

async function fetchFilms(character) {
  const url = `${baseUrl}/characters/${character?.id}/films`;
  const films = await fetch(url)
    .then(res => res.json())
  return films;
}

const renderPlanet = planet => {
    console.log("Render Planet:", planet);
  document.title = `SWAPI - ${planet?.name}`;  
  nameH1.textContent = planet?.name;
  climate.textContent = planet?.climate;
  diameter.textContent = planet?.diameter;
  terrain.textContent = planet?.terrain;
//   homeworldSpan.innerHTML = `<a href="/planet.html?id=${planet?.homeworld.id}">${planet?.homeworld.name}</a>`;
  const filmsList = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
  filmsUl.innerHTML = filmsList.join("");
  const characterList = planet?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
  charactersUl.innerHTML = characterList.join("");
}
