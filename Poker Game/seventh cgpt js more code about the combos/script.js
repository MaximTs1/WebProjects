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

  // Clear previous hands and community cards
  playerContainer.innerHTML = "";
  communityCards.textContent = "";

  // Shuffle the deck
  const shuffledDeck = shuffleDeck(deck);

  // Deal 2 cards to each player
  for (let i = 1; i <= numPlayers; i++) {
    const playerHand = document.createElement("div");
    playerHand.className = "player";
    playerHand.id = `player${i}`;

    const playerName = document.createElement("h2");
    playerName.textContent = `Player ${i}`;

    const hand = document.createElement("div");
    hand.className = "hand";
    hand.id = `player${i}Hand`;

    const result = document.createElement("div");
    result.className = "result";
    result.id = `player${i}Result`;

    playerHand.appendChild(playerName);
    playerHand.appendChild(hand);
    playerHand.appendChild(result);
    playerContainer.appendChild(playerHand);
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

function evaluateHands() {
  const numPlayersSelect = document.getElementById("numPlayers");
  const numPlayers = parseInt(numPlayersSelect.value);

  for (let i = 1; i <= numPlayers; i++) {
    const playerHand = document.getElementById(`player${i}Hand`);
    const playerResult = document.getElementById(`player${i}Result`);
    const cards = playerHand.innerText.split(":")[1].trim().split(" ");
    const result = evaluatePokerHand(cards);
    playerResult.textContent = result;
  }

  const winnerInfo = document.getElementById("winnerInfo");
  const players = Array.from(document.getElementsByClassName("player"));
  const results = players.map((player) => ({
    player: player.id,
    result: player.lastChild.textContent,
  }));
  const sortedResults = results.sort((a, b) =>
    b.result.localeCompare(a.result)
  );
  const topResult = sortedResults[0];
  winnerInfo.textContent = `${topResult.player}: ${topResult.result}`;
  document.getElementById("winner").classList.remove("hidden");
}

function evaluatePokerHand(hand) {
  // Add your winning algorithm here
  // Return the evaluated result as a string
  return "Royal Flush";
}

const dealBtn = document.getElementById("dealBtn");
dealBtn.addEventListener("click", () => {
  const numPlayersSelect = document.getElementById("numPlayers");
  const numPlayers = parseInt(numPlayersSelect.value);
  dealCards(numPlayers);
});

const evaluateBtn = document.getElementById("evaluateBtn");
evaluateBtn.addEventListener("click", evaluateHands);

// Function to evaluate the rank of a hand
function evaluateHand(hand, communityCards) {
  const allCards = hand.concat(communityCards);

  // Sort the cards in descending order based on their value
  const sortedCards = allCards.sort((a, b) => {
    return deck.indexOf(b) - deck.indexOf(a);
  });

  // Check for the different combinations in descending order of rank

  // Royal Flush
  if (isRoyalFlush(sortedCards)) {
    return { rank: 10, combination: "Royal Flush" };
  }

  // Straight Flush
  const straightFlushRank = getStraightFlushRank(sortedCards);
  if (straightFlushRank) {
    return { rank: 9, combination: `Straight Flush (${straightFlushRank})` };
  }

  // Four of a Kind
  const fourOfAKindRank = getFourOfAKindRank(sortedCards);
  if (fourOfAKindRank) {
    return { rank: 8, combination: `Four of a Kind (${fourOfAKindRank})` };
  }

  // Full House
  const fullHouseRank = getFullHouseRank(sortedCards);
  if (fullHouseRank) {
    return { rank: 7, combination: `Full House (${fullHouseRank})` };
  }

  // Flush
  if (isFlush(sortedCards)) {
    return { rank: 6, combination: "Flush" };
  }

  // Straight
  const straightRank = getStraightRank(sortedCards);
  if (straightRank) {
    return { rank: 5, combination: `Straight (${straightRank})` };
  }

  // Three of a Kind
  const threeOfAKindRank = getThreeOfAKindRank(sortedCards);
  if (threeOfAKindRank) {
    return { rank: 4, combination: `Three of a Kind (${threeOfAKindRank})` };
  }

  // Two Pair
  const twoPairRank = getTwoPairRank(sortedCards);
  if (twoPairRank) {
    return { rank: 3, combination: `Two Pair (${twoPairRank})` };
  }

  // One Pair
  const onePairRank = getOnePairRank(sortedCards);
  if (onePairRank) {
    return { rank: 2, combination: `One Pair (${onePairRank})` };
  }

  // High Card
  return { rank: 1, combination: "High Card" };
}

// Helper function to check if the cards form a Royal Flush
function isRoyalFlush(cards) {
  const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

  for (let suit of suits) {
    const royalFlush = [
      `${suit}: Ace`,
      `${suit}: King`,
      `${suit}: Queen`,
      `${suit}: Jack`,
      `${suit}: 10`,
    ];

    if (royalFlush.every((card) => cards.includes(card))) {
      return true;
    }
  }

  return false;
}

// Helper function to get the rank of the highest card in a Straight Flush
function getStraightFlushRank(cards) {
  const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

  for (let suit of suits) {
    const flushCards = cards.filter((card) => card.startsWith(`${suit}:`));

    if (flushCards.length >= 5) {
      const straightRank = getStraightRank(flushCards);

      if (straightRank) {
        return straightRank;
      }
    }
  }

  return null;
}

// Helper function to get the rank of the Four of a Kind combination
function getFourOfAKindRank(cards) {
  for (let card of cards) {
    const rank = card.split(": ")[1];
    const count = cards.filter((c) => c.split(": ")[1] === rank).length;

    if (count === 4) {
      return rank;
    }
  }

  return null;
}

// Helper function to get the rank of the Full House combination
function getFullHouseRank(cards) {
  const threeOfAKindRank = getThreeOfAKindRank(cards);
  const pairRank = getOnePairRank(cards);

  if (threeOfAKindRank && pairRank && threeOfAKindRank !== pairRank) {
    return `${threeOfAKindRank} over ${pairRank}`;
  }

  return null;
}

// Helper function to check if the cards form a Flush
function isFlush(cards) {
  const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

  for (let suit of suits) {
    const flushCards = cards.filter((card) => card.startsWith(`${suit}:`));

    if (flushCards.length >= 5) {
      return true;
    }
  }

  return false;
}

// Helper function to get the rank of the highest card in a Straight
function getStraightRank(cards) {
  const cardValues = cards.map((card) => deck.indexOf(card.split(": ")[1]));
  const sortedValues = cardValues.sort((a, b) => b - a);

  if (
    sortedValues[0] - sortedValues[4] === 4 &&
    new Set(sortedValues).size === 5
  ) {
    return deck[sortedValues[0]];
  }

  // Check for Ace-low straight (A, 2, 3, 4, 5)
  if (
    sortedValues[0] === 12 &&
    sortedValues[1] === 3 &&
    sortedValues[2] === 2 &&
    sortedValues[3] === 1 &&
    sortedValues[4] === 0
  ) {
    return deck[3];
  }

  return null;
}

// Helper function to get the rank of the Three of a Kind combination
function getThreeOfAKindRank(cards) {
  for (let card of cards) {
    const rank = card.split(": ")[1];
    const count = cards.filter((c) => c.split(": ")[1] === rank).length;

    if (count === 3) {
      return rank;
    }
  }

  return null;
}

// Helper function to get the rank of the Two Pair combination
function getTwoPairRank(cards) {
  const pairs = [];

  for (let card of cards) {
    const rank = card.split(": ")[1];
    const count = cards.filter((c) => c.split(": ")[1] === rank).length;

    if (count === 2 && !pairs.includes(rank)) {
      pairs.push(rank);
    }
  }

  if (pairs.length === 2) {
    return `${pairs[0]} and ${pairs[1]}`;
  }

  return null;
}

// Helper function to get the rank of the One Pair combination
function getOnePairRank(cards) {
  for (let card of cards) {
    const rank = card.split(": ")[1];
    const count = cards.filter((c) => c.split(": ")[1] === rank).length;

    if (count === 2) {
      return rank;
    }
  }

  return null;
}

// Example usage
const player1Hand = ["Spades: Ace", "Spades: King"];
const player2Hand = ["Hearts: Queen", "Hearts: Jack"];
const communityCards = [
  "Spades: 10",
  "Hearts: 10",
  "Diamonds: 10",
  "Clubs: King",
  "Diamonds: Queen",
];

const player1Result = evaluateHand(player1Hand, communityCards);
const player2Result = evaluateHand(player2Hand, communityCards);

console.log("Player 1:", player1Result);
console.log("Player 2:", player2Result);
