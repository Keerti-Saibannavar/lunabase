// Start Learning Button
function startLearning() {
    document.getElementById("learn").scrollIntoView({
        behavior: "smooth"
    });
}

// Quiz Answer Checking
function checkAnswer(answer) {

    let result = document.getElementById("result");

    if (answer === "Mars") {
        result.innerHTML = "Correct! Mars is the Red Planet! 🚀";
    } 
    else {
        result.innerHTML = "Try again! Keep learning, Junior Astronaut!";
    }
}

let missionProgress = {};

const missionStages = {
    moon: [

        {
            title: "Level 1: Space Explorer",
            question: "You are preparing for your Moon mission. Which object is Earth's natural satellite?",
            options: ["The Sun", "The Mars", "The Moon"],
            correct: 2,
            feedback: "Correct! The Moon is Earth's natural satellite."
        },

        {
            title: "Level 2: Astronaut Equipment",
            question: "Choose the essential equipment that helps astronauts breathe in space.",
            options: ["Umbrella","Oxygen suppply", "School bag"],
            correct: 1,
            feedback: "Excellent! Astronauts need an oxygen supply."
        },

        {
            title: "Level 3: Rocket Launch",
            question: "What should the rocket team check before launch?",
            options: ["Play music","Open the windows","Rocket systems and safety"],
            correct: 2,
            feedback: "Great! Safety and rocket systems must be checked before launch."
        },

        {
            title: "Level 4: Space Journey",
            question: "Your spacecraft detects an obstacle. What should you do?",
            options: ["Follow the navigation system", "Ignore the warning", "Turn off the controls"],
            correct: 0,
            feedback: "Correct! Navigation helps the spacecraft avoid obstacles."
        },

        {
            title: "Level 5: Moon Landing",
            question: "What is important before landing on the Moon?",
            options: [ "Close your eyes", "Check the landing area","Increase speed without checking"],
            correct: 1,
            feedback: "Well done! A safe landing requires careful checks."
        },

        {
            title: "Level 6: Moon Rover",
            question: "What vehicle helps astronauts explore the Moon?",
            options: [ "School bus","Airplane","Lunar rover"],
            correct: 2,
            feedback: "Amazing! A lunar rover helps explore the Moon's surface."
        },

        {
            title: "Level 7: Final Space Challenge",
            question: "What should astronauts do with collected Moon samples?",
            options: [ "Throw them away","Study them scientifically", "Leave them anywhere"],
            correct: 1,
            feedback: "Congratulations! Studying Moon samples helps scientists understand the Moon."
        }

    ],

    mars: [
        {
            title: "Mars Preparation",
            question: "What is Mars commonly known as?",
            options: ["Red Planet", "Blue Planet", "Green Planet"],
            correct: 0,
            feedback: "Mars is called the Red Planet because of its reddish surface."
        },
        {
            title: "Mars Survival",
            question: "Why do astronauts need a spacesuit on Mars?",
            options: ["For protection and oxygen", "For fashion", "For swimming"],
            correct: 0,
            feedback: "Spacesuits provide oxygen and protect astronauts in the Martian environment."
        },
        {
            title: "Mars Exploration",
            question: "Which vehicle can help explore the surface of Mars?",
            options: ["Mars rover", "School bus", "Airplane"],
            correct: 0,
            feedback: "Rovers explore the Martian surface and collect scientific information."
        }
    ],

    station: [
        {
            title: "Space Station Preparation",
            question: "Where does the International Space Station orbit?",
            options: ["Earth", "The Moon", "The Sun"],
            correct: 0,
            feedback: "The International Space Station orbits Earth."
        },
        {
            title: "Living in Space",
            question: "How do astronauts move around in microgravity?",
            options: ["Push and pull themselves", "Walk normally", "Drive a car"],
            correct: 0,
            feedback: "Astronauts use their hands and feet to push and pull themselves around."
        },
        {
            title: "Space Station Safety",
            question: "What should astronauts do if an emergency alarm sounds?",
            options: ["Follow emergency procedures", "Ignore it", "Go to sleep"],
            correct: 0,
            feedback: "Astronauts must follow their emergency procedures to stay safe."
        }
    ]
};

function showMission(mission) {
    if (!missionStages[mission]) return;

    missionProgress[mission] = {
        stage: 0,
        score: 0,
        completed: false,
        answered: false
    };

    renderMission(mission);
}

