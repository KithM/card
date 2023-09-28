var gameState = null;

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
async function computerTurn() {
    messageBox.textContent = "Computer's turn...";
    await sleep(1000); // Wait a second to let the player see the message

    // Randomly select a card and move it to the arena
    const randomIndex = Math.floor(Math.random() * computerDeck.length);
    const selectedCard = computerDeck.splice(randomIndex, 1)[0];
    
    const arenaIndex = arena.length;  // The position the card will take in the arena
    animateCard('computer', randomIndex, arenaIndex);  // Pass the start and end positions
    
    arena.push(selectedCard);
    updateUI(computerDeck, 'computerDeck');
    updateUI(arena, 'arena');
}

// Player Turn
async function playerTurn() {
    return new Promise(resolve => {
        messageBox.textContent = "Your turn!";
        updateUI(playerDeck, 'playerDeck');
  
        const playerCards = document.querySelectorAll('#playerDeck .card');
        playerCards.forEach((cardElement, index) => {
            cardElement.addEventListener('click', async function() {
                const selectedCard = playerDeck.splice(index, 1)[0];
                
                const arenaIndex = arena.length;
                animateCard('player', index, arenaIndex);
                
                arena.push(selectedCard);
                updateUI(playerDeck, 'playerDeck');
                await sleep(1000); // Wait for animation to complete
                
                updateUI(arena, 'arena');
                resolve(); // Resolve the promise
            }, { once: true });
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
        
        // Set border color based on the owner of the card
        if (card.owner === 'computer') {
            cardElement.style.borderColor = 'red';
        } else if (card.owner === 'player') {
            cardElement.style.borderColor = 'green';
        }

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

function animateCard(owner, startPositionIndex, endPositionIndex) {
    // Create a temporary card element to show the animation
    const cardElement = document.createElement('div');
    cardElement.className = 'card animating-card';

    // Calculate the start and end positions based on the card index in the respective decks
    const startDeck = document.getElementById(`${owner}Deck`);
    const endDeck = document.getElementById("arena");
    const startRect = startDeck.getBoundingClientRect();
    const endRect = endDeck.getBoundingClientRect();

    const cardWidth = 100;  // Width of a card including its margin (adjust based on your actual value)
    const cardStartX = startRect.left + startPositionIndex * cardWidth;
    const cardEndX = endRect.left + endPositionIndex * cardWidth;

    cardElement.style.top = `${startRect.top}px`;
    cardElement.style.left = `${cardStartX}px`;

    // Append the temporary card element to the body
    document.body.appendChild(cardElement);

    // Animate the temporary card to the arena
    setTimeout(() => {
        cardElement.style.top = `${endRect.top}px`;
        cardElement.style.left = `${cardEndX}px`;
    }, 10);

    // Remove the temporary card element after the animation completes
    setTimeout(() => {
        cardElement.remove();
    }, 1010);
}

// Sleep function to introduce delays
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// async function gameLoop() {
//     while (gameState !== null) {
//         computerTurn();
//         await waitForPlayerTurn(); // Wait for player to make a move
//         resolveArena();
//         // Check win conditions
//     }
// }
async function gameLoop() {
    while (gameState !== null) {
        await computerTurn(); // Wait for computer turn to complete
        await playerTurn(); // Wait for player turn to complete
        resolveArena();
        // Check win conditions
    }
}

// Shuffle cards
shuffle(playerDeck);
shuffle(computerDeck);

// Initialize game state
gameState = 'ongoing';

// Start the game
gameLoop();
