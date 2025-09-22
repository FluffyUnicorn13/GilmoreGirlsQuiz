// Get score from localStorage
const score = localStorage.getItem('score') || 0;
const answeredCount = localStorage.getItem('answeredCount') || 0;

// Display score
document.getElementById('score-text').textContent =
  `You answered ${score} out of ${answeredCount} correctly.`;

// Download button
document.getElementById("download-btn").addEventListener("click", () => {
  const scoreText = `Gilmore Girls Quiz Results\n\nYou answered ${score} out of ${answeredCount} correctly.`;
  const blob = new Blob([scoreText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "GilmoreGirlsQuizResults.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
});