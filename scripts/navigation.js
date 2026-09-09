document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger-btn');
    const nav = document.getElementById('primary-nav');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('show');
        hamburger.classList.toggle('open');
    });
});