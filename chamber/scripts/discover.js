import { places } from "../data/places.mjs";

const grid = document.querySelector("#places-grid");
const visitMessage = document.querySelector("#visit-message");


function displayPlaces() {
    grid.innerHTML = "";

    places.forEach(place => {
        const card = document.createElement("section");
        card.classList.add("place-card");

        card.innerHTML = `
            <h2>${place.name}</h2>

            <figure>
                <img src="${place.image_url}.webp" alt="${place.name}">
            </figure>

            <address>${place.address}</address>

            <p>${place.description}</p>

            <button class="learn-btn">Learn More</button>
        `;

        grid.appendChild(card);
    });
}

displayPlaces();


function handleVisits() {
    const lastVisit = Number(localStorage.getItem("lastVisit"));
    const now = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const days = Math.round((now - lastVisit) / (1000 * 60 * 60 * 24));

        if (days < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (days === 1) {
            visitMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitMessage.textContent = `You last visited ${days} days ago.`;
        }
    }

    localStorage.setItem("lastVisit", now);
}

handleVisits();
