var _0x8851 = [
  '\x68\x74\x74\x70\x73\x3A\x2F\x2F\x61\x70\x69\x2E\x74\x68\x65\x6D\x6F\x76\x69\x65\x64\x62\x2E\x6F\x72\x67\x2F\x33\x2F\x64\x69\x73\x63\x6F\x76\x65\x72\x2F\x6D\x6F\x76\x69\x65\x3F\x73\x6F\x72\x74\x5F\x62\x79\x3D\x70\x6F\x70\x75\x6C\x61\x72\x69\x74\x79\x2E\x64\x65\x73\x63\x26\x61\x70\x69\x5F\x6B\x65\x79\x3D\x38\x66\x62\x37\x31\x35\x34\x63\x39\x36\x31\x61\x35\x35\x64\x33\x39\x38\x62\x34\x61\x37\x31\x36\x62\x32\x64\x30\x35\x66\x32\x33\x26\x70\x61\x67\x65\x3D\x31',
]
const API_URL = _0x8851[0]
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
var _0x9c34 = [
  '\x68\x74\x74\x70\x73\x3A\x2F\x2F\x61\x70\x69\x2E\x74\x68\x65\x6D\x6F\x76\x69\x65\x64\x62\x2E\x6F\x72\x67\x2F\x33\x2F\x73\x65\x61\x72\x63\x68\x2F\x6D\x6F\x76\x69\x65\x3F\x61\x70\x69\x5F\x6B\x65\x79\x3D\x38\x66\x62\x37\x31\x35\x34\x63\x39\x36\x31\x61\x35\x35\x64\x33\x39\x38\x62\x34\x61\x37\x31\x36\x62\x32\x64\x30\x35\x66\x32\x33\x26\x71\x75\x65\x72\x79\x3D\x22',
]
const SEARCH_API = _0x9c34[0]

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovies(API_URL)
console.log(API_URL)

async function getMovies(url) {
  const res = await fetch(url)
  const data = await res.json()

  showMovies(data.results)
}

function showMovies(movies) {
  main.innerHTML = ''

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie

    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')

    movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `
    main.appendChild(movieEl)
  })
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red'
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const searchTerm = search.value

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm)

    search.value = ''
  } else {
    window.location.reload()
  }
})
