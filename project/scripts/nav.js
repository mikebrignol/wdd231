const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('header nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('show');   
});
