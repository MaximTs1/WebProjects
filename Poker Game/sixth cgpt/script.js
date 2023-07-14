const deck = [
  "2♠",
  "3♠",
  "4♠",
  "5♠",
  "6♠",
  "7♠",
  "8♠",
  "9♠",
  "10♠",
  "J♠",
  "Q♠",
  "K♠",
  "A♠",
  "2♣",
  "3♣",
  "4♣",
  "5♣",
  "6♣",
  "7♣",
  "8♣",
  "9♣",
  "10♣",
  "J♣",
  "Q♣",
  "K♣",
  "A♣",
  "2♦",
  "3♦",
  "4♦",
  "5♦",
  "6♦",
  "7♦",
  "8♦",
  "9♦",
  "10♦",
  "J♦",
  "Q♦",
  "K♦",
  "A♦",
  "2♥",
  "3♥",
  "4♥",
  "5♥",
  "6♥",
  "7♥",
  "8♥",
  "9♥",
  "10♥",
  "J♥",
  "Q♥",
  "K♥",
  "A♥",
];

function shuffleDeck(deck) {
  const shuffledDeck = [...deck];
  let currentIndex = shuffledDeck.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [shuffledDeck[currentIndex], shuffledDeck[randomIndex]] = [
      shuffledDeck[randomIndex],
      shuffledDeck[currentIndex],
    ];
  }

  return shuffledDeck;
}

function dealCards(numPlayers) {
  const playerContainer = document.getElementById("playerContainer");
  const communityCards = document.getElementById("communityCards");
  const deckAfter = document.getElementById("deckAfter");

  // Clear previous hands and community cards
  playerContainer.innerHTML = "";
  communityCards.textContent = "";
  deckAfter.textContent = "";

  // Shuffle the deck
  const shuffledDeck = shuffleDeck(deck);

  // Deal 2 cards to each player
  for (let i = 1; i <= numPlayers; i++) {
    const playerHand = document.createElement("div");
    playerHand.className = "player";
    playerHand.id = `player${i}Hand`;

    const playerName = document.createElement("p");
    playerName.textContent = `Player ${i}`;

    playerHand.appendChild(playerName);
    playerContainer.appendChild(playerHand);

    const playerCards = shuffledDeck.slice((i - 1) * 2, i * 2);
    playerName.innerHTML += ":<br>" + playerCards.join(" ");
  }

  // Reveal community cards gradually
  setTimeout(() => {
    const flopCards = shuffledDeck.slice(numPlayers * 2, numPlayers * 2 + 3);
    communityCards.innerHTML = flopCards.join(" ");

    setTimeout(() => {
      const turnCard = shuffledDeck[numPlayers * 2 + 3];
      communityCards.innerHTML += ` ${turnCard}`;

      setTimeout(() => {
        const riverCard = shuffledDeck[numPlayers * 2 + 4];
        communityCards.innerHTML += ` ${riverCard}`;
      }, 1000);
    }, 1000);
  }, 1000);
}

const numPlayersSelect = document.getElementById("numPlayers");
const dealBtn = document.getElementById("dealBtn");
dealBtn.addEventListener("click", () => {
  const numPlayers = parseInt(numPlayersSelect.value);
  dealCards(numPlayers);
});
