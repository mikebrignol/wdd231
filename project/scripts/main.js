const movies = [
  { title: "The Graduate", img: "images/the_graduate.jpg" },
  { title: "The Naked Gun", img: "images/the_naked_gun.jpg" },
  { title: "Hall Pass", img: "images/hall_pass.jpg" },
  { title: "The Day After Tomorrow", img: "images/day_after_tomorrow.jpg" },
  { title: "Y: The Last Man", img: "images/the_last_man.jpg" },
  { title: "Old School", img: "images/old_school.jpg" },
  { title: "We Are What We Are", img: "images/wawwa.jpg" },
  { title: "Interstellar", img: "images/interstellar.jpg" }
];

const movieGrid = document.querySelector('.movie-grid');
if (movieGrid) {
movies.forEach(movie => {
  const cardHTML = `
    <div class="movie-card">
      <img src="${movie.img}" alt="${movie.title}" loading="lazy">
      <h3>${movie.title}</h3>
    </div>
  `;
  movieGrid.insertAdjacentHTML("beforeend", cardHTML);
});
}

// Mobile back-to-top button
if (window.innerWidth <= 768) { 
  const backToTop = document.createElement("button");
  backToTop.id = "backToTop";
  backToTop.textContent = "↑";
  document.body.appendChild(backToTop);

  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 200 ? "block" : "none";
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const formMessage = document.getElementById("formMessage");

      if (!name || !email || !message) {
        formMessage.textContent = "Please fill out all fields.";
        formMessage.style.color = "red";
      } else {
        formMessage.textContent = "Thanks for your message!";
        formMessage.style.color = "green";
        this.reset();
      }
    });
  }
});



