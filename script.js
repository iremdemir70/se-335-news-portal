document.addEventListener("DOMContentLoaded", () => {
  loadFinance();
  closeAdHandlers();
  loadSlider();
  loadMagazineSlider();
  loadWeather();
  loadDontMiss(); 
});

function closeAdHandlers() {
  document.querySelectorAll(".close-ad").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.parentElement.style.display = "none";
    });
  });
}

async function loadSlider() {
  try {
    const response = await fetch('https://api.jsonbin.io/v3/b/67fff4f78561e97a50010aeb/latest');
    const { record } = await response.json();

    const carouselInner = document.getElementById('carousel-inner');
    const indicators = document.getElementById('carousel-indicators');
    
    carouselInner.innerHTML = "";
    indicators.innerHTML = "";

    record.forEach((item, index) => {
      carouselInner.innerHTML += `
        <div class="carousel-item position-relative ${index === 0 ? 'active' : ''}">
          <img src="${item.image}" class="d-block w-100 slider-img" alt="${item.title}">
          <h5 class="slider-full-title">${item.title}</h5>
        </div>`;
      indicators.innerHTML += `
        <button type="button" data-bs-target="#newsCarousel" data-bs-slide-to="${index}" ${index === 0 ? 'class="active"' : ''} aria-label="Slide ${index + 1}"></button>`;
    });
  } catch (err) {
    console.error("Slider yüklenemedi:", err);
  }
}

async function loadFinance() {
  try {
    const response = await fetch('https://api.jsonbin.io/v3/b/67fff8558561e97a50010ca4/latest');
    const { record } = await response.json();
    const container = document.getElementById("finance-bar");
    container.innerHTML = record.map(item => `
      <div class="finance-item">
        <strong>${item.name}</strong>: ${item.value}
        <span class="${item.status === "up" ? "finance-up" : item.status === "down" ? "finance-down" : "finance-neutral"}">${item.change}</span>
      </div>
    `).join('');
  } catch (err) {
    console.error("Finance bar yüklenemedi:", err);
  }
}

async function loadWeather() {
  try {
    const response = await fetch('https://api.jsonbin.io/v3/b/67fff6ca8960c979a586a06e/latest');
    const { record } = await response.json();
    const container = document.getElementById("weather-container");
    container.innerHTML = record.map(day => `
      <div class="card">
        <div class="fw-bold">${day.day}</div>
        <img src="${day.icon}" class="weather-icon">
        <div class="temp">
          <span class="text-danger fw-bold">${day.tempMax}°</span> /
          <span class="text-primary">${day.tempMin}°</span>
        </div>
      </div>`).join('');
  } catch (err) {
    console.error("Hava durumu yüklenemedi:", err);
  }
}

async function loadMagazineSlider() {
  try {
    const response = await fetch('https://api.jsonbin.io/v3/b/67fff7788960c979a586a0bc/latest');
    const { record } = await response.json();
    const container = document.getElementById("magazine-inner");
    container.innerHTML = record.map((item, i) => `
      <div class="carousel-item ${i === 0 ? 'active' : ''}">
        <img src="${item.image}" class="magazine-img w-100 rounded mb-1" alt="${item.title}">
        <p class="fw-bold small m-2">${item.title}</p>
      </div>`).join('');
  } catch (err) {
    console.error("Magazine slider yüklenemedi:", err);
  }
}

async function loadDontMiss() {
  try {
    const response = await fetch('https://api.jsonbin.io/v3/b/68036b928960c979a588886b/latest');
    const data = await response.json();
    const items = data.record.record; 

    const container = document.getElementById("dont-miss-container");
    let html = "";

    items.forEach(item => {
      html += `
        <div class="dont-miss-card">
          <img src="${item.image}" alt="${item.title}">
          <p>${item.title}</p>
        </div>
      `;
    });

    container.innerHTML = html;
  } catch (err) {
    console.error("Gözden Kaçmasın verileri yüklenemedi:", err);
  }
}



