const STORAGE_KEY = 'votesmart_colinha';
import { create } from 'https://esm.sh/zustand';

export function getColinha() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveToColinha(candidate) {
  const current = getColinha();
  
  const filtered = current.filter(item => item.position !== candidate.position);
  filtered.push(candidate);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function removeFromColinha(candidateId) {
  const current = getColinha();
  const updated = current.filter(item => item.id !== candidateId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}