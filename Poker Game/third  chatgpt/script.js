// const deck = [
//   "Ace♠️",
//   "2♠️",
//   "3♠️",
//   "4♠️",
//   "5♠️",
//   "6♠️",
//   "7♠️",
//   "8♠️",
//   "9♠️",
//   "10♠️",
//   "Jack♠️",
//   "Queen♠️",
//   "King♠️",
//   "Ace♣️",
//   "2♣️",
//   "3♣️",
//   "4♣️",
//   "5♣️",
//   "6♣️",
//   "7♣️",
//   "8♣️",
//   "9♣️",
//   "10♣️",
//   "Jack♣️",
//   "Queen♣️",
//   "King♣️",
//   "Ace♦️",
//   "2♦️",
//   "3♦️",
//   "4♦️",
//   "5♦️",
//   "6♦️",
//   "7♦️",
//   "8♦️",
//   "9♦️",
//   "10♦️",
//   "Jack♦️",
//   "Queen♦️",
//   "King♦️",
//   "Ace♥️",
//   "2♥️",
//   "3♥️",
//   "4♥️",
//   "5♥️",
//   "6♥️",
//   "7♥️",
//   "8♥️",
//   "9♥️",
//   "10♥️",
//   "Jack♥️",
//   "Queen♥️",
//   "King♥️",
// ];

// // Function to shuffle the deck using Fisher-Yates algorithm
// function shuffleDeck(deck) {
//   const shuffledDeck = [...deck];
//   let currentIndex = shuffledDeck.length;

//   while (currentIndex !== 0) {
//     const randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;

//     [shuffledDeck[currentIndex], shuffledDeck[randomIndex]] = [
//       shuffledDeck[randomIndex],
//       shuffledDeck[currentIndex],
//     ];
//   }

//   return shuffledDeck;
// }

// function dealCards() {
//   const player1Hand = document.getElementById("player1Hand");
//   const player2Hand = document.getElementById("player2Hand");
//   const communityCards = document.getElementById("communityCards");

//   // Clear previous hands
//   player1Hand.textContent = "";
//   player2Hand.textContent = "";
//   communityCards.textContent = "";

//   // Shuffle the deck
//   const shuffledDeck = shuffleDeck(deck);

//   // Deal 2 cards to each player
//   const player1Cards = shuffledDeck.slice(0, 2);
//   const player2Cards = shuffledDeck.slice(2, 4);
//   const deckCards = shuffledDeck.slice(5, 10);

//   // Update the player hands in the HTML
//   player1Hand.textContent = player1Cards.join(", ");
//   player2Hand.textContent = player2Cards.join(", ");
//   deckCards.textContent = deckCards.join(", ");
// }

// // Reveal community cards gradually
// setTimeout(() => {
//   const flopCards = shuffledDeck.slice(4, 7);
//   deckCards.textContent = flopCards.join(", ");

//   setTimeout(() => {
//     const turnCard = shuffledDeck[7];
//     deckCards.textContent += `, ${turnCard}`;

//     setTimeout(() => {
//       const riverCard = shuffledDeck[8];
//       deckCards.textContent += `, ${riverCard}`;
//     }, 1000);
//   }, 1000);
// }, 1000);

// function playRound() {
//   dealCards();
//   // Add additional game logic here
// }

// const dealBtn = document.getElementById("dealBtn");
// dealBtn.addEventListener("click", playRound);

const deck = [
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
  "Ace♦️",
  "2♦️",
  "3♦️",
  "4♦️",
  "5♦️",
  "6♦️",
  "7♦️",
  "8♦️",
  "9♦️",
  "10♦️",
  "Jack♦️",
  "Queen♦️",
  "King♦️",
  "Ace♥️",
  "2♥️",
  "3♥️",
  "4♥️",
  "5♥️",
  "6♥️",
  "7♥️",
  "8♥️",
  "9♥️",
  "10♥️",
  "Jack♥️",
  "Queen♥️",
  "King♥️",
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

// const deck = [
//   'Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'
// ];

// function shuffleDeck(deck) {
//   const shuffledDeck = [...deck];
//   let currentIndex = shuffledDeck.length;

//   while (currentIndex !== 0) {
//     const randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;

//     [shuffledDeck[currentIndex], shuffledDeck[randomIndex]] = [
//       shuffledDeck[randomIndex],
//       shuffledDeck[currentIndex]
//     ];
//   }

//   return shuffledDeck;
// }

// function dealCards(numPlayers) {
//   const playerHands = [];
//   const communityCards = document.getElementById('communityCards');

//   // Clear previous hands
//   for (let i = 1; i <= numPlayers; i++) {
//     const playerHand = document.getElementById(`player${i}Hand`);
//     playerHand.textContent = '';
//     playerHands.push(playerHand);
//   }
//   communityCards.textContent = '';

//   // Shuffle the deck
//   const shuffledDeck = shuffleDeck(deck);

//   // Deal 2 cards to each player
//   for (let i = 0; i < numPlayers; i++) {
//     const playerCards = shuffledDeck.slice(i * 2, (i + 1) * 2);
//     playerHands[i].textContent = playerCards.join(', ');
//   }

//   // Reveal community cards gradually
//   setTimeout(() => {
//     const flopCards = shuffledDeck.slice(numPlayers * 2, numPlayers * 2 + 3);
//     communityCards.textContent = flopCards.join(', ');

//     setTimeout(() => {
//       const turnCard = shuffledDeck[numPlayers * 2 + 3];
//       communityCards.textContent += `, ${turnCard}`;

//       setTimeout(() => {
//         const riverCard = shuffledDeck[numPlayers * 2 + 4];
//         communityCards.textContent += `, ${riverCard}`;
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }

// const dealBtn = document.getElementById('dealBtn');
// dealBtn.addEventListener('click', () => {
//   const numPlayers = parseInt(document.getElementById('numPlayers').value);
//   dealCards(numPlayers);
// });

// const deck = [
//   'Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'
// ];

// function shuffleDeck(deck) {
//   const shuffledDeck = [...deck];
//   let currentIndex = shuffledDeck.length;

//   while (currentIndex !== 0) {
//     const randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;

//     [shuffledDeck[currentIndex], shuffledDeck[randomIndex]] = [
//       shuffledDeck[randomIndex],
//       shuffledDeck[currentIndex]
//     ];
//   }

//   return shuffledDeck;
// }

// function dealCards() {
//   const player1Hand = document.getElementById('player1Hand');
//   const player2Hand = document.getElementById('player2Hand');
//   const communityCards = document.getElementById('communityCards');

//   // Clear previous hands
//   player1Hand.textContent = '';
//   player2Hand.textContent = '';
//   communityCards.textContent = '';

//   // Shuffle the deck
//   const shuffledDeck = shuffleDeck(deck);

//   // Deal 2 cards to each player
//   const player1Cards = shuffledDeck.slice(0, 2);
//   const player2Cards = shuffledDeck.slice(2, 4);

//   // Update the player hands in the HTML
//   player1Hand.textContent = player1Cards.join(', ');
//   player2Hand.textContent = player2Cards.join(', ');

//   // Reveal community cards gradually
//   setTimeout(() => {
//     const flopCards = shuffledDeck.slice(4, 7);
//     communityCards.textContent = flopCards.join(', ');

//     setTimeout(() => {
//       const turnCard = shuffledDeck[7];
//       communityCards.textContent += `, ${turnCard}`;

//       setTimeout(() => {
//         const riverCard = shuffledDeck[8];
//         communityCards.textContent += `, ${riverCard}`;
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }

// const dealBtn = document.getElementById('dealBtn');
// dealBtn.addEventListener('click', dealCards);
