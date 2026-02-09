// details.js - Detaljsida
async function fetchMovieDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    
    if (!movieId) {
        document.getElementById('details').innerHTML = 
            '<p>Ingen film vald. <a href="index.html">Gå tillbaka till sök</a></p>';
        return;
    }
    
    try {
        const response = await fetch(`https://ghibliapi.vercel.app/films/${movieId}`);
        if (!response.ok) throw new Error('Kunde inte hämta filmdetaljer');
        const movie = await response.json();
        displayMovieDetails(movie);
    } catch (error) {
        document.getElementById('details').innerHTML = 
            `<p class="error">Tyvärr kunde vi inte hämta filmdetaljerna. 
            <a href="index.html">Gå tillbaka till sök</a></p>`;
    }
}

function displayMovieDetails(movie) {
    document.title = `Detaljer: ${movie.title}`;
    document.getElementById('details').innerHTML = `
        <h1>${movie.title}</h1>
        <img src="${movie.movie_banner}" alt="${movie.title}">
        <p><strong>Regissör:</strong> ${movie.director}</p>
        <p><strong>Utgivningsår:</strong> ${movie.release_date}</p>
        <p>${movie.description}</p>
        <a href="ghibli.html">Tillbaka till sök</a>
    `;
}

window.onload = fetchMovieDetails();    // Ladda filmdetaljer när sidan laddas
