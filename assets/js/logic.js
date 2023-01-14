// Dom elements - select the #ID unique parts from the HTML and use query selector to change the on page values


var questionsElement = document.querySelector("#questions");
var timeElement = document.querySelector("#time");
var questionTitleElement = document.querySelector("#question-title");
var choicesElement = document.querySelector("#choices");
var endScreenElement = document.querySelector("#end-screen");
var endScreenElement = document.querySelector("#end-screen");
var initialsElement = document.querySelector("#initials");
var feedbackElement = document.querySelector("#feedback");
var submitButton = document.querySelector("#submit");
var startButton = document.querySelector("#start");



// quiz stat 

const quizTime = questions.length * 10;
let quizTimer;


function startQuiz () {

//show the quiz questions

questionsElement.removeAttribute("class")

// get the clock running on the page!
quizTimer = setInterval (seconds, 1000)

timeElement.textContent = quizTime;

showQuestion();

}





function seconds() {
    // update time
    quizTimer--;
    timeElement.textContent = quizTime;
  
    // check if user ran out of time
    if (quizTime<= 0) {
      quizEnd();
    }
  }

  /// needs a quiz ending function