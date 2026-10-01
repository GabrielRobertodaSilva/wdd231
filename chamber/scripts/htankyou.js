document.addEventListener("DOMContentLoaded", () => {
 
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

 
  const urlParams = new URLSearchParams(window.location.search);

  const fields = ["fname", "lname", "orgtitle", "email", "phone", "orgname", "membership", "timestamp"];

  fields.forEach((field) => {
    const element = document.getElementById(`show-${field}`);
    if (element) {
      let value = urlParams.get(field);
      if (value) {
        
        if (field === "timestamp") {
          const dateObj = new Date(value);
          value = isNaN(dateObj.getTime()) ? value : dateObj.toLocaleString();
        }
        element.textContent = value;
      }
    }
  });
});