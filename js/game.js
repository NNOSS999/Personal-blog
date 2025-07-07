// Animal categories (6 types, 2 of each)
const animals = ['🐱','🐕','🦎','🐒','🐦','🐋'];
const totalPairs = animals.length;
let deck = []; // Shuffled cards
let flipped = []; // Currently flipped cards
let matchedCount = 0;
let lock = false;

// Initialize game board
function setupGame() {
  // Duplicate and shuffle the animal list
  deck = [...animals, ...animals]
    .map((animal) => ({animal, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map((obj) => obj.animal);

  matchedCount = 0;
  flipped = [];
  lock = false;

  // Always hide the win message at start
  document.getElementById('win').style.display = 'none';

  // Build the grid HTML
  const game = document.getElementById('game');
  game.innerHTML = '';
  deck.forEach((animal, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = i;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">${animal}</div>
        <div class="card-back">?</div>
      </div>
    `;
    card.addEventListener('click', handleFlip);
    game.appendChild(card);
  });
}

// Handle card flip logic
function handleFlip(e) {
  const card = e.currentTarget;
  if (lock) return;                    // Prevent rapid clicking
  if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
  card.classList.add('flipped');
  flipped.push(card);

  if (flipped.length === 2) {
    lock = true;
    const [c1, c2] = flipped;
    const i1 = c1.dataset.index, i2 = c2.dataset.index;
    const v1 = deck[i1], v2 = deck[i2];

    if (v1 === v2) {
      // Match found
      setTimeout(() => {
        c1.classList.add('matched');
        c2.classList.add('matched');
        flipped = [];
        matchedCount++;
        lock = false;
        // If all matched, show win message
        if (matchedCount === totalPairs) {
          document.getElementById('win').style.display = 'block';
        }
      }, 550);
    } else {
      // Not matched: flip back after short delay
      setTimeout(() => {
        c1.classList.remove('flipped');
        c2.classList.remove('flipped');
        flipped = [];
        lock = false;
      }, 950);
    }
  }
}

// Restart button logic
document.getElementById('restart').addEventListener('click', setupGame);

// First load
setupGame();
