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

function shuffle(array) {
	let counter = array.length;

	while (counter > 0) {
		let index = Math.floor(Math.random() * counter);

		counter--;

		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(COLORS);
let shuffledEmojis = shuffle(EMOJIS);

function createDivsForColors(colorArray, emojiArray) {
	for (let i = 0; i < colorArray.length; i++) {
		const newDiv = document.createElement("div");
		const newSpan = document.createElement("span");

		newDiv.classList.add(colorArray[i]);
		newDiv.classList.add("card");
		newDiv.classList.add("back");

		newDiv.addEventListener("click", handleCardClick);

		newSpan.append(emojiArray[colorArray[i]]);
		newDiv.append(newSpan);
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
		colorsMatched.push(card1);
		return true;
	} else {
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
			choice1 = null;
			choice2 = null;
			gameContainer.classList.remove("no-click");
		}

		updateProgress();
	}

	if (matchesFound === totalMatches) {
		const gameOverText = document.createElement("span");

		gameOverText.classList.add("gameover");
		gameOverText.innerHTML = "GAME OVER";

		gameContainer.classList.add("no-click");
		gameContainer.append(gameOverText);

		setTimeout(() => {
			gameContainer.removeChild(gameOverText);
		}, 5000);
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
