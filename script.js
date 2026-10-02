const params = new URLSearchParams(window.location.search);

const societyId = params.get("society");

const society = societies[societyId];





if (society) {
    document.getElementById("society-name").textContent = society.name;

        document.getElementById("society-category").textContent =
        society.category;


    document.getElementById("society-description").textContent =
        society.description;

    document.getElementById("society-criteria").textContent =
        society.criteria;

    document.getElementById("society-roles").textContent =
        society.roles;

        document.getElementById("society-deadline").textContent =
    society.deadline;

    // DEADLINE COUNTDOWN

const deadlineTimer = document.getElementById("deadline-timer");

if (deadlineTimer && society.deadline) {

    const deadlineDate = new Date(society.deadline + " 23:59:59");

    function updateCountdown() {

        const now = new Date();
        const difference = deadlineDate - now;

        if (difference <= 0) {
            deadlineTimer.textContent = "Applications closed";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));

        const hours = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (difference / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
            (difference / 1000) % 60
        );

        deadlineTimer.textContent =
            `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    updateCountdown();

    setInterval(updateCountdown, 1000);
}
}


// SEARCH

const search = document.getElementById("search");
const cards = document.querySelectorAll(".society-card");
const emptyState = document.getElementById("empty-state");

if (search) {
    search.addEventListener("input", function() {

        const searchText = search.value.toLowerCase();

        let visibleCards = 0;

        cards.forEach(function(card) {

            const societyName =
                card.querySelector("h3").textContent.toLowerCase();

            if (societyName.includes(searchText)) {
                card.style.display = "block";
                visibleCards++;
            } else {
                card.style.display = "none";
            }

        });

        // Show empty state if nothing matches
        if (visibleCards === 0) {
            emptyState.style.display = "block";
        } else {
            emptyState.style.display = "none";
        }

    });
}


// CATEGORY FILTER

function filterSocieties(category) {

    let visibleCards = 0;

    cards.forEach(function(card) {

        const societyCategory =
            card.querySelector("p").textContent;

        if (category === "all" || societyCategory === category) {
            card.style.display = "block";
            visibleCards++;
        } else {
            card.style.display = "none";
        }

    });

    // Show empty state if nothing matches
    if (visibleCards === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
    }

}


// DARK MODE

const themeToggle = document.getElementById("theme-toggle");

// Apply saved theme when page loads
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    if (themeToggle) {
        themeToggle.textContent = "☀️ Light Mode";
    }

}

// Toggle theme
if (themeToggle) {

    themeToggle.addEventListener("click", function() {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "☀️ Light Mode";

        } else {

            localStorage.setItem("theme", "light");
            themeToggle.textContent = "🌙 Dark Mode";

        }

    });

}


// FORM VALIDATION

const form = document.getElementById("apply-form");
const confirmation = document.getElementById("confirmation");

if (form) {

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        let valid = true;

        const name = document.getElementById("name");
        const year = document.getElementById("year");
        const branch = document.getElementById("branch");
        const role = document.getElementById("role");
        const why = document.getElementById("why");

        // Clear previous errors
        document.querySelectorAll(".error").forEach(function(error) {
            error.textContent = "";
        });

        document.querySelectorAll(
            "#apply-form input, #apply-form select, #apply-form textarea"
        ).forEach(function(field) {
            field.classList.remove("input-error");
        });

        confirmation.textContent = "";

        // Name
        if (name.value.trim() === "") {

            document.getElementById("name-error").textContent =
                "Please enter your name.";

            name.classList.add("input-error");

            valid = false;
        }

        // Year
        if (year.value === "") {

            document.getElementById("year-error").textContent =
                "Please select your year.";

            year.classList.add("input-error");

            valid = false;
        }

        // Branch
        if (branch.value.trim() === "") {

            document.getElementById("branch-error").textContent =
                "Please enter your branch.";

            branch.classList.add("input-error");

            valid = false;
        }

        // Role
        if (role.value.trim() === "") {

            document.getElementById("role-error").textContent =
                "Please enter a role.";

            role.classList.add("input-error");

            valid = false;
        }

        // Why
        if (why.value.trim() === "") {

            document.getElementById("why-error").textContent =
                "Please tell us why you want to join.";

            why.classList.add("input-error");

            valid = false;
        }

        // Success
        if (valid) {

            form.style.display = "none";

            confirmation.textContent = "Application submitted.";

            confirmation.style.fontSize = "24px";
            confirmation.style.fontWeight = "bold";
            confirmation.style.textAlign = "center";
            confirmation.style.marginTop = "30px";
        }

    });

}


// SOCIETY HEADER BACKGROUND

const societyImages = {

    robotics: "images/robotics.png",
    coding: "images/coding.png",
    drama: "images/dramatics.png",
    music: "images/music.png",
    sports: "images/photography.png",
    literary: "images/literature.png"

};

const societyHeader = document.getElementById("society-header");

if (societyHeader && societyImages[societyId]) {

    societyHeader.style.backgroundImage =
    `url("${societyImages[societyId]}")`;

}

// PAGE + BACK TRANSITIONS

const transition = document.createElement("div");
transition.id = "page-transition";

document.body.prepend(transition);


// FADE IN

requestAnimationFrame(function() {

    requestAnimationFrame(function() {
        transition.classList.add("hide");
    });

});


// FUNCTION USED FOR BOTH DIRECTIONS

function startPageTransition(callback) {

    transition.classList.remove("hide");

    // Wait until fade completely finishes
    transition.addEventListener("transitionend", function handler() {

        transition.removeEventListener("transitionend", handler);

        callback();

    });

}

// FORWARD: HOME → SOCIETY

document.querySelectorAll("a[href^='society.html']").forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const destination = this.href;

        startPageTransition(function() {
            window.location.href = destination;
        });

    });

});


// BACK: SOCIETY → HOME

document.querySelectorAll(".back-button").forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const destination = this.href;

        startPageTransition(function() {
            window.location.href = destination;
        });

    });

});


/* SOCIETY BACKGROUND THEME */

if (societyId) {
    document.body.classList.add("theme-" + societyId);
}

// APPLY BUTTON

const showApplyForm = document.getElementById("show-apply-form");
const applicationSection = document.getElementById("application-section");

if (showApplyForm && applicationSection) {

    showApplyForm.addEventListener("click", function () {

        // Hide Apply Now button completely
        showApplyForm.remove();

        // Show application form
        applicationSection.style.display = "block";

        // Scroll to the form
        applicationSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

}

// HERO TYPING EFFECT

const heroTyping = document.getElementById("hero-typing");

if (heroTyping) {

    const descriptions = [
        "Find societies that match your interests.",
        "Explore. Join. Create.",
        "Discover your community.",
    ];

    let descriptionIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeDescription() {

        const currentText = descriptions[descriptionIndex];

        if (!deleting) {

            heroTyping.textContent =
                currentText.substring(0, characterIndex + 1);

            characterIndex++;

            if (characterIndex === currentText.length) {

                setTimeout(function() {
                    deleting = true;
                    typeDescription();
                }, 1800);

                return;
            }

            setTimeout(typeDescription, 55);

        } else {

            heroTyping.textContent =
                currentText.substring(0, characterIndex - 1);

            characterIndex--;

            if (characterIndex === 0) {

                deleting = false;

                descriptionIndex =
                    (descriptionIndex + 1) % descriptions.length;

                setTimeout(typeDescription, 400);

                return;
            }

            setTimeout(typeDescription, 30);
        }
    }

    typeDescription();
}

// CAMPUS IMAGE CAROUSEL

const campusImages = [
    "images/background.png",
    "images/background2.jpg",
    "images/background3.jpg",
    "images/background4.jpg"
];

let campusIndex = 0;
let isSliding = false;

const hero = document.querySelector(".hero-overlay");
const previousCampus = document.getElementById("prev-campus");
const nextCampus = document.getElementById("next-campus");

if (hero && previousCampus && nextCampus) {

    // Create the initial image layer
    const currentLayer = document.createElement("div");

    currentLayer.className = "campus-image-layer";
    currentLayer.style.backgroundImage =
        `url("${campusImages[campusIndex]}")`;

    hero.appendChild(currentLayer);

    // Remove the original CSS background
    hero.style.backgroundImage = "none";


    function changeCampusImage(direction) {

        if (isSliding) return;

        isSliding = true;

        const oldLayer =
            hero.querySelector(".campus-image-layer:last-of-type");

        let newIndex;

        if (direction === "next") {

            newIndex = campusIndex + 1;

            if (newIndex >= campusImages.length) {
                newIndex = 0;
            }

        } else {

            newIndex = campusIndex - 1;

            if (newIndex < 0) {
                newIndex = campusImages.length - 1;
            }

        }

        const newLayer = document.createElement("div");

        newLayer.className =
            "campus-image-layer " +
            (direction === "next"
                ? "slide-in-right"
                : "slide-in-left");

        newLayer.style.backgroundImage =
            `url("${campusImages[newIndex]}")`;

        hero.appendChild(newLayer);

        oldLayer.classList.add(
            direction === "next"
                ? "slide-out-right"
                : "slide-out-left"
        );

        setTimeout(function() {

            oldLayer.remove();

            campusIndex = newIndex;
            isSliding = false;

        }, 550);
    }


    nextCampus.addEventListener("click", function() {
        changeCampusImage("next");
    });


    previousCampus.addEventListener("click", function() {
        changeCampusImage("previous");
    });

}