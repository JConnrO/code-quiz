// Array of arrays
var quizContent = [
    
    {
        question: 'Which of the following is not a programming language?', 
        correct_answer: '4. IceCream', 
        answers: ["1. Go", "2. Python", "3. Java", "4. IceCream"],
    },    
    {
        question: 'Which of the following function of String object returns the index within the calling String object of the last occurrence of the specified value?', 
        correct_answer: '1. lastIndexOf()', 
        answers: ["1. lastIndexOf()", "2. substr()", "3. search()", "4. indexOf()"],
    },    
    {
        question: 'Which built-in method removes the last element from an array and returns that element?', 
        correct_answer: '1. pop()', 
        answers: ["1. pop()", "2. get()", "3. last()", "4. push()"],
    },    
];
//Global Variables: Current Question, Score, Time Left
var q_index = 0;
var answersCorrect = 0;
var time_left = 20;
//Grab and store HTML elements to render later
var questionHTML = document.querySelector("#question");
var answersHTML = document.querySelector("#answers");
var answer1HTML = document.querySelector("#answer1");
var answer2HTML = document.querySelector("#answer2");
var answer3HTML = document.querySelector("#answer3");
var answer4HTML = document.querySelector("#answer4");

var countdownHTML = document.querySelector("#countdown");
var resultHTML = document.querySelector("#result");

//Call once user hits Start for N times where n is the length of the questions array.
function gameOver(){
    clearInterval(intervalId);
    renderHighScore();
}
function renderStartPage(){
    
}
function renderHighScore(){
    clearInterval(intervalId);
    var body = document.body;
    var inputForm = 
    `<div class="container">
        <div class="row">
            <div class="col-8">
                <form method="POST">
                    <h1>Please Enter your Name</h1>
                    <input type="text" name="recordholder" id="recordholder"/>
                    <button id="submit">Submit</button>
                </form>
            </div>
        </div>
    </div>`;
    body.innerHTML = inputForm;
    var submit = document.querySelector("#submit");
    submit.addEventListener('click', function(event) {
        event.preventDefault();
      
        var recordholder = document.querySelector('#recordholder').value;
      

        // Save email and password to localStorage using `setItem()`
        localStorage.setItem('recordholder', recordholder);
        localStorage.setItem('score', answersCorrect);

          // Render the last registered email and password
        
      });
      
}
function renderIntro(){
    var qna = document.querySelector("#qna");
    var format = 
    `   <div id="question"></div>
        <ul id="answers">
            <li>
                <button type="button" id="answer1" class="btn btn-primary"></button>
            </li>
            <li>
                <button type="button" id="answer2" class="btn btn-primary"></button>
            </li>
            <li>
                <button type="button" id="answer3" class="btn btn-primary"></button>
            </li>
            <li>
                <button type="button" id="answer4" class="btn btn-primary"></button>
            </li>               
        </ul>
        <div id="result">Result: </div>`;
    qna.innerHTML = format;
}
function updateTime(){
    time_left--;
    countdownHTML.textContent = "Time Remaing:" +time_left;
    if(time_left<=0){
        gameOver();
        return;
    }
}
function render_question(){
    if(time_left == 0){
        updateTime();
    }
    intervalId = setInterval(updateTime, 1000);

    //Clear Previous Result
    resultHTML.textContent = "Result:";

    //Update Question text
    questionHTML.textContent = quizContent[q_index].question;
    //Update Answer options
    answer1HTML.textContent = quizContent[q_index].answers[0];
    answer2HTML.textContent = quizContent[q_index].answers[1];
    answer3HTML.textContent = quizContent[q_index].answers[2];
    answer4HTML.textContent = quizContent[q_index].answers[3];
}

function nextQuestion(){
    q_index++;
    if(q_index >= quizContent.length){
        gameOver();
    }
    render_question();
}

function check_answer(event) {
    if (event.target.matches("button")) {
      var answer = event.target.textContent;
      if (answer === quizContent[q_index].correct_answer) {
        resultHTML.textContent = "Result: Your Answer is Correct";
        answersCorrect++;
      } else {
        resultHTML.textContent = "Result: Your Answer is Incorrect";
        time_left = time_left - 5;
        countdownHTML.textContent = "Time Remaining " +time_left;
      }
    }
    setTimeout(nextQuestion, 1000);
}
  
answersHTML.addEventListener("click", check_answer);
render_question();

