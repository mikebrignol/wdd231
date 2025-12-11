const API_URL =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTgyYmU4NjIwYmVkZTMxNWNiODg0M2UyYWUzODUxMCIsIm5iZiI6MTc2NTA2NjE4Mi4wOTc5OTk4LCJzdWIiOiI2OTM0YzVjNjNmOGZhOGZiMTg0ZTQ5YTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.kEd97yjYco4yoFOMnB6Yi2k3Qa9bLUf1_6ZA7CZAEn0"
  }
};


const movieGrid = document.querySelector("#movieGrid");
const modal = document.querySelector("#movieModal");
const modalContent = document.querySelector("#modalContent");
const modalClose = document.querySelector("#modalClose");


async function getMovies() {
  try {
    const res = await fetch(API_URL, options);
    const data = await res.json();
    displayMovies(data.results);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}



function displayMovies(movies) {
  movieGrid.innerHTML = "";

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
        <img 
            src="${IMAGE_BASE}${movie.poster_path}" 
            alt="${movie.title}" 
            loading="lazy"
        >
        <h3>${movie.title}</h3>
        <button class="details-btn" data-id="${movie.id}">Details</button>
    `;

    movieGrid.appendChild(card);
  });

  // Attach modal triggers
  document.querySelectorAll(".details-btn").forEach((btn) => {
    btn.addEventListener("click", () => openModal(btn.dataset.id, movies));
  });
}



function openModal(id, movies) {
  const movie = movies.find((m) => m.id == id);

  modalContent.innerHTML = `
        <h2>${movie.title}</h2>
        <img src="${IMAGE_BASE}${movie.poster_path}" alt="${movie.title}">
        <p>${movie.overview}</p>
        <p><strong>Rating:</strong> ⭐ ${movie.vote_average}</p>
        <p><strong>Release:</strong> ${movie.release_date}</p>
    `;

  modal.style.display = "flex";
  document.body.style.overflow = "hidden"; // prevent scrolling
}

modalClose.addEventListener("click", () => closeModal());
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}



const themeToggle = document.querySelector("#themeToggle");

if (themeToggle) {
  let savedTheme = localStorage.getItem("theme") || "light";
  document.body.dataset.theme = savedTheme;

  themeToggle.checked = savedTheme === "dark";

  themeToggle.addEventListener("change", () => {
    const newTheme = themeToggle.checked ? "dark" : "light";
    document.body.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
  });
}


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


getMovies();
