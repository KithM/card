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

function dealCards(owner) {
    let deck = [];
    for (let i = 0; i < 10; i++) {
        const randomCardIndex = Math.floor(Math.random() * cards.length);
        const randomCard = cards[randomCardIndex];
        const cardWithOwner = {...randomCard, owner}; // Add owner property
        deck.push(cardWithOwner);
    }
    return deck;
}

var playerDeck = dealCards('player');
var computerDeck = dealCards('computer');

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

// Function to resolve battles in the arena
function resolveArena() {
    // First, sort the cards by speed
    arena.sort((a, b) => {
        // If speed is not defined, assume it's zero
        const speedA = a.speed || 0;
        const speedB = b.speed || 0;

        return speedB - speedA; // Sort in descending order
    });

    // Now iterate through each card and perform its action
    arena.forEach(card => {
        // If the card has both damage and healing attributes, choose one randomly for this turn
        let action = null;
        if (card.damage && card.healing) {
            action = Math.random() < 0.5 ? 'damage' : 'healing';
        } else if (card.damage) {
            action = 'damage';
        } else if (card.healing) {
            action = 'healing';
        }

        // Apply the chosen action
        if (action === 'damage') {
            // Choose a random enemy card to damage
            const enemyCards = arena.filter(enemyCard => enemyCard.owner !== card.owner);
            if (enemyCards.length > 0) {
                const randomEnemy = enemyCards[Math.floor(Math.random() * enemyCards.length)];
                randomEnemy.health -= card.damage;
            }
        } else if (action === 'healing') {
            // Choose a random friendly card to heal (or heal self)
            const friendlyCards = arena.filter(friendlyCard => friendlyCard.owner === card.owner);
            const randomFriendly = friendlyCards[Math.floor(Math.random() * friendlyCards.length)];
            randomFriendly.health += card.healing;
        }
    });

    // Remove any cards from the arena with zero or negative health
    for (let i = arena.length - 1; i >= 0; i--) {
        if (arena[i].health <= 0) {
            arena.splice(i, 1);
        }
    }

    // Finally, update the UI to reflect the new state
    updateUI(arena, 'arena');
}

// Main game loop
function gameLoop() {
    shuffle(playerDeck);
    shuffle(computerDeck);

    computerTurn();
    playerTurn();
    resolveArena();

    // Check win conditions
    // If anyone's deck is empty, they lose
    if (playerDeck.length === 0 || computerDeck.length === 0) {
        // Declare winner and end game
    }
}

// Start the game
gameLoop();
