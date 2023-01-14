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
var currentQuest = 0;

startButton.onclick = quizGo; /// hooks up the start buttin to the quiz go function!

function quizGo () {

//show the quiz questions

questionsElement.removeAttribute("class")

// get the clock running on the page!
quizTimer = setInterval (seconds, 1000)  // 1000 is equal to 1 second (1k milliseconds)

timeElement.textContent = quizTime;

showQuestion();

}


// shows the questions!

function showQuestion () {

var currentQuestion = questions[currentQuest]

questionTitleElement = document.getElementById("qustion-title");
questionTitleElement = currentQuestion.question;

 // clear out any old question choices
 choicesElement.innerHTML = ""; // otherwise the questions just stack!

// 

currentQuestion.options.forEach(function(answer, i) {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", answer);

    choiceNode.textContent = i + 1 + ". " + answer;

    // attach click event listener to each choice
    choiceNode.onclick = questionClick;

    // display on the page
    choicesElement.appendChild(choiceNode);


});   

}

function questionClick ()
{

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