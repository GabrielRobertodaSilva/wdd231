import { itemsOfInterest } from '../data/discover.mjs';

document.addEventListener('DOMContentLoaded', () => {
  handleVisitorMessage();
  renderCards(itemsOfInterest);
  updateFooterInfo();
});


function handleVisitorMessage() {
  const messageElement = document.getElementById('visit-message');
  if (!messageElement) return;

  const lastVisit = localStorage.getItem('lastVisitDate');
  const now = Date.now();
  const msInDay = 86400000; 

  if (!lastVisit) {
    messageElement.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const timeDifference = now - parseInt(lastVisit, 10);

    if (timeDifference < msInDay) {
      messageElement.textContent = "Back so soon! Awesome!";
    } else {
      const days = Math.floor(timeDifference / msInDay);
      messageElement.textContent = `You last visited ${days} ${days === 1 ? 'day' : 'days'} ago.`;
    }
  }


  localStorage.setItem('lastVisitDate', now.toString());
}


function renderCards(items) {
  const container = document.getElementById('discover-grid');
  if (!container) return;

  container.innerHTML = '';

  items.forEach((item, index) => {
    const card = document.createElement('section');
    card.classList.add('discover-card');
    card.style.gridArea = `card${index + 1}`;

    card.innerHTML = `
      <h2>${item.title}</h2>
      <figure>
        <img src="${item.image}" alt="${item.alt}" width="300" height="200" loading="lazy">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button type="button" class="learn-more-btn">Learn More</button>
    `;

    container.appendChild(card);
  });
}


function updateFooterInfo() {
  const yearSpan = document.getElementById('year');
  const lastModSpan = document.getElementById('lastModified');

  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  if (lastModSpan) lastModSpan.textContent = `Last Modification: ${document.lastModified}`;
}