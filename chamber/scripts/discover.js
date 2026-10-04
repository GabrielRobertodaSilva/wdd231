document.addEventListener("DOMContentLoaded", () => {
  const visitMessage = document.getElementById("visit-message");
  const lastVisit = localStorage.getItem("lastVisitDate");
  const currentVisit = Date.now();

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const timeDifference = currentVisit - parseInt(lastVisit, 10);
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference < 1) {
      visitMessage.textContent = "Back so soon! Feels like yesterday!";
    } else if (daysDifference === 1) {
      visitMessage.textContent = "You last visited 1 day ago.";
    } else {
      visitMessage.textContent = `You last visited ${daysDifference} days ago.`;
    }
  }

  localStorage.setItem("lastVisitDate", currentVisit.toString());
});