let film;
let titleSpan;
let directorSpan;
let release_dateSpan;
let planetsSpan;
let episode_idSpan;
let charactersSpan;
let opening_crawl;
const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
    film = document.querySelector('h1#film');
    titleSpan = document.querySelector('span#title');
    directorSpan = document.querySelector('span#director');
    release_dateSpan = document.querySelector('span#release_date');
    planetsSpan = document.querySelector('span#planets');
    episode_idSpan = document.querySelector('span#episode_id');
    charactersSpan = document.querySelector('span#characters');
    opening_crawlSpan = document.querySelector('span#opening_crawl');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getFilm(id)
  });


async function getFilm(id) {
    let film;
    try {
        film = await fetchFilms(id)
        film.characters = await fetchCharacters(id)
        film.planets = await fetchPlanets(id)
        console.log(film)
    }
    catch (error) {
        console.error(`Error reading filem ${id} data.`, error.message);
    }
    renderFilms(film);
}

async function fetchFilms(id) {
    let filmUrl = `${baseUrl}/films/${id}`;
    return await fetch(filmUrl)
    .then(res => res.json())
}

async function fetchCharacters(id) {
    const url = `${baseUrl}/films/${id}/characters`;
    const character = await fetch(url)
    .then(res => res.json())
    return character;
}

async function fetchPlanets(id) {
    const url = `${baseUrl}/films/${id}/planets`;
    const planet = await fetch(url)
    .then(res => res.json())
    return planet;
}

const renderFilms = film => {
    document.title = `SWAPI - ${film?.tile}`;
    film.textContent = "Star Wars Rocks!";
    titleSpan.textContent = film?.title;
    directorSpan.textContent = film?.director;
    release_dateSpan.textContent = film?.release_date;

    planetsSpan.textContent = film?.planets;
    const planetsLis = film?.planet?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
    filmsUl.innerHTML = planetsLis.join("");

    episode_idSpan.textContent = film?.episode_id;

    charactersSpan.textContent = film?.characters;
    const filmsLis = character?.film?.characters?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
    filmsUl.innerHTML = filmsLis.join("");
    
    opening_crawlSpan.textContent = film?.opening_crawl;
}

/*
let film;
let titleSpan;
let directorSpan;
let release_dateSpan;
let planetsSpan;
let episode_idSpan;
let charactersSpan;
let opening_crawl;
*/