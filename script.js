let questions = [];
let quotes = [];
let currentQuestionIndex = 0;
let score = 0;
let answeredCount = 0;

// Run after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // If the page is opened via file://, fetch() will fail in most browsers.
  // Show a visible banner with instructions instead of attempting to load JSON.
  if (window.location.protocol === 'file:') {
    console.error('Page served via file:// — fetch() will fail. Show instructions to start a local server.');
    const banner = document.createElement('div');
    banner.style.position = 'fixed';
    banner.style.left = '0';
    banner.style.right = '0';
    banner.style.top = '0';
    banner.style.background = '#ffeb3b';
    banner.style.color = '#000';
    banner.style.padding = '12px';
    banner.style.zIndex = '9999';
    banner.style.fontSize = '14px';
    banner.style.textAlign = 'center';
    banner.innerHTML = `This quiz must be served over HTTP. Start a local server and open http://localhost:8000/quiz.html<br/>
      Recommended (PowerShell): <code>python -m http.server 8000</code> or <code>npx http-server -p 8000</code><br/>
      Or install the VS Code "Live Server" extension and click "Go Live".`;
    document.body.appendChild(banner);
    // Also set feedback text so it's visible within the page
    const feedback = document.getElementById('feedback');
    if (feedback) feedback.innerHTML = 'This quiz must be opened over http. See the yellow banner at the top for commands.';
    return; // skip fetch() which will fail under file://
  }
  // Load questions + quotes
  Promise.all([
    fetch("questions.json").then(res => res.json()),
    fetch("quotes.json").then(res => res.json())
  ]).then(([loadedQuestions, loadedQuotes]) => {
    questions = shuffleArray(loadedQuestions || []);
    quotes = loadedQuotes || [];
    showQuestion();

    // Attach listeners now that data and DOM are available
    const nextBtn = document.getElementById("next-btn");
    const quoteNextBtn = document.getElementById("quote-next-btn");
    const quitBtn = document.getElementById("quit-btn");

    if (nextBtn) {
      log('Attaching click listener to next-btn');
      // use a tiny wrapper that logs the actual click before calling showQuote
      nextBtn.addEventListener("click", (evt) => {
        log('next-btn clicked (wrapper) - disabled=', nextBtn.disabled);
        // defensive: if button is disabled, do nothing
        if (nextBtn.disabled) {
          log('next-btn click ignored because button is disabled');
          return;
        }
        showQuote(evt);
      });
    } else {
      log('next-btn not found when attaching listener');
    }
    if (quoteNextBtn) quoteNextBtn.addEventListener("click", () => {
      log('quote-next-btn clicked; currentQuestionIndex=', currentQuestionIndex, 'questions.length=', questions.length);
      const qa = document.getElementById("quote-area");
      const qn = document.getElementById("question-area");
      if (qa) qa.classList.add("hidden");
      if (qn) qn.classList.remove("hidden");

      // Advance to next question; if we've finished the last question, go to results
      currentQuestionIndex++;
      if (!questions || currentQuestionIndex >= questions.length) {
        log('Quiz complete — saving results and redirecting to results.html', { score, answeredCount });
        try {
          localStorage.setItem('score', score);
          localStorage.setItem('answeredCount', answeredCount);
        } catch (e) {
          console.error('Failed to save results to localStorage:', e);
        }
        window.location.href = 'results.html';
        return;
      }

      log('Advancing to question index', currentQuestionIndex);
      showQuestion();
    });

    if (quitBtn) quitBtn.addEventListener("click", () => {
      localStorage.setItem('score', score);
      localStorage.setItem('answeredCount', answeredCount);
      window.location.href = 'results.html';
    });

  }).catch(err => {
    console.error('Failed to load quiz data:', err);
    // Provide a minimal graceful fallback so the page doesn't silently fail
    questions = [];
    quotes = [];
    const feedback = document.getElementById('feedback');
    if (feedback) feedback.textContent = 'Error loading quiz data. Open the console for details.';
  });
});

// Logging helper that writes to console and visible debug panel
function log(...args) {
  // Keep logs in console only. The visible debug panel was useful for debugging,
  // but users prefer it hidden — so we no-op DOM writes and only output to console.
  try {
    console.debug(...args);
  } catch (e) {
    // ignore
  }
}

// Shuffle helper
function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function showQuestion() {
  if (!questions || questions.length === 0) {
    console.error('showQuestion(): no questions available');
    const qt = document.getElementById('question-text');
    if (qt) qt.textContent = 'No questions available.';
    const choicesContainer = document.getElementById('choices-container');
    if (choicesContainer) choicesContainer.innerHTML = '';
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) nextBtn.disabled = true;
    return;
  }
  const question = questions[currentQuestionIndex];
  if (!question) {
    console.error('showQuestion(): question is undefined at index', currentQuestionIndex);
    return;
  }
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
    // use addEventListener to avoid overwriting other handlers
    button.addEventListener('click', () => handleAnswer(button, question.answer));
    choicesContainer.appendChild(button);
  });
}

function handleAnswer(button, correctAnswer) {
  console.debug('Answer clicked:', button && button.textContent);
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
  // visually highlight next button so it's obvious
  const nb = document.getElementById('next-btn');
  if (nb) {
    nb.classList.add('ready');
    log('Next button enabled');
  }
}

function showQuote() {
  log('showQuote called');
  try {
    document.getElementById("question-area").classList.add("hidden");
    document.getElementById("quote-area").classList.remove("hidden");

    if (!quotes || quotes.length === 0) {
      // Fallback text when quotes aren't available
      document.getElementById("quote-text").textContent = '"[No quote available]"';
      const img = document.getElementById("quote-image");
      if (img) {
        img.src = '';
        img.alt = '';
      }
      return;
    }

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    if (!randomQuote) {
      document.getElementById("quote-text").textContent = '"[No quote available]"';
      return;
    }

    document.getElementById("quote-text").textContent = `"${randomQuote.quote}"`;
    const imgEl = document.getElementById("quote-image");
    if (imgEl) {
      imgEl.src = randomQuote.image || '';
      imgEl.alt = 'Gilmore Girls quote';
    }
  } catch (err) {
    console.error('Error in showQuote():', err);
  }
}
// Event listeners are attached after DOMContentLoaded and data load to avoid timing issues