const questionsElement = document.querySelector("#questions");
const timerElement = document.querySelector("#time");
const choicesElement = document.querySelector("#choices");
const submitButton = document.querySelector("#submit");
const startButton = document.querySelector("#start");
const initialsElement = document.querySelector("#initials");
const initfeedbackElement = document.querySelector("#feedback");
const audioCorrect = new Audio("./assets/sfx/correct.wav");
const audioIncorrect = new Audio("./assets/sfx/incorrect.wav");

let currentQuestionIndex = 0;
let time = questions.length * 10;
let timerId;
let correctAnswers = 0;

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  correctAnswers = 0;
  // hide start screen
  startButton.parentElement.classList.add("hide");

  // un-hide questions section
  questionsElement.classList.remove("hide");

  // start timer
  timerId = setInterval(clockTick, 1000);

  // show starting time
  timerElement.textContent = time;

  getQuestion();
}

function getQuestion() {
  // get current question object from array
  const currentQuestion = questions[currentQuestionIndex];

  // update title with current question
  const titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.question;

  // clear out any old question choices
  choicesElement.innerHTML = "";

  // loop over choices
  for (let i = 0; i < currentQuestion.choices.length; i++) {
    const choice = currentQuestion.choices[i];
    // create new button for each choice
    const choiceNode = createChoiceButton(choice, i);
    // display on the page
    choicesElement.appendChild(choiceNode);
  }
}

function createChoiceButton(choice, i) {
  const choiceNode = document.createElement("button");
  choiceNode.classList.add("choice");
  choiceNode.value = choice;
  choiceNode.textContent = `${i + 1}. ${choice}`;
  choiceNode.addEventListener("click", questionClick);
  return choiceNode;
}

function questionClick() {
  // check if user guessed wrong

  if (this.value !== questions[currentQuestionIndex].correctAnswer) {
    // penalize time
    time -= 10;

    if (time < 0) {
      time = 0;
    }

    audioIncorrect.play();

    // display new time on page
    timerElement.textContent = time;

    // page messages
    initfeedbackElement.textContent = "nope!";
    initfeedbackElement.style.color = "red";
    initfeedbackElement.style.fontSize = "48px";
  } else {
    audioCorrect.play();
    initfeedbackElement.textContent = "Yay go you!";
    initfeedbackElement.style.color = "pink";
    initfeedbackElement.style.fontSize = "48px";
    correctAnswers++;
  }

  // flash right/wrong feedback
  initfeedbackElement.setAttribute("class", "feedback");
  setTimeout(function () {
    initfeedbackElement.setAttribute("class", "feedback hide");
  }, 1000);

  // next question
  currentQuestionIndex++;

  // time checker
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  clearInterval(timerId);
  if (correctAnswers === 0) {
    time = 0;
  }
  displayResults();
}

function displayResults() {
  const endScreenEl = document.getElementById("end-screen");
  endScreenEl.classList.remove("hide");
  const finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;
  questionsElement.classList.add("hide");
}

let endScreenEl = document.getElementById("end-screen");
function clockTick() {
  // check if quiz has ended
  if (!endScreenEl.classList.contains("hide")) return;
  // update time
  time--;
  timerElement.textContent = time;

  // check if user ran out of time
  if (time <= 0) {time = 0;
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var initials = initialsElement.value.trim();

  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials,
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// submit initials
submitButton.addEventListener("click", saveHighscore);

// start quiz
startButton.addEventListener("click", startQuiz);

initialsElement.onkeyup = checkForEnter;

function myFunction() {
  document.getElementById("startscreen").setAttribute("class", "hide");
}
