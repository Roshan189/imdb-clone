const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = "b1570808cd7def24e4c22f2abd9d6ced";
const imageBaseUrl = "https://image.tmdb.org/t/p/w300";
const moviesGrid = document.getElementById("movies-grid");
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const categoryTitle = document.getElementById("category-title");

async function fetchMovies() {
  const res = await fetch(`${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`);
  const jsonRes = await res.json();
  // const movies = jsonRes.results;
  const movies = await Promise.all(
    jsonRes.results.map(async (movie) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      ImdbId: await getIMDbId(movie.id),
    }))
  );
  displayMovies(movies);
  // console.log(movies);
}

async function searchMovies(query) {
  const res = await fetch(
    `${apiBaseUrl}/search/movie?api_key=${apiKey}&query=${query}`
  );
  const jsonRes = await res.json();
  // const movies = jsonRes.results;
  const movies = await Promise.all(
    jsonRes.results.map(async (movie) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      ImdbId: await getIMDbId(movie.id),
    }))
  );
  displayMovies(movies);
  // console.log(movies);
}

function displayMovies(movies) {
  console.log(movies.movie);
  moviesGrid.innerHTML = movies
    .map(
      (movie) =>
        `<div class="movie-card">
         <a href="https://www.imdb.com/title/${movie.ImdbId}">
         <img src="${imageBaseUrl}${movie.poster_path}" alt="not found" />
         <p>⭐ ${movie.vote_average}</p>
         <h1>${movie.title}</h1>
         </a>
         </div>
         `
    )
    .join("");
}

// fetchMovies();
// searchMovies("batman");

async function getIMDbId(movieId) {
  const res = await fetch(
    `${apiBaseUrl}/movie/${movieId}/external_ids?api_key=${apiKey}`
  );
  const jsonRes = await res.json();
  // console.log(jsonRes);
  return jsonRes.imdb_id;
}

function handleSearchFormSubmit(event) {
  event.preventDefault();
  categoryTitle.innerHTML = `<h1>Search results</h1>`;
  const searchQuery = searchInput.value;
  searchMovies(searchQuery);
}

searchForm.addEventListener("submit", handleSearchFormSubmit);

fetchMovies();

// console.log(getIMDbId(550));