function renderMission(mission) {
    const result = document.getElementById("mission-result");
    const progress = missionProgress[mission];
    const stages = missionStages[mission];

    if (!progress || !result) return;

    if (progress.stage >= stages.length) {
        progress.completed = true;

        result.innerHTML = `
            <h3>🚀 Mission Completed!</h3>
            <p>Excellent work, Junior Astronaut!</p>
            <p>Your score: ${progress.score} points</p>
            <p>🏅 You earned your mission badge!</p>
        `;
        return;
    }

    const current = stages[progress.stage];

if (mission === "moon" && progress.stage === 2) {

    result.innerHTML = `
        <h2>🚀 Rocket Launch Control</h2>

        <p>Your rocket is ready for launch!</p>

        <h3>Complete your launch checklist:</h3>

        <label>
            <input type="checkbox" id="systemCheck">
            Check rocket systems
        </label>
        <br><br>

        <label>
            <input type="checkbox" id="crewCheck">
            Secure astronaut crew
        </label>
        <br><br>

        <label>
            <input type="checkbox" id="clearanceCheck">
            Receive launch clearance
        </label>
        <br><br>

        <button onclick="prepareRocket()">
            Confirm Preparation
        </button>

        <div id="rocketFeedback"></div>
    `;

    return;
}


    result.innerHTML = `
        <h3>🚀 ${current.title}</h3>

        <p>Mission Stage: ${progress.stage + 1} of ${stages.length}</p>

        <progress value="${progress.stage}"
                  max="${stages.length}"></progress>

        <h4>${current.question}</h4>

        ${current.options.map((option, index) => `
            <button onclick="answerMission('${mission}', ${index})"
            ${progress.answered ? "disabled" : ""}>
                ${option}
            </button>
            <br><br>
        `).join("")}

        <div id="mission-feedback"></div>
    `;
}

function answerMission(mission, choice) {
    const progress = missionProgress[mission];

    if (!progress || progress.completed || progress.answered) return;

    const current = missionStages[mission][progress.stage];
    const feedback = document.getElementById("mission-feedback");

    if (choice === current.correct) {
        progress.score += 10;
        progress.answered = true;

        feedback.innerHTML = `
            <h4>✅ Correct Decision!</h4>
            <p>${current.feedback}</p>
            <button onclick="nextMissionStage('${mission}')">
                Continue Mission
            </button>
        `;
    } else {
        feedback.innerHTML = `
            <h4>❌ Not quite right!</h4>
            <p>Think carefully and try another option.</p>
        `;
    }
}

function nextMissionStage(mission) {
    const progress = missionProgress[mission];

    if (!progress || !progress.answered) return;

    progress.stage++;
    progress.answered = false;

    renderMission(mission);
}

function prepareRocket() {

    const system = document.getElementById("systemCheck").checked;
    const crew = document.getElementById("crewCheck").checked;
    const clearance = document.getElementById("clearanceCheck").checked;

    const feedback = document.getElementById("rocketFeedback");

    if (!system || !crew || !clearance) {
        feedback.innerHTML =
            "<p>⚠️ Complete all three safety checks before launch!</p>";
        return;
    }

    feedback.innerHTML = `
        <h3>✅ Launch Preparation Complete!</h3>
        <p>Mission Control has approved your launch.</p>
        <button onclick="launchRocket()">🚀 Start Countdown</button>
    `;
}

function launchRocket() {

    const feedback = document.getElementById("rocketFeedback");

    let count = 5;

    feedback.innerHTML = `
        <h2 id="countdown">5</h2>
        <p>🚀 Rocket launch countdown!</p>
    `;

    const timer = setInterval(() => {

        count--;

        const display = document.getElementById("countdown");

        if (count > 0 && display) {
            display.textContent = count;
        }

        if (count === 0) {

            clearInterval(timer);

            feedback.innerHTML = `
                <h2>🚀 LIFTOFF!</h2>
                <p>Your rocket has successfully launched!</p>
                <button onclick="nextMissionStage('moon')">
                    Continue to Level 4
                </button>
            `;
        }

    }, 1000);
}

// NASA SPACE PICTURE GALLERY

