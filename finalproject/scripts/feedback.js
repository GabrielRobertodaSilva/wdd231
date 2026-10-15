import { create } from 'zustand'

document.addEventListener('DOMContentLoaded', () => {
  const resultsContainer = document.querySelector('#formDataResults');
  if (resultsContainer) {
    const params = new URLSearchParams(window.location.search);
    if (params.toString() === '') {
      resultsContainer.innerHTML = '<p>No data submitted.</p>';
      return;
    }

    let html = '<ul style="list-style:none; padding:0;">';
    params.forEach((value, key) => {
      html += `<li style="margin-bottom:0.5rem;"><strong>${key}:</strong> ${decodeURIComponent(value)}</li>`;
    });
    html += '</ul>';
    resultsContainer.innerHTML = html;
  }
});