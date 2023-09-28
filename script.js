// cards moved to cards.js

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
    // Randomly select a card and move it to the arena
    const randomIndex = Math.floor(Math.random() * computerDeck.length);
    const selectedCard = computerDeck.splice(randomIndex, 1)[0];
    
    arena.push(selectedCard);
    updateUI(computerDeck, 'computerDeck');
    updateUI(arena, 'arena');
}

// Player's turn
function playerTurn() {
    updateUI(playerDeck, 'playerDeck');
    
    const playerCards = document.querySelectorAll('#playerDeck .card');
    playerCards.forEach((cardElement, index) => {
        cardElement.addEventListener('click', function() {
            const selectedCard = playerDeck.splice(index, 1)[0];
            
            arena.push(selectedCard);
            updateUI(playerDeck, 'playerDeck');
            updateUI(arena, 'arena');
        });
    });
}

// Function to update the UI
function updateUI(deck, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    deck.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        
        // Displaying the type of the card
        const typeElement = document.createElement('div');
        typeElement.className = 'type';
        typeElement.textContent = card.type;
        cardElement.appendChild(typeElement);

        // Displaying the health of the card
        if (card.health !== undefined) {
            const healthElement = document.createElement('div');
            healthElement.className = 'health';
            healthElement.textContent = card.health;
            cardElement.appendChild(healthElement);
        }

        // Displaying the mana or energy of the card
        if (card.mana !== undefined || card.energy !== undefined) {
            const manaEnergyElement = document.createElement('div');
            manaEnergyElement.className = 'mana-energy';
            manaEnergyElement.textContent = card.mana || card.energy;
            cardElement.appendChild(manaEnergyElement);
        }

        // Displaying the damage and healing of the card
        if (card.damage !== undefined || card.healing !== undefined) {
            const damageHealingElement = document.createElement('div');
            damageHealingElement.className = 'damage-healing';
            let textContent = '';
            if (card.damage !== undefined) textContent += `-${card.damage}`;
            if (card.healing !== undefined) textContent += (textContent ? '/' : '') + `+${card.healing}`;
            damageHealingElement.textContent = textContent;
            cardElement.appendChild(damageHealingElement);
        }

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
