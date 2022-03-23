document.addEventListener("DOMContentLoaded", () => {
	//card options
	const cardsArray = [
		{
			name: "fries",
			img: "images/fries.png",
		},
		{
			name: "fries",
			img: "images/fries.png",
		},
		{
			name: "burger",
			img: "images/burger.png",
		},
		{
			name: "burger",
			img: "images/burger.png",
		},
		{
			name: "icecream",
			img: "images/icecream.png",
		},
		{
			name: "icecream",
			img: "images/icecream.png",
		},
		{
			name: "pizza",
			img: "images/pizza.png",
		},
		{
			name: "pizza",
			img: "images/pizza.png",
		},
		{
			name: "milkshake",
			img: "images/milkshake.png",
		},
		{
			name: "milkshake",
			img: "images/milkshake.png",
		},
		{
			name: "hotdog",
			img: "images/hotdog.png",
		},
		{
			name: "hotdog",
			img: "images/hotdog.png",
		},
	];

	//randomize cards array order
	cardsArray.sort(() => 0.5 - Math.random());

	const board = document.querySelector(".board");
	const result = document.querySelector(".result");
	const message = document.querySelector(".message");
	const resetBtn = document.querySelector("button");

	let cardsChosenName = [];
	let cardsChosenId = [];
	let matches = [];

	//create board
	function displayCards() {
		for (let i = 0; i < cardsArray.length; i++) {
			const card = document.createElement("img");
			card.setAttribute("src", "images/blank.png");
			card.setAttribute("data-id", i);
			card.addEventListener("click", revealCard);
			board.append(card);
		}
	}

	//reveal card
	function revealCard() {
		message.textContent = "";
		let cardId = this.getAttribute("data-id");
		cardsChosenName.push(cardsArray[cardId].name);
		cardsChosenId.push(cardId);
		this.setAttribute("src", cardsArray[cardId].img);
		if (cardsChosenName.length === 2) {
			setTimeout(checkForMatch, 600);
		}
	}

	//check for matches
	function checkForMatch() {
		const cards = document.querySelectorAll("img");
		const choiceOneId = cardsChosenId[0];
		const choiceTwoId = cardsChosenId[1];

		if (choiceOneId === choiceTwoId) {
			cards[choiceOneId].setAttribute("src", "images/blank.png");
			cards[choiceTwoId].setAttribute("src", "images/blank.png");
			message.textContent = "You clicked the same card!";
		} else if (cardsChosenName[0] === cardsChosenName[1]) {
			message.textContent = "You found a match!";
			cards[choiceOneId].removeEventListener("click", revealCard);
			cards[choiceTwoId].removeEventListener("click", revealCard);
			matches.push(cardsChosenName);
		} else {
			cards[choiceOneId].setAttribute("src", "images/blank.png");
			cards[choiceTwoId].setAttribute("src", "images/blank.png");
			message.textContent = "Sorry, try again";
		}
		cardsChosenName = [];
		cardsChosenId = [];
		result.textContent = matches.length;
		if (matches.length === cardsArray.length / 2) {
			message.textContent = "Congratulations! You win!";
		}
	}

	//reset game
	function resetGame() {
		const cards = document.querySelectorAll("img");
		cardsChosenName = [];
		cardsChosenId = [];
		matches = [];
		result.textContent = "0";
		message.textContent = "";
		cards.forEach((card) => card.setAttribute("src", "images/blank.png"));
		cards.forEach((card) => card.addEventListener("click", revealCard));
		cardsArray.sort(() => 0.5 - Math.random());
	}
	resetBtn.addEventListener("click", resetGame);

	displayCards();
});
