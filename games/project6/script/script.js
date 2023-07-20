var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var deck = [
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
function shuffleDeck(deck) {
    var _a;
    var shuffledDeck = __spreadArray([], deck, true);
    var currentIndex = shuffledDeck.length;
    while (currentIndex !== 0) {
        var randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        _a = [
            shuffledDeck[randomIndex],
            shuffledDeck[currentIndex],
        ], shuffledDeck[currentIndex] = _a[0], shuffledDeck[randomIndex] = _a[1];
    }
    return shuffledDeck;
}
function dealCards(numPlayers) {
    var playerContainer = document.getElementById("playerContainer");
    var communityCards = document.getElementById("communityCards");
    // Clear previous hands and community cards
    playerContainer.innerHTML = "";
    communityCards.textContent = "";
    // Shuffle the deck
    var shuffledDeck = shuffleDeck(deck);
    // Deal 2 cards to each player
    for (var i = 1; i <= numPlayers; i++) {
        var playerHand = document.createElement("div");
        playerHand.className = "player";
        playerHand.id = "player".concat(i, "Hand ");
        var playerName = document.createElement("p");
        playerName.textContent = "Player ".concat(i, " ");
        playerHand.appendChild(playerName);
        playerContainer.appendChild(playerHand);
        var playerCards = shuffledDeck.slice((i - 1) * 2, i * 2);
        playerName.innerHTML += ":<br>" + playerCards.join(", ");
    }
    // Reveal community cards gradually
    setTimeout(function () {
        var flopCards = shuffledDeck.slice(numPlayers * 2, numPlayers * 2 + 3);
        communityCards.textContent = flopCards.join(", ");
        setTimeout(function () {
            var turnCard = shuffledDeck[numPlayers * 2 + 3];
            communityCards.textContent += ", ".concat(turnCard);
            setTimeout(function () {
                var riverCard = shuffledDeck[numPlayers * 2 + 4];
                communityCards.textContent += ", ".concat(riverCard);
            }, 1000);
        }, 1000);
    }, 1000);
}
var numPlayersSelect = document.getElementById("numPlayers");
var dealBtn = document.getElementById("dealBtn");
dealBtn.addEventListener("click", function () {
    var numPlayers = parseInt(numPlayersSelect.value, 10);
    clearDeck();
    dealCards(numPlayers);
});
numPlayersSelect.addEventListener("change", function () {
    var numPlayers = parseInt(numPlayersSelect.value, 10);
    var playerContainer = document.getElementById("playerContainer");
    while (playerContainer.children.length > numPlayers) {
        playerContainer.removeChild(playerContainer.lastChild);
    }
    while (playerContainer.children.length < numPlayers) {
        var playerHand = document.createElement("div");
        playerHand.className = "player";
        var playerName = document.createElement("p");
        playerName.textContent = "Player ".concat(playerContainer.children.length + 1);
        playerHand.appendChild(playerName);
        playerContainer.appendChild(playerHand);
    }
    clearDeck();
});
function clearDeck() {
    var playerContainers = document.getElementById("playerContainer");
    var communityCard = document.getElementById("communityCards");
    // Clear previous hands and community cards
    playerContainers.innerHTML = "";
    communityCard.textContent = "";
}
