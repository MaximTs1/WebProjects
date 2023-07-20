const deck: string[] = [
  "Ace♠️",
  "2♠️",
  "3♠️",
  "4♠️",
  "5♠️",
  "6♠️",
  "7♠️",
  "8♠️",
  "9♠️",
  "10♠️",
  "Jack♠️",
  "Queen♠️",
  "King♠️",
  "Ace♣️",
  "2♣️",
  "3♣️",
  "4♣️",
  "5♣️",
  "6♣️",
  "7♣️",
  "8♣️",
  "9♣️",
  "10♣️",
  "Jack♣️",
  "Queen♣️",
  "King♣️",
  "Ace🔶",
  "2🔶",
  "3🔶",
  "4🔶",
  "5🔶",
  "6🔶",
  "7🔶",
  "8🔶",
  "9🔶",
  "10🔶",
  "Jack🔶",
  "Queen🔶",
  "King🔶",
  "Ace❤️",
  "2❤️",
  "3❤️",
  "4❤️",
  "5❤️",
  "6❤️",
  "7❤️",
  "8❤️",
  "9❤️",
  "10❤️",
  "Jack❤️",
  "Queen❤️",
  "King❤️",
];

function shuffleDeck(deck: string[]): string[] {
  const shuffledDeck: string[] = [...deck];
  let currentIndex: number = shuffledDeck.length;

  while (currentIndex !== 0) {
    const randomIndex: number = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [shuffledDeck[currentIndex], shuffledDeck[randomIndex]] = [
      shuffledDeck[randomIndex],
      shuffledDeck[currentIndex],
    ];
  }

  return shuffledDeck;
}

function dealCards(numPlayers: number): void {
  const playerContainer = document.getElementById("playerContainer");
  const communityCards = document.getElementById("communityCards");

  // Clear previous hands and community cards
  playerContainer.innerHTML = "";
  communityCards.textContent = "";

  // Shuffle the deck
  const shuffledDeck = shuffleDeck(deck);

  // Deal 2 cards to each player
  for (let i = 1; i <= numPlayers; i++) {
    const playerHand = document.createElement("div");
    playerHand.className = "player";
    playerHand.id = `player${i}Hand `;

    const playerName = document.createElement("p");
    playerName.textContent = `Player ${i} `;

    playerHand.appendChild(playerName);
    playerContainer.appendChild(playerHand);

    const playerCards = shuffledDeck.slice((i - 1) * 2, i * 2);
    playerName.innerHTML += ":<br>" + playerCards.join(", ");
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

const numPlayersSelect = document.getElementById(
  "numPlayers"
) as HTMLSelectElement;
const dealBtn = document.getElementById("dealBtn") as HTMLButtonElement;
dealBtn.addEventListener("click", () => {
  const numPlayers = parseInt(numPlayersSelect.value, 10);
  clearDeck();
  dealCards(numPlayers);
});

numPlayersSelect.addEventListener("change", () => {
  const numPlayers = parseInt(numPlayersSelect.value, 10);
  const playerContainer = document.getElementById("playerContainer");

  while (playerContainer.children.length > numPlayers) {
    playerContainer.removeChild(playerContainer.lastChild);
  }

  while (playerContainer.children.length < numPlayers) {
    const playerHand = document.createElement("div");
    playerHand.className = "player";
    const playerName = document.createElement("p");
    playerName.textContent = `Player ${playerContainer.children.length + 1}`;
    playerHand.appendChild(playerName);
    playerContainer.appendChild(playerHand);
  }
  clearDeck();
});

function clearDeck(): void {
  const playerContainers = document.getElementById("playerContainer");
  const communityCard = document.getElementById("communityCards");

  // Clear previous hands and community cards
  playerContainers.innerHTML = "";
  communityCard.textContent = "";
}