async function loadNASAPictures() {

    const gallery = document.getElementById("nasa-gallery");

    const topics = [
        "Earth from space NASA",
        "Mars Perseverance rover NASA",
        "Moon surface NASA",
        "International Space Station NASA",
        "Saturn planet NASA",
        "Jupiter planet NASA"
    ];

    gallery.innerHTML = "<p>Loading space pictures... 🚀</p>";

    try {

        const results = await Promise.all(
            topics.map(async (topic) => {

                const url =
                    "https://images-api.nasa.gov/search?q=" +
                    encodeURIComponent(topic) +
                    "&media_type=image&page_size=5";

                const response = await fetch(url);
                const data = await response.json();

                return data.collection.items || [];
            })
        );

        gallery.innerHTML = "";

        results.forEach((items, index) => {

            const item = items.find(item =>
                item.links &&
                item.links.some(link => link.rel === "preview")
            );

            if (!item) return;

            const details = item.data[0];

            const imageLink = item.links.find(
                link => link.rel === "preview"
            );

            const imageURL = imageLink.href;

            const card = document.createElement("div");
            card.className = "nasa-card";

            const image = document.createElement("img");
            image.src = imageURL;
            image.alt = details.title || topics[index];
            image.loading = "lazy";

            const heading = document.createElement("h3");
            heading.textContent = [
                "🌍 Earth",
                "🔴 Mars",
                "🌕 Moon",
                "🛰️ Space Station",
                "🪐 Saturn",
                "🪐 Jupiter"
            ][index];

            const text = document.createElement("p");
            text.textContent = "Click to explore!";

            card.append(image, heading, text);

            card.addEventListener("click", () => {
                showPicture(
                    imageURL,
                    details.title || topics[index],
                    details.description || "Explore this NASA photograph!"
                );
            });

            gallery.appendChild(card);

        });

        if (!gallery.children.length) {
            gallery.textContent =
                "No pictures found. Please try again later.";
        }

    } catch (error) {

        gallery.innerHTML =
            "<p>Pictures could not load. Please check your internet connection and try again.</p>";

        console.error("NASA gallery error:", error);
    }
}


// OPEN PICTURE

function showPicture(image, title, description) {

    document.getElementById("modal-image").src = image;

    document.getElementById("modal-title").textContent = title;

    document.getElementById("modal-description").textContent =
        description;

    document.getElementById("picture-modal").style.display = "flex";
}


// CLOSE PICTURE

function closePicture() {

    document.getElementById("picture-modal").style.display = "none";

}


// LOAD PICTURES WHEN PAGE OPENS

document.addEventListener("DOMContentLoaded", loadNASAPictures);

/* ALIEN'S LOST SPACE SNACKS GAME */

const alienQuestions = [
    {
        planet: "⚫ Mercury",
        question: "Which planet is closest to the Sun?",
        options: ["Earth", "Mercury", "Mars", "Neptune"],
        answer: "Mercury",
        fact: "Mercury is the closest planet to the Sun. Zippy says it is a very sunny neighbourhood!"
    },
    {
        planet: "🟡 Venus",
        question: "Which is the hottest planet?",
        options: ["Venus", "Earth", "Mars", "Saturn"],
        answer: "Venus",
        fact: "Venus is the hottest planet. Zippy needs a fan here!"
    },
    {
        planet: "🌍 Earth",
        question: "Which planet is our home?",
        options: ["Jupiter", "Earth", "Venus", "Uranus"],
        answer: "Earth",
        fact: "Earth is our home planet. Zippy loves our oceans!"
    },
    {
        planet: "🔴 Mars",
        question: "What is Mars called?",
        options: ["Blue Planet", "Green Planet", "Red Planet", "Ring Planet"],
        answer: "Red Planet",
        fact: "Mars is called the Red Planet because of its rusty surface."
    },
    {
        planet: "🟠 Jupiter",
        question: "Which is the largest planet?",
        options: ["Earth", "Mars", "Jupiter", "Mercury"],
        answer: "Jupiter",
        fact: "Jupiter is the biggest planet. Zippy needs a giant snack here!"
    },
    {
        planet: "🪐 Saturn",
        question: "Which planet is famous for its rings?",
        options: ["Venus", "Saturn", "Earth", "Mars"],
        answer: "Saturn",
        fact: "Saturn has beautiful rings made mostly of ice and rocky pieces."
    },
    {
        planet: "🔵 Uranus",
        question: "Which planet rotates on its side?",
        options: ["Uranus", "Earth", "Mercury", "Mars"],
        answer: "Uranus",
        fact: "Uranus rotates on its side. Zippy thinks it is doing a space cartwheel!"
    },
    {
        planet: "🔵 Neptune",
        question: "Which is the eighth planet from the Sun?",
        options: ["Jupiter", "Saturn", "Neptune", "Venus"],
        answer: "Neptune",
        fact: "Neptune is the eighth planet and has very strong winds."
    }
];

