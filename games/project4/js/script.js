// Function to generate a random number between min and max
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random operator (+ or -)
function getRandomOperator() {
  return Math.random() < 0.5 ? "+" : "-";
}

// Function to generate a random math question
function generateQuestion() {
  var num1 = getRandomNumber(1, 50);
  var num2 = getRandomNumber(1, 50);
  var operator = getRandomOperator();

  var questionElement = document.getElementById("question");
  questionElement.textContent = num2 + " " + operator + " " + num1 + " =";
}

// Function to check the user's answer
function checkAnswer() {
  var answerElement = document.getElementById("answer");
  var resultElement = document.getElementById("result");

  var answer = parseInt(answerElement.value, 10);
  if (isNaN(answer)) {
    resultElement.textContent = "Please enter a valid number.";
    return;
  }

  var questionText = document.getElementById("question").textContent;
  var parts = questionText.split(" ");
  var num1 = parseInt(parts[0], 10);
  var operator = parts[1];
  var num2 = parseInt(parts[2], 10);

  var expectedAnswer = operator === "+" ? num2 + num1 : num2 - num1;

  if (answer === expectedAnswer) {
    resultElement.textContent = "✅";
  } else {
    resultElement.textContent =
      "Incorrect. The correct answer is " + expectedAnswer + ".";
  }

  // Disable the answer input and submit button
  answerElement.disabled = true;
  document.querySelector("button").disabled = true;

  // Wait for 3 seconds and then generate a new question
  setTimeout(function () {
    // Enable the answer input and submit button
    answerElement.disabled = false;
    document.querySelector("button").disabled = false;

    // Generate a new question
    generateQuestion();

    // Clear the answer input
    answerElement.value = "";

    // Clear the result message
    resultElement.textContent = "";
  }, 1500);
}

// Function to handle keydown event
function handleKeyDown(event) {
  if (event.keyCode === 13) {
    // Enter key code
    checkAnswer();
  }
}

// Generate the first question when the page loads
generateQuestion();
