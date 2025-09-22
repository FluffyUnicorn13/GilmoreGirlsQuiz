// =============================
// Quiz Data
// =============================
const questions = [
  {
    question: "Who runs Luke's Diner?",
    choices: ["Lorelai", "Luke", "Rory", "Sookie"],
    answer: 1
  },
  {
    question: "What town do the Gilmore girls live in?",
    choices: ["Stars Hollow", "Hartford", "Springfield", "Capitol City"],
    answer: 0
  },
  {
    question: "What is Rory's first job?",
    choices: ["Babysitter", "Waitress", "Reporter", "Student Intern"],
    answer: 3
  },
  // Add more questions as needed
];

// =============================
// DOM Elements
// =============================
const questionArea = document.getElementById("question-area");
const questionText = document.getElementById("question-text");
const choices = [
  document.getElementById("choice1"),
  document.getElementById("choice2"),
  document.getElementById("choice3"),
  document.getElementById("choice4")
];
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;

// =============================
// Functions
// =============================
function loadQuestion(index) {
  const q = questions[index];
  questionText.textContent = q.question;

  // Populate choices
  for (let i = 0; i < choices.length; i++) {
    choices[i].textContent = q.choices[i];
    choices[i].classList.remove("correct", "wrong");
    choices[i].disabled = false;
  }

  // Alternate background
  if (index % 2 === 0) {
    questionArea.classList.remove("pastel-lavender");
    questionArea.classList.add("pastel-peach");
  } else {
    questionArea.classList.remove("pastel-peach");
    questionArea.classList.add("pastel-lavender");
  }

  // Hide next button until a choice is clicked
  nextBtn.style.display = "none";
}

function handleChoiceClick(event) {
  const choiceIndex = choices.indexOf(event.target);
  const correctIndex = questions[currentQuestionIndex].answer;

  // Disable all buttons
  choices.forEach(btn => btn.disabled = true);

  // Highlight correct/incorrect
  if (choiceIndex === correctIndex) {
    event.target.classList.add("correct");
  } else {
    event.target.classList.add("wrong");
    choices[correctIndex].classList.add("correct");
  }

  // Show next button
  nextBtn.style.display = "block";
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion(currentQuestionIndex);
  } else {
    // End of quiz, redirect to results
    window.location.href = "results.html";
  }
}

// =============================
// Event Listeners
// =============================
choices.forEach(btn => btn.addEventListener("click", handleChoiceClick));
nextBtn.addEventListener("click", nextQuestion);

// =============================
// Initialize
// =============================
loadQuestion(currentQuestionIndex);
