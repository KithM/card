const cards = [
    { type: 'Warrior', health: 10, damage: 2 },
    { type: 'Healer', health: 8, healing: 2 },
    { type: 'Void' },
    // More cards...
];

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    return array;
}

function dealCards() {
    let deck = [];
    for (let i = 0; i < 10; i++) {
        const randomCardIndex = Math.floor(Math.random() * cards.length);
        const randomCard = cards[randomCardIndex];
        deck.push({...randomCard}); // Use spread operator to copy object values
    }
    return deck;
}

var playerDeck = dealCards();
var computerDeck = dealCards();

// The arena where cards will battle
const arena = [];

// Computer's turn
function computerTurn() {
    updateUI(computerDeck, 'computerDeck');
}

// Player's turn
function playerTurn() {
    updateUI(playerDeck, 'playerDeck');
}

// Function to update the UI
function updateUI(deck, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    deck.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.textContent = card.type;
        container.appendChild(cardElement);
    });
}

// Main game loop
function gameLoop() {
    shuffle(playerDeck);
    shuffle(computerDeck);

    computerTurn();
    playerTurn();

    // Check win conditions
    // If anyone's deck is empty, they lose
    if (playerDeck.length === 0 || computerDeck.length === 0) {
        // Declare winner and end game
    }
}

// Start the game
gameLoop();
