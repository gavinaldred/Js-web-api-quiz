function printHighscores() {
  // either get scores from localstorage or set to empty array
  let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  // sort highscores by score property in descending order
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function (score) {
    // create li tag for each high score
    let liTag = document.createElement("li");
    liTag.textContent = score.initials + " - " + score.score;

    // display on page
    let olEl = document.getElementById("highscores");
    olEl.appendChild(liTag);
  });
}

// function to clear high scores
function clearHighscores() {
  window.localStorage.removeItem("highscores");
  let olEl = document.getElementById("highscores");
  olEl.innerHTML = "";
}
// prevent default
document.getElementById("clear").addEventListener("click", function (prevD) {
  prevD.preventDefault();
  clearHighscores();
});

// run function when page loads
printHighscores();
