// DOM Elements

const questionsElement = document.querySelector("#questions");
const timerElement = document.querySelector("#time");
const choicesElement = document.querySelector("#choices");
const submitButton = document.querySelector("#submit");
const startButton = document.querySelector("#start");
const initialsElement = document.querySelector("#initials");
const initfeedbackElement = document.querySelector("#feedback");
const audioCorrect = new Audio("./assets/sfx/correct.wav");
const audioIncorrect = new Audio("./assets/sfx/incorrect.wav");

// gameplay variables
let currentQuestionIndex = 0;
let time = questions.length * 10;
let timerId;
let correctAnswers = 0;


// checking for a click on the start button, then starts quiz
startButton.addEventListener("click", startQuiz);


// function to start the quiz
function startQuiz() {
  
 
  shuffle(questions) // randomises the questions
  correctAnswers = 0;
  // hide start screen
  startButton.parentElement.classList.add("hide");

  // un-hide questions section
  questionsElement.classList.remove("hide");

  // start timer
  timerId = setInterval(clockTick, 1000);

timerElement.classList.add("flash");

  // show starting time
  timerElement.textContent = time;

  getQuestion(); // calss get question function
}

function getQuestion() { // gets and presents questions
 
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

// shows the questions on the page
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

    // display new time on page
    timerElement.textContent = time;

    // on page page messages incorrect
    initfeedbackElement.textContent = "nope!";
    initfeedbackElement.style.color = "red";
    initfeedbackElement.style.fontSize = "48px";
    audioIncorrect.play();
  } else { // on page messages correct answer
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

  // next question length checker
  currentQuestionIndex++;

  // time checker
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

//end game function
function quizEnd() {
  clearInterval(timerId);
  if (correctAnswers === 0) { // sets user score to zero if not correct answers
    time = 0;
  }
  displayResults();
  timerElement.classList.remove("flash"); // stops the timer flashing
}

function displayResults() { // shows the final score
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
  let initials = initialsElement.value.trim();

  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    let highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    let newScore = {
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
  // saving score when enter key is used
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// submit initials // runs save high score function 
submitButton.addEventListener("click", saveHighscore);



initialsElement.onkeyup = checkForEnter;

