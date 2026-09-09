document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Copyright Year
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Dynamic Last Modified Date
    const lastModifiedPara = document.getElementById('lastModified');
    if (lastModifiedPara) {
        lastModifiedPara.textContent = `Last Modification: ${document.lastModified}`;
    }
});