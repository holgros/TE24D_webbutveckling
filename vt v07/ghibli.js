// ghibli.js - Grundläggande lösning
const API_URL = "https://ghibliapi.vercel.app/films";

async function fetchMovies() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('API-anropet misslyckades');
        const movies = await response.json();
        displayMovies(movies);
    } catch (error) {
        document.getElementById('results').innerHTML = 
            `<p class="error">Tyvärr kunde vi inte hämta filmerna just nu. Försök igen senare.</p>`;
        console.error('API-fel:', error);
    }
}

function displayMovies(movies) {
    const container = document.getElementById('results');
    const searchTerm = document.getElementById('search').value.toLowerCase();
    
    const filtered = movies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm)
    );
    
    container.innerHTML = filtered.map(movie => `
        <article class="movie">
            <h2><a href="details.html?id=${movie.id}">${movie.title}</a></h2>
            <img src="${movie.movie_banner}" alt="${movie.title}" loading="lazy">
            <p>${movie.description.substring(0, 150)}...</p>
        </article>
    `).join('');
}

window.onload = function() {    // se till att sidan laddas innan skriptet körs!
    // Sökfunktionalitet
    document.getElementById('search').addEventListener('input', fetchMovies);
    // Initial laddning
    fetchMovies();
}
