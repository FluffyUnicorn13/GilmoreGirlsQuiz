document.addEventListener("DOMContentLoaded", () => {
  let questions = [];
  let quotes = [];
  let currentQuestionIndex = 0;
  let score = 0;
  let answeredCount = 0;

  // Load questions + quotes
  Promise.all([
    fetch("questions.json").then(res => res.json()),
    fetch("quotes.json").then(res => res.json())
  ]).then(([loadedQuestions, loadedQuotes]) => {
    questions = shuffleArray(loadedQuestions);
    quotes = loadedQuotes;
    showQuestion();
  });

  // Shuffle helper
  function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  function showQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("question-text").textContent = question.question;
    const choicesContainer = document.getElementById("choices-container");
    choicesContainer.innerHTML = "";
    document.getElementById("feedback").textContent = "";
    document.getElementById("next-btn").disabled = true;

    const shuffledChoices = shuffleArray([...question.choices]);
    shuffledChoices.forEach(choice => {
      const button = document.createElement("button");
      button.textContent = choice;
      button.classList.add("choice-btn");
      button.onclick = () => handleAnswer(button, question.answer);
      choicesContainer.appendChild(button);
    });
  }

  function handleAnswer(button, correctAnswer) {
    const choices = document.querySelectorAll(".choice-btn");
    choices.forEach(btn => {
      btn.disabled = true;
      if (btn.textContent === correctAnswer) btn.classList.add("correct");
    });

    if (button.textContent === correctAnswer) {
      score++;
      document.getElementById("feedback").textContent = "Correct!";
    } else {
      button.classList.add("wrong");
      document.getElementById("feedback").textContent = `Wrong! Correct answer: ${correctAnswer}`;
    }

    answeredCount++;
    document.getElementById("next-btn").disabled = false;
  }

  function showQuote() {
    document.getElementById("question-area").classList.add("hidden");
    document.getElementById("quote-area").classList.remove("hidden");

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById("quote-text").textContent = `"${randomQuote.quote}"`;
    document.getElementById("quote-image").src = randomQuote.image;
  }

  document.getElementById("next-btn").addEventListener("click", showQuote);

  document.getElementById("quote-next-btn").addEventListener("click", () => {
    document.getElementById("quote-area").classList.add("hidden");
    document.getElementById("question-area").classList.remove("hidden");

    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
      questions = shuffleArray(questions);
      currentQuestionIndex = 0;
    }

    showQuestion();
  });

  document.getElementById("quit-btn").addEventListener("click", () => {
    localStorage.setItem('score', score);
    localStorage.setItem('answeredCount', answeredCount);
    window.location.href = 'results.html';
  });
});
