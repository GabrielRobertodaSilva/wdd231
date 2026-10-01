document.addEventListener("DOMContentLoaded", () => {
  
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

 
  const timestampInput = document.getElementById("timestamp");
  if (timestampInput) {
    timestampInput.value = new Date().toISOString();
  }

 
  const modalButtons = document.querySelectorAll(".modal-btn");
  const closeButtons = document.querySelectorAll(".close-modal");

  modalButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.showModal();
      }
    });
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest("dialog");
      if (modal) {
        modal.close();
      }
    });
  });
});