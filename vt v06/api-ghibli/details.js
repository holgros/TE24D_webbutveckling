// Enkel detaljsida för Studio Ghibli filmer

// Hämta film-ID från URL
function getFilmId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Ladda och visa filmdetaljer
async function loadFilmDetails() {
    const filmId = getFilmId();
    const loading = document.getElementById('loadingIndicator');
    const errorDiv = document.getElementById('errorMessage');
    const container = document.getElementById('filmDetailsContainer');
    
    if (!filmId) {
        container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: #5d6d7e;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #e74c3c; margin-bottom: 20px;"></i>
                <h2>Ingen film vald</h2>
                <p>Gå tillbaka och välj en film.</p>
                <a href="index.html" style="display:inline-block; margin-top:20px; padding:10px 20px; background:#3498db; color:white; border-radius:5px; text-decoration:none;">
                    <i class="fas fa-arrow-left"></i> Tillbaka
                </a>
            </div>
        `;
        loading.style.display = 'none';
        return;
    }
    
    try {
        loading.style.display = 'block';
        errorDiv.style.display = 'none';
        
        const response = await fetch(`https://ghibliapi.vercel.app/films/${filmId}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const film = await response.json();
        
        // Uppdatera sidtitel
        document.title = `${film.title} - Studio Ghibli`;
        
        // Visa filminformation
        container.innerHTML = `
            <div class="film-detail-container">
                <div class="detail-header">
                    <div class="detail-poster">
                        <img src="${film.movie_banner || film.image || 'https://upload.wikimedia.org/wikipedia/en/c/c1/Studio_Ghibli_logo.svg'}" 
                             alt="${film.title}"
                             style="width:100%; border-radius:10px;"
                             onerror="this.src='https://upload.wikimedia.org/wikipedia/en/c/c1/Studio_Ghibli_logo.svg'">
                    </div>
                    <div class="detail-title">
                        <h1>${film.title}</h1>
                        <div class="detail-meta">
                            <div class="meta-item">
                                <i class="far fa-calendar-alt"></i> ${film.release_date}
                            </div>
                            <div class="meta-item">
                                <i class="far fa-clock"></i> ${film.running_time} min
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-user"></i> ${film.director}
                            </div>
                        </div>
                        <div class="detail-score">
                            <i class="fas fa-star"></i> ${film.rt_score}%
                        </div>
                    </div>
                </div>
                
                <div class="detail-content">
                    <div class="detail-section">
                        <h2><i class="fas fa-align-left"></i> Handling</h2>
                        <p>${film.description}</p>
                    </div>
                    
                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:20px; margin-top:30px;">
                        <div style="background:#f8f9fa; padding:15px; border-radius:8px;">
                            <strong>Originaltitel</strong><br>${film.original_title}
                        </div>
                        <div style="background:#f8f9fa; padding:15px; border-radius:8px;">
                            <strong>Producent</strong><br>${film.producer}
                        </div>
                        <div style="background:#f8f9fa; padding:15px; border-radius:8px;">
                            <strong>Romaniserad titel</strong><br>${film.original_title_romanised}
                        </div>
                    </div>
                    
                    <div style="margin-top:30px; background:#2c3e50; color:white; padding:20px; border-radius:8px;">
                        <h3><i class="fas fa-code"></i> JSON-data från API</h3>
                        <pre style="overflow:auto; font-family:monospace; font-size:0.9rem;">${JSON.stringify(film, null, 2)}</pre>
                    </div>
                </div>
            </div>
        `;
        
    } catch (error) {
        container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: #5d6d7e;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #e74c3c; margin-bottom: 20px;"></i>
                <h2>Kunde inte ladda filmen</h2>
                <p>${error.message}</p>
                <a href="index.html" style="display:inline-block; margin-top:20px; padding:10px 20px; background:#3498db; color:white; border-radius:5px; text-decoration:none;">
                    <i class="fas fa-arrow-left"></i> Tillbaka till filmlistan
                </a>
            </div>
        `;
    } finally {
        loading.style.display = 'none';
    }
}

// Kör när sidan laddas
loadFilmDetails();