const $form = document.querySelector('[data-js="search-form"]')
const $searchInput = document.querySelector('#search');
const $searchType = document.querySelector('#type');
const $searchResults = document.querySelector('#searchResults');

const API_KEY = '2d45c982';

const getSearchTerm = () => $searchInput.value.trim();
const getSearchType = () => $searchType.value;

const templateMovieRow = (movie) => `
    <div class="container mx-auto max-w-xs rounded-lg overflow-hidden shadow-lg my-2 bg-white">
      <div class="relative mb-6">
         <img class="w-full" src="${movie.Poster}" alt="Profile picture">
      </div>
      <div class="text-center">
            <p class="tracking-wide uppercase text-lg font-bold">${movie.Title}</p>
            <p class="text-gray-400 text-sm">${movie.Type}</p>
        </div>
      <div class="py-10 px-6 text-center tracking-wide grid grid-cols-3 gap-6">

         <div class="posts">
            <p class="text-lg">${movie.Year}</p>
            <p class="text-gray-400 text-sm">Released</p>
         </div>
      </div>
   </div>
`

const renderSearchResults = (data) => {
    if (data.Error) {
        $searchResults.innerHTML = 'No results';
        return;
    }

    const rendered = data.Search.reduce((html, movie) => {
        html += templateMovieRow(movie);
        return html;
    }, '');
    $searchResults.innerHTML = rendered;
}

const searchForMovie = (event) => {
    event.preventDefault()
    const searchTerm = getSearchTerm();
    const searchType = getSearchType();

    const requestUrl = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&type=${searchType}`;

    fetch(requestUrl).then( r => r.json()).then(renderSearchResults)
}



$form.addEventListener('submit', searchForMovie)