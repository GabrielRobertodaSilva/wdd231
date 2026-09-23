document.addEventListener('DOMContentLoaded', () => {
    
    const spotlightsContainer = document.getElementById('spotlights-container');

    async function loadSpotlights() {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) throw new Error('Failed to load member data.');
            
            const data = await response.json();
            const membersList = Array.isArray(data) ? data : data.members;

            
            const qualifiedMembers = membersList.filter(member => member.membership === 2 || member.membership === 3);

        
            const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());

            
            const selected = shuffled.slice(0, 3);

            displaySpotlights(selected);
        } catch (error) {
            console.error('Error fetching spotlights:', error);
            if (spotlightsContainer) {
                spotlightsContainer.innerHTML = '<p class="error">Unable to load spotlights at this time.</p>';
            }
        }
    }

    function displaySpotlights(members) {
        if (!spotlightsContainer) return;
        spotlightsContainer.innerHTML = '';

        members.forEach(member => {
            const levelText = member.membership === 3 ? 'Gold' : 'Silver';
            const card = document.createElement('div');
            card.className = 'spotlight-card';

            card.innerHTML = `
                <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="100" height="70">
                <h3>${member.name}</h3>
                <p class="tagline">${member.description || ''}</p>
                <hr>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Membership Level:</strong> <span class="badge level-${member.membership}">${levelText}</span></p>
                <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
            `;

            spotlightsContainer.appendChild(card);
        });
    }

    
    
    const apiKey = '61d9c84ce27b92cc1019259dc4f06568'; 
    const lat = '-26.8973'; 
    const lon = '-48.6514';

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    async function fetchWeather() {
        try {
            const response = await fetch(currentWeatherUrl);
            if (!response.ok) throw new Error('Weather network response was not ok');
            const data = await response.json();

            
            document.getElementById('current-temp').innerHTML = `${Math.round(data.main.temp)}&deg;C`;
            document.getElementById('weather-desc').textContent = data.weather[0].description;
            const iconCode = data.weather[0].icon;
            document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            document.getElementById('weather-icon').alt = data.weather[0].description;

            fetchForecast();
        } catch (error) {
            console.error('Weather error:', error);
            
            document.getElementById('weather-desc').textContent = '22°C - Clear sky (Mock Data)';
        }
    }

    async function fetchForecast() {
        try {
            const response = await fetch(forecastUrl);
            if (!response.ok) throw new Error('Forecast response was not ok');
            const data = await response.json();

            const forecastContainer = document.getElementById('weather-forecast');
            forecastContainer.innerHTML = '';

            
            const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

            dailyForecasts.forEach(day => {
                const date = new Date(day.dt * 1000);
                const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

                const div = document.createElement('div');
                div.className = 'forecast-day';
                div.innerHTML = `
                    <p><strong>${dayName}</strong></p>
                    <p>${Math.round(day.main.temp)}&deg;C</p>
                `;
                forecastContainer.appendChild(div);
            });
        } catch (error) {
            console.error('Forecast error:', error);
        }
    }

    
    loadSpotlights();
    fetchWeather();
});