let alienIndex = 0;
let alienStars = 0;
let alienSnacks = 0;
let alienAnswered = false;

function startAlienGame() {

    alienIndex = 0;
    alienStars = 0;
    alienSnacks = 0;

    document.getElementById("alien-start").style.display = "none";
    document.getElementById("alien-finish").style.display = "none";
    document.getElementById("alien-play").style.display = "block";

    updateAlienScore();
    showAlienQuestion();
}

function updateAlienScore() {

    document.getElementById("alien-stars").textContent = alienStars;

    document.getElementById("alien-snacks").textContent = alienSnacks;
}

function showAlienQuestion() {

    alienAnswered = false;

    const q = alienQuestions[alienIndex];

    document.getElementById("alien-planet").textContent =
        `Planet ${alienIndex + 1} of 8: ${q.planet}`;

    document.getElementById("alien-question").textContent =
        q.question;

    document.getElementById("alien-feedback").textContent =
        "👾 Zippy is waiting for your answer!";

    document.getElementById("alien-next").style.display = "none";

    const options = document.getElementById("alien-options");

    options.innerHTML = "";

    q.options.forEach(option => {

        const button = document.createElement("button");

        button.textContent = option;

        button.onclick = () => checkAlienAnswer(option, button);

        options.appendChild(button);

    });
}

function checkAlienAnswer(selected, button) {

    if (alienAnswered) return;

    alienAnswered = true;

    const q = alienQuestions[alienIndex];

    const buttons = document.querySelectorAll("#alien-options button");

    buttons.forEach(b => b.disabled = true);

    if (selected === q.answer) {

        alienStars++;
        alienSnacks++;

        button.style.background = "#218838";

        document.getElementById("alien-feedback").textContent =
            "🎉 Correct! Zippy found a yummy space snack! 🍪";

    } else {

        button.style.background = "#a94442";

        buttons.forEach(b => {
            if (b.textContent === q.answer) {
                b.style.background = "#218838";
            }
        });

        document.getElementById("alien-feedback").textContent =
            "😊 Good try! " + q.fact;

    }

    updateAlienScore();

    document.getElementById("alien-next").style.display = "inline-block";

    document.getElementById("alien-next").textContent =
        alienIndex === 7 ? "Finish Adventure 🏆" : "Next Planet ➜";
}

function nextAlienQuestion() {

    alienIndex++;

    if (alienIndex < alienQuestions.length) {

        showAlienQuestion();

    } else {

        finishAlienGame();

    }
}

function finishAlienGame() {

    document.getElementById("alien-play").style.display = "none";

    document.getElementById("alien-finish").style.display = "block";

    document.getElementById("alien-final-score").textContent =
        `You earned ${alienStars} out of 8 stars! ⭐`;

    let message = "";

    if (alienStars === 8) {
        message = "Amazing! You are a Planet Master! Zippy found all the snacks!";
    } else if (alienStars >= 5) {
        message = "Wonderful work! Zippy is very happy!";
    } else {
        message = "Great effort! Let's explore the planets again together!";
    }

    document.getElementById("alien-final-message").textContent = message;
}

/* FINAL SPACE KNOWLEDGE TEST */

