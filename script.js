function randomRGB() {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);
	return `rgb(${r},${g},${b})`;
}

const letters = document.querySelectorAll('.letter');
for (let letter of letters) {
	setInterval(function() {
		letter.style.color = randomRGB();
	}, 1000);
}

const gameContainer = document.getElementById('game');
let card1 = null;
let card2 = null;
let card3 = null;
let cardsFlipped = 0;
let noClicking = false;

const COLORS = [
	'mediumvioletred',
	'cornflowerblue',
	'aquamarine',
	'coral',
	'thistle',
	'mediumvioletred',
	'cornflowerblue',
	'aquamarine',
	'coral',
	'thistle',
	'mediumvioletred',
	'cornflowerblue',
	'aquamarine',
	'coral',
	'thistle'
];

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

function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		const newDiv = document.createElement('div');

		newDiv.classList.add(color);

		newDiv.addEventListener('click', handleCardClick);

		gameContainer.append(newDiv);
	}
}

function handleCardClick(event) {
	if (noClicking) return;

	let currentCard = event.target;
	currentCard.style.backgroundColor = currentCard.classList[0];

	if (!card1 || !card2) {
		currentCard.classList.add('flipped');
		card1 = card1 || currentCard;
		card2 = card1 === currentCard ? null : currentCard;
	}

	if (card1 && card2) {
		noClicking = true;

		let guess1 = card1.className;
		let guess2 = card2.className;

		if (guess1 === guess2) {
			cardsFlipped += 2;
			card1.removeEventListener('click', handleCardClick);
			card2.removeEventListener('click', handleCardClick);
			card1 = null;
			card2 = null;
			noClicking = false;
		} else {
			setTimeout(function() {
				card1.style.backgroundColor = '';
				card2.style.backgroundColor = '';
				card1.classList.remove('flipped');
				card2.classList.remove('flipped');
				card1 = null;
				card2 = null;
				noClicking = false;
			}, 500);
		}
	}
	setTimeout(function() {
		if (cardsFlipped === COLORS.length) alert('Game Over!');
	}, 1000);
}

// when the DOM loads
createDivsForColors(shuffledColors);
