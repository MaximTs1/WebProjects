const deck = [
  "Ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King",
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
  const playerHands = [];
  const communityCards = document.getElementById("communityCards");

  // Clear previous hands
  for (let i = 1; i <= numPlayers; i++) {
    const playerHand = document.getElementById(`player${i}Hand`);
    playerHand.textContent = "";
    playerHands.push(playerHand);
  }
  communityCards.textContent = "";

  // Shuffle the deck
  const shuffledDeck = shuffleDeck(deck);

  // Deal 2 cards to each player
  for (let i = 0; i < numPlayers; i++) {
    const playerCards = shuffledDeck.slice(i * 2, (i + 1) * 2);
    playerHands[i].textContent = playerCards.join(", ");
  }

  // Reveal community cards gradually
  setTimeout(() => {
    const flopCards = shuffledDeck.slice(numPlayers * 2, numPlayers * 2 + 3);
    communityCards.textContent = flopCards.join(", ");

    setTimeout(() => {
      const turnCard = shuffledDeck[numPlayers * 2 + 3];
      communityCards.textContent += `, ${turnCard}`;

      setTimeout(() => {
        const riverCard = shuffledDeck[numPlayers * 2 + 4];
        communityCards.textContent += `, ${riverCard}`;
      }, 1000);
    }, 1000);
  }, 1000);
}

const dealBtn = document.getElementById("dealBtn");
dealBtn.addEventListener("click", () => {
  const numPlayers = parseInt(document.getElementById("numPlayers").value);
  dealCards(numPlayers);
});