const finalQuestions = [

    {
        question: "Which star is at the centre of our Solar System?",
        options: ["Moon", "Sun", "Earth", "Mars"],
        answer: "Sun",
        fact: "The Sun is the star at the centre of our Solar System!"
    },

    {
        question: "Which planet is closest to the Sun?",
        options: ["Earth", "Venus", "Mercury", "Mars"],
        answer: "Mercury",
        fact: "Mercury is the closest planet to the Sun!"
    },

    {
        question: "Which is the hottest planet?",
        options: ["Mars", "Venus", "Earth", "Neptune"],
        answer: "Venus",
        fact: "Venus is the hottest planet!"
    },

    {
        question: "Which planet is our home?",
        options: ["Jupiter", "Earth", "Saturn", "Mars"],
        answer: "Earth",
        fact: "Earth is our beautiful home planet!"
    },

    {
        question: "Why is Mars called the Red Planet?",
        options: [
            "It has red flowers",
            "It has rusty red dust",
            "It is very hot",
            "It has red oceans"
        ],
        answer: "It has rusty red dust",
        fact: "Mars looks red because of iron-rich dust on its surface!"
    },

    {
        question: "Which is the largest planet?",
        options: ["Earth", "Mars", "Jupiter", "Mercury"],
        answer: "Jupiter",
        fact: "Jupiter is the largest planet in our Solar System!"
    },

    {
        question: "Which planet is famous for its rings?",
        options: ["Venus", "Saturn", "Earth", "Mars"],
        answer: "Saturn",
        fact: "Saturn is famous for its beautiful rings!"
    },

    {
        question: "Which planet rotates on its side?",
        options: ["Earth", "Mars", "Uranus", "Jupiter"],
        answer: "Uranus",
        fact: "Uranus has an unusual sideways rotation!"
    },

    {
        question: "Which planet is eighth from the Sun?",
        options: ["Saturn", "Jupiter", "Neptune", "Venus"],
        answer: "Neptune",
        fact: "Neptune is the eighth and farthest planet from the Sun!"
    },

    {
        question: "What do astronauts wear to protect themselves in space?",
        options: [
            "Raincoat",
            "Spacesuit",
            "School uniform",
            "Swimming suit"
        ],
        answer: "Spacesuit",
        fact: "Astronauts wear special spacesuits for protection in space!"
    }

];

let testIndex = 0;
let testScore = 0;
let testAnswered = false;


function startFinalTest() {

    testIndex = 0;
    testScore = 0;

    document.getElementById("test-result").style.display = "none";

    document.getElementById("test-game").style.display = "block";

    document.querySelector(".test-welcome").style.display = "none";

    showTestQuestion();
}


function showTestQuestion() {

    testAnswered = false;

    const q = finalQuestions[testIndex];

    document.getElementById("test-progress").textContent =
        `Question ${testIndex + 1} of 10`;

    document.getElementById("test-progress-fill").style.width =
        `${(testIndex / 10) * 100}%`;

    document.getElementById("test-question").textContent =
        q.question;

    document.getElementById("test-feedback").textContent =
        "🌟 Choose your answer!";

    document.getElementById("test-next").style.display = "none";

    const area = document.getElementById("test-options");

    area.innerHTML = "";

    q.options.forEach(option => {

        const button = document.createElement("button");

        button.textContent = option;

        button.onclick = () => checkTestAnswer(option, button);

        area.appendChild(button);

    });
}


function checkTestAnswer(selected, button) {

    if (testAnswered) return;

    testAnswered = true;

    const q = finalQuestions[testIndex];

    const buttons = document.querySelectorAll("#test-options button");

    buttons.forEach(btn => btn.disabled = true);

    if (selected === q.answer) {

        testScore++;

        button.style.background = "#218838";

        document.getElementById("test-feedback").textContent =
            "🎉 Excellent! Correct answer! ⭐";

    } else {

        button.style.background = "#a94442";

        buttons.forEach(btn => {
            if (btn.textContent === q.answer) {
                btn.style.background = "#218838";
            }
        });

        document.getElementById("test-feedback").textContent =
            "😊 Good try! " + q.fact;

    }

    document.getElementById("test-next").style.display = "inline-block";

    document.getElementById("test-next").textContent =
        testIndex === 9 ? "See My Result 🏆" : "Next Question ➜";
}


function nextTestQuestion() {

    testIndex++;

    if (testIndex < finalQuestions.length) {

        showTestQuestion();

    } else {

        finishFinalTest();

    }
}


function finishFinalTest() {

    document.getElementById("test-game").style.display = "none";

    document.getElementById("test-result").style.display = "block";

    document.getElementById("test-progress-fill").style.width = "100%";

    document.getElementById("test-score").textContent =
        `Your Score: ${testScore} / 10 ⭐`;

    let badge = "";
    let message = "";

    if (testScore >= 9) {

        badge = "🏆 Space Genius Gold Badge";

        message = "Fantastic! You know so much about space!";

    } else if (testScore >= 7) {

        badge = "🥈 Space Explorer Silver Badge";

        message = "Wonderful! You are a great Space Explorer!";

    } else if (testScore >= 5) {

        badge = "🥉 Junior Astronaut Bronze Badge";

        message = "Good job! Keep discovering the universe!";

    } else {

        badge = "🚀 Space Learner Badge";

        message = "Nice try! Explore the planets and learn again!";

    }

    document.getElementById("test-badge").textContent = badge;

    document.getElementById("test-message").textContent = message;
}
/* ASTRONAUT TRAINING PROGRESS */

