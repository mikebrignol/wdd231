const directoryContainer = document.querySelector("#directory");
const dataURL = "data/members.json";

async function loadDirectory() {
    try {
        const response = await fetch(dataURL);
        const businesses = await response.json();

        displayBusinesses(businesses);

    } catch (error) {
        directoryContainer.innerHTML = `<p style="color:red;">Error loading directory: ${error.message}</p>`;
        console.error("Error loading directory:", error);
    }
}

function displayBusinesses(list) {
    directoryContainer.innerHTML = "";

    list.forEach(business => {
        const card = document.createElement("section");
        card.classList.add("directory-card");

        card.innerHTML = `
            <img src="images/${business.image}" alt="${business.name} logo">
            <h3>${business.name}</h3>
            <p><strong>Address:</strong> ${business.address}</p>
            <p><strong>Phone:</strong> ${business.phone}</p>
            <a href="${business.website}" target="_blank">Visit Website</a>
            <p><strong>Membership:</strong> ${membershipLevel(business.membership)}</p>
            <p><strong>Industry:</strong> ${business.industry}</p>
        `;

        directoryContainer.appendChild(card);
    });
}

function membershipLevel(level) {
    switch (level) {
        case 1: return "Member";
        case 2: return "Silver";
        case 3: return "Gold";
        default: return "Unknown";
    }
}

loadDirectory();
