const gameContainer = document.getElementById("game");

const COLORS = [
	"red",
	"blue",
	"green",
	"orange",
	"purple",
	"red",
	"blue",
	"green",
	"orange",
	"purple",
];

const EMOJIS = {
	red: "🌋",
	blue: "🌍",
	green: "🌄",
	orange: "☀",
	purple: "🌑",
};

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(COLORS);
let shuffledEmojis = shuffle(EMOJIS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray, emojiArray) {
	for (let i = 0; i < colorArray.length; i++) {
		// create a new div
		const newDiv = document.createElement("div");
		const newSpan = document.createElement("span");

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(colorArray[i]);
		newDiv.classList.add("card");
		newDiv.classList.add("back");

		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener("click", handleCardClick);

		// append the div to the element with an id of game
		newSpan.append(emojiArray[colorArray[i]]);
		newDiv.appendChild(newSpan);
		gameContainer.append(newDiv);
	}
}

function createProgressBar(barText) {
	const progress = document.createElement("div");
	progress.classList.add("progress");
	const bar = document.createElement("div");
	bar.classList.add("bar");

	progress.appendChild(bar);
	document.querySelector("body").prepend(progress);
}

const totalMatches = COLORS.length / 2;
const colorsMatched = [];
let matchesFound = 0;
let choice1 = null;
let choice2 = null;

function handleCardClick(event) {
	if (colorsMatched.includes(event.target.classList[0])) return;
	if (event.target === choice1) return;

	event.target.classList.remove("back");

	if (!choice1) choice1 = event.target;
	else if (!choice2) choice2 = event.target;

	handleChoices();
}

function compareColors() {
	const card1 = choice1.classList[0];
	const card2 = choice2.classList[0];

	if (card1 === card2) {
		console.log("same");
		colorsMatched.push(card1);
		return true;
	} else {
		console.log("no match");
		return false;
	}
}

function handleChoices() {
	if (choice1 && choice2) {
		gameContainer.classList.add("no-click");

		if (!compareColors()) {
			setTimeout(() => {
				choice1.classList.add("back");
				choice2.classList.add("back");
				choice1 = null;
				choice2 = null;
				gameContainer.classList.remove("no-click");
			}, 1000);
		} else {
			matchesFound += 1;
			console.log(matchesFound);
			choice1 = null;
			choice2 = null;
			gameContainer.classList.remove("no-click");
		}

		updateProgress();
	}

	if (matchesFound === totalMatches) {
		console.log("You found all matches", matchesFound, totalMatches);
		const gameOverText = document.createElement("span");
		gameOverText.classList.add("gameover");
		gameOverText.innerHTML = "GAME OVER";
		gameContainer.appendChild(gameOverText);
		setTimeout(() => {
			gameContainer.removeChild(gameOverText);
		}, 5000);
		gameContainer.classList.add("no-click");
	}
}

const newSpan = document.createElement("span");

function updateProgress() {
	const percent = (matchesFound / totalMatches) * 100;

	document.querySelector(".bar").style.width = `${percent}%`;

	newSpan.innerText = `${matchesFound} out of ${totalMatches}`;
	document.querySelector(".progress").appendChild(newSpan);
}

// when the DOM loads
createDivsForColors(shuffledColors, shuffledEmojis);
createProgressBar();