let completedTraining = new Set();

function completeTraining(number, button) {

    // Prevent earning the same star twice
    if (completedTraining.has(number)) {
        return;
    }

    completedTraining.add(number);

    button.textContent = "⭐ Training Completed!";
    button.disabled = true;

    updateTrainingProgress();

    alert("Excellent work, Junior Astronaut! ⭐");
}


function updateTrainingProgress() {

    const total = completedTraining.size;

    document.getElementById("training-stars").textContent = total;

    document.getElementById("training-progress").textContent =
        `You have completed ${total} of 8 training activities.`;

    if (total === 8) {

        document.getElementById("training-message").textContent =
            "🎉 Congratulations! You completed all astronaut training!";

    } else if (total >= 4) {

        document.getElementById("training-message").textContent =
            "🚀 Great progress! Keep going, Space Explorer!";

    } else {

        document.getElementById("training-message").textContent =
            "Keep learning and collect more astronaut stars!";

    }
}


function resetTraining() {

    completedTraining.clear();

    document.querySelectorAll(
        ".training-card button"
    ).forEach(button => {

        button.disabled = false;
        button.textContent = "Complete Training ⭐";

    });

    updateTrainingProgress();

    alert("Your training has been restarted! 🚀");
}


/* LOAD REAL NASA PHOTOGRAPHS */

async function loadTrainingPhotos() {

    const photos = document.querySelectorAll(
        "#training .training-photo"
    );

    for (const photo of photos) {

        const query = photo.dataset.query;

        const url =
            "https://images-api.nasa.gov/search?q=" +
            encodeURIComponent(query) +
            "&media_type=image&page_size=10";

        try {

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("NASA image request failed");
            }

            const data = await response.json();

            const items = data.collection.items;

            const imageItem = items.find(item =>
                item.links &&
                item.links.some(link =>
                    link.render === "image"
                )
            );

            if (imageItem) {

                const imageLink = imageItem.links.find(link =>
                    link.render === "image"
                );

                photo.src = imageLink.href;

            } else {

                photo.alt = "Training photograph unavailable";

            }

        } catch (error) {

            console.error("Training image error:", error);

            photo.alt = "Unable to load NASA photograph";

        }
    }
}

document.addEventListener("DOMContentLoaded", loadTrainingPhotos);


function showTraining(topic) {

    let title = "";
    let information = "";

    if (topic === "environment") {
        title = "🌌 Space Environment";
        information = "Space is a huge area beyond Earth. It has no air to breathe and has very little gravity. Astronauts experience floating in space because of microgravity.";
    }

    else if (topic === "equipment") {
        title = "👩‍🚀 Astronaut Equipment";
        information = "Astronauts wear special spacesuits to protect their bodies in space. They use helmets, gloves, oxygen systems and safety equipment to survive and work.";
    }

    else if (topic === "station") {
        title = "🛰️ Space Station";
        information = "A space station is a large spacecraft where astronauts live and work. They perform experiments, exercise and observe Earth while travelling around it.";
    }

    else if (topic === "moon") {
        title = "🌙 Moon Exploration";
        information = "The Moon is Earth's natural satellite. Astronauts explore its surface, collect rock samples and study its environment. Moon missions help us understand space.";
    }

    else if (topic === "mission") {
        title = "🚀 Mission Preparation";
        information = "Before going to space, astronauts receive special training. They learn how to use equipment, operate spacecraft, work as a team and handle emergencies.";
    }

    else if (topic === "science") {
        title = "⭐ Space Science";
        information = "Space science helps us understand planets, stars, galaxies and the universe. Scientists use telescopes and spacecraft to discover new things about space.";
    }

    document.getElementById("training-info").innerHTML =
        "<h2>" + title + "</h2>" +
        "<p>" + information + "</p>" +
        "<button onclick='closeTraining()'>Close</button>";

}

function closeTraining() {
    document.getElementById("training-info").innerHTML =
        "<h2>🚀 Astronaut Training Centre</h2>" +
        "<p>Click any topic above to learn more.</p>";
}



