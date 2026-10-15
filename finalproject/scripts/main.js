import { getColinha, saveToColinha, removeFromColinha } from './storage.js';
import { create } from 'https://esm.sh/zustand';

document.addEventListener('DOMContentLoaded', () => {
  
  const hamburger = document.querySelector('#hamburgerBtn');
  const navMenu = document.querySelector('#navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', navMenu.classList.contains('open'));
    });
  }

  
  renderColinhaDisplay();
});

export function renderColinhaDisplay() {
  const colinhaContainer = document.querySelector('#colinhaList');
  if (!colinhaContainer) return;

  const saved = getColinha();
  if (saved.length === 0) {
    colinhaContainer.innerHTML = '<p>Your shortlist is empty. Add candidates!</p>';
    return;
  }

  colinhaContainer.innerHTML = saved.map(item => `
    <li class="colinha-item">
      <div>
        <strong>${item.position}:</strong> ${item.name} (${item.number})
      </div>
      <button class="btn-remove" data-id="${item.id}" title="Remover">&times;</button>
    </li>
  `).join('');

  
  document.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      removeFromColinha(id);
      renderColinhaDisplay();
    });
  });
}