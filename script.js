document.addEventListener("DOMContentLoaded", () => {
  const questions = [
    { question: "Who runs Luke's Diner?", choices: ["Lorelai", "Luke", "Rory", "Sookie"], answer: 1 },
    { question: "What town do the Gilmore girls live in?", choices: ["Stars Hollow", "Hartford", "Springfield", "Capitol City"], answer: 0 },
    { question: "What is Rory's first job?", choices: ["Babysitter", "Waitress", "Reporter", "Student Intern"], answer: 3 }
  ];

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

  function loadQuestion(index) {
    const q = questions[index];
    questionText.textContent = q.question;

    for (let i = 0; i < choices.length; i++) {
      choices[i].textContent = q.choices[i];
      choices[i].classList.remove("correct", "wrong");
      choices[i].disabled = false;
    }

    questionArea.classList.toggle("pastel-peach", index % 2 === 0);
    questionArea.classList.toggle("pastel-lavender", index % 2 !== 0);

    nextBtn.style.display = "none";
  }

  function handleChoiceClick(event) {
    const choiceIndex = choices.indexOf(event.target);
    const correctIndex = questions[currentQuestionIndex].answer;

    choices.forEach(btn => btn.disabled = true);

    if (choiceIndex === correctIndex) {
      event.target.classList.add("correct");
    } else {
      event.target.classList.add("wrong");
      choices[correctIndex].classList.add("correct");
    }

    nextBtn.style.display = "block";
  }

  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion(currentQuestionIndex);
    } else {
      window.location.href = "results.html";
    }
  }

  choices.forEach(btn => btn.addEventListener("click", handleChoiceClick));
  nextBtn.addEventListener("click", nextQuestion);

  loadQuestion(currentQuestionIndex);
});
