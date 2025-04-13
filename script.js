function closeAd(id) {
    document.getElementById(id).style.display = 'none';
  }

  async function loadSlider() {
    const response = await fetch('https://run.mocky.io/v3/4b73cacc-d3ca-4428-a9bb-a3cd3e31545f');
    const data = await response.json();
  
    const carouselInner = document.getElementById('carousel-inner');
    let html = "";
  
    data.forEach((item, index) => {
      html += `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
          <img src="${item.image}" class="d-block w-100 slider-img" alt="${item.title}">
          <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded">
            <h5>${item.title}</h5>
          </div>
        </div>
      `;
    });
  
    carouselInner.innerHTML = html;
  }
  
  loadSlider();
  
  async function loadFinance() {
    const response = await fetch('https://run.mocky.io/v3/b311d237-abdb-4549-bd85-fe55ad2942be');
    const data = await response.json();
  
    const container = document.getElementById("finance-bar");
    let html = "";
  
    data.forEach(item => {
      let className =
        item.status === "up"
          ? "finance-up"
          : item.status === "down"
          ? "finance-down"
          : "finance-neutral";
  
      html += `
        <div class="finance-item">
          <strong>${item.name}</strong>: ${item.value}
          <span class="${className}">${item.change}</span>
        </div>
      `;
    });
  
    container.innerHTML = html;
  }
  
  loadFinance();
  
  

  async function loadWeather() {
    const response = await fetch('https://run.mocky.io/v3/618d5100-a09e-4126-8ce0-30c8fec1fd4c');
    const data = await response.json();
  
    const container = document.getElementById("weather-container");
    let html = "";
  
    data.forEach(day => {
      html += `
        <div class="card">
          <div class="fw-bold">${day.day}</div>
          <img src="${day.icon}" class="weather-icon">
          <div class="temp">
            <span class="text-danger fw-bold">${day.tempMax}°</span> /
            <span class="text-primary">${day.tempMin}°</span>
          </div>
        </div>
      `;
    });
  
    container.innerHTML = html;
  }
  
  loadWeather();
  