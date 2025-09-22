// Questions array
const questions = [
  {
    text: "What is Lorelai's favorite drink?",
    choices: ["Tea", "Coffee", "Milkshake", "Water"],
    correct: 1
  },
  {
    text: "What is Luke's diner famous for?",
    choices: ["Burgers", "Coffee", "Pizza", "Salad"],
    correct: 1
  },
  {
    text: "Who said: 'I smell snow'?",
    choices: ["Rory", "Lorelai", "Sookie", "Emily"],
    correct: 1
  }
];

// Quotes array (for alternating screen)
const quotes = [
  { text: "Coffee is life.", image: "images/coffee1.jpg" },
  { text: "Stars Hollow forever!", image: "images/coffee2.jpg" }
];

// DOM Elements
const questionArea = document.getElementById("question-area");
const questionText = document.getElementById("question-text");
const choiceButtons = [
  document.getElementById("choice1"),
  document.getElementById("choice2"),
  document.getElementById("choice3"),
  document.getElementById("choice4")
];
const nextBtn = document.getElementById("next-btn");

const quoteArea = document.getElementById("quote-area");
const quoteText = document.getElementById("quote-text");
const quoteImage = document.getElementById("quote-image");
const quoteNextBtn = document.getElementById("quote-next-btn");

// State
let currentQuestion = 0;

// Functions
function showQuestion(index) {
  const q = questions[index];
  questionText.textContent = q.text;
  choiceButtons.forEach((btn, i) => {
    btn.textContent = q.choices[i];
    btn.className = "choice-btn";
    btn.disabled = false;
    btn.onclick = () => selectAnswer(i);
  });
  nextBtn.style.display = "none";
}

function selectAnswer(selectedIndex) {
  const q = questions[currentQuestion];
  choiceButtons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add("correct");
    else if (i === selectedIndex) btn.classList.add("wrong");
  });
  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    // Alternate backgrounds
    questionArea.className = "screen " + (currentQuestion % 2 === 0 ? "pastel-peach" : "pastel-lavender");
    showQuestion(currentQuestion);
  } else {
    // All questions done, show quote area
    questionArea.style.display = "none";
    quoteArea.style.display = "block";

    // Show first quote
    quoteText.textContent = quotes[0].text;
    quoteImage.src = quotes[0].image;
  }
});

quoteNextBtn.addEventListener("click", () => {
  // Loop through quotes or go to results page
  window.location.href = "results.html";
});

// Initialize first question
showQuestion(currentQuestion);
