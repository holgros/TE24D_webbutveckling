// Enkel Studio Ghibli Film Databas
const API_URL = 'https://ghibliapi.vercel.app/films';
const filmsContainer = document.getElementById('filmsContainer');
const loadBtn = document.getElementById('loadBtn');
const resetBtn = document.getElementById('resetBtn');
const loading = document.getElementById('loadingIndicator');
const errorDiv = document.getElementById('errorMessage');

// Hämta och visa filmer
async function loadFilms() {
    try {
        loading.style.display = 'block';
        errorDiv.style.display = 'none';
        loadBtn.disabled = true;
        loadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Laddar...';
        
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const films = await response.json();
        
        // Sortera efter år (nyaste först)
        films.sort((a, b) => b.release_date - a.release_date);
        
        // Skapa HTML för alla filmer
        filmsContainer.innerHTML = films.map(film => `
            <div class="film-card">
                <div class="poster-container">
                    <img class="film-poster" 
                         src="${film.image || 'https://upload.wikimedia.org/wikipedia/en/c/c1/Studio_Ghibli_logo.svg'}" 
                         alt="${film.title}"
                         onerror="this.src='https://upload.wikimedia.org/wikipedia/en/c/c1/Studio_Ghibli_logo.svg'">
                </div>
                <div class="film-info">
                    <h2 class="film-title">${film.title}</h2>
                    <div class="film-meta">
                        <span><i class="far fa-calendar-alt"></i> ${film.release_date}</span>
                        <span><i class="far fa-clock"></i> ${film.running_time} min</span>
                    </div>
                    <div class="film-director">
                        <i class="fas fa-user"></i> ${film.director}
                    </div>
                    <div class="score">
                        <i class="fas fa-star"></i> ${film.rt_score}%
                    </div>
                    <p class="film-description">
                        ${film.description.length > 150 ? film.description.substring(0, 150) + '...' : film.description}
                    </p>
                    <a href="film-details.html?id=${film.id}" class="film-link">
                        Läs mer <i class="fas fa-arrow-right"></i>
                    </a>
                    <span class="show-id" onclick="this.nextElementSibling.style.display='block';this.style.display='none'">
                        Visa Film-ID
                    </span>
                    <div class="film-id" style="display:none">${film.id}</div>
                </div>
            </div>
        `).join('');
        
        // Uppdatera knappen
        loadBtn.innerHTML = `<i class="fas fa-check"></i> ${films.length} Filmer`;
        loadBtn.style.background = '#2ecc71';
        
    } catch (error) {
        errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Kunde inte hämta filmer: ${error.message}`;
        errorDiv.style.display = 'block';
        loadBtn.innerHTML = '<i class="fas fa-redo"></i> Försök igen';
    } finally {
        loading.style.display = 'none';
        loadBtn.disabled = false;
    }
}

// Återställ till startläge
function resetPage() {
    filmsContainer.innerHTML = `
        <div style="text-align: center; grid-column: 1 / -1; padding: 60px 20px; color: #5d6d7e;">
            <i class="fas fa-film" style="font-size: 4rem; margin-bottom: 20px; color: #aeb6bf;"></i>
            <h2 style="margin-bottom: 15px;">Studio Ghibli Filmdatabas</h2>
            <p style="max-width: 600px; margin: 0 auto 30px; line-height: 1.6;">
                Klicka på "Hämta Filmer" för att visa alla Studio Ghibli-filmer med affischer från API:et.
            </p>
        </div>
    `;
    loadBtn.innerHTML = '<i class="fas fa-download"></i> Hämta Filmer';
    loadBtn.style.background = '#3498db';
    errorDiv.style.display = 'none';
}

// Event listeners
loadBtn.addEventListener('click', loadFilms);
resetBtn.addEventListener('click', resetPage);

// Initiera sidan
resetPage();