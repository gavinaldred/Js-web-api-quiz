// DOM elements
var questionsElement= document.querySelector("#questions");
var timerElement = document.querySelector("#time");
var choicesElement = document.querySelector("#choices");
var submitButton = document.querySelector("#submit");
var startButton = document.querySelector("#start");
var initialsElement = document.querySelector("#initials");
var initfeedbackElement = document.querySelector("#feedback");
const audioCorrect = new Audio("./assets/sfx/correct.wav");
const audioIncorrect = new Audio("./assets/sfx/incorrect.wav");

// quiz state variables
var currentQuestionIndex = 0;
var time = questions.length * 10;
var timerId;

function startQuiz() {
//   hide start screen


  // un-hide questions section
  questionsElement.removeAttribute("class");

  // start timer
  timerId = setInterval(clockTick, 1000);

  // show starting time
  timerElement.textContent = time;

  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // update title with current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.question;

  // clear out any old question choices
  choicesElement.innerHTML = "";

  // loop over choices
  currentQuestion.choices.forEach(function(choice, i) {
    // create new button for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // attach click event listener to each choice
    choiceNode.onclick = questionClick;

    // display on the page
    choicesElement.appendChild(choiceNode);
  });
}



function questionClick() {
  // check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].correctAnswer) {
    // penalize time
    time -= 5;

    if (time <= 0) {
      time = 0;
    }
    audioIncorrect.play()
    // display new time on page
    timerElement.textContent = time;
    // page messages
    initfeedbackElement.textContent = "nope!"
    initfeedbackElement.style.color = "red"
    initfeedbackElement.style.fontSize = "400%" 
  } else {
    audioCorrect.play()
    initfeedbackElement.textContent = "Yay go you!";
    initfeedbackElement.style.color = "green";
    initfeedbackElement.style.fontSize = "400%";
  }

  // flash right/wrong feedback
  initfeedbackElement.setAttribute("class", "feedback");
  setTimeout(function() {
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
  // stop timer
  clearInterval(timerId);

  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  questionsElement.setAttribute("class", "hide");
}

function clockTick() {
  // update time
  time--;
  timerElement.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
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
      initials: initials
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
submitButton.onclick = saveHighscore;

// start quiz
startButton.onclick = startQuiz;

initialsElement.onkeyup = checkForEnter;

function myFunction() {
    document.getElementById("startscreen").setAttribute("class", "hide"); 
  }