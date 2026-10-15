import { saveToColinha, removeFromColinha, getColinha } from './storage.js';
import { create } from 'https://esm.sh/zustand';

export async function fetchCandidates() {
  try {
    const response = await fetch('data/candidates.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Erro ao carregar candidatos:', error);
    const container = document.querySelector('#candidatesContainer');
    if (container) {
      container.innerHTML = `<p class="error">Failed to load candidates. Please try again later.</p>`;
    }
    return [];
  }
}

export function renderCandidateCard(candidate) {
  return `
    <article class="card">
      <img src="${candidate.photo}" alt="Foto de ${candidate.name}" loading="lazy" width="300" height="220">
      <div class="card-body">
        <span class="card-number">Nº ${candidate.number}</span>
        <h3>${candidate.name}</h3>
        <p><strong>Cargo:</strong> ${candidate.position}</p>
        <p><strong>Partido:</strong> ${candidate.party}</p>
        <div class="card-actions">
          <button class="btn-add" data-id="${candidate.id}">Save to Cheat Sheet</button>
          <button class="btn-details" data-id="${candidate.id}">Details</button>
        </div>
      </div>
    </article>
  `;
}

export function openCandidateModal(candidate) {
  const dialog = document.querySelector('#candidateModal');
  const modalContent = document.querySelector('#modalContent');
  
  modalContent.innerHTML = `
    <h2>${candidate.name} (${candidate.number})</h2>
    <p><strong>Position:</strong> ${candidate.position}</p>
    <p><strong>Party:</strong> ${candidate.party}</p>
    <hr style="margin: 0.5rem 0;">
    <p><strong>Biography:</strong> ${candidate.bio}</p>
    <p style="margin-top:0.5rem;"><strong>Proposals:</strong> ${candidate.proposals}</p>
  `;
  
  dialog.showModal();
}