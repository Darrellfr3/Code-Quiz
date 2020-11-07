// Functions
function buildQuiz(){

    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) =>{

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

            // ...add an HTML radio button
            answers.push(
                `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
                </label>`
            );
        }

        // add this question and its answers to the output
        output.push(
            `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>
            </div>`
        );
    }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
}
function showResults(){
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
            // add to the number of correct answers
            numCorrect++;

            // color the answers green
            answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // else answer is wrong or blank
        else{
            // color the answers red
            answerContainers[questionNumber].style.color = 'red';
        }
    }
    );

    // magnify score for bigger number
    var score = numCorrect * 20;
    // display score
    resultsContainer.innerHTML = `You scored ${score} points!`;
}
function showSlide(n){
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
        previousButton.style.display = 'none';
    }
    else{
        previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    }
    else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}
function showPreviousSlide(){
    showSlide(currentSlide - 1);
}
function showNextSlide(){
    showSlide(currentSlide + 1);
}

// Variables
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const myQuestions = [
    {
      question: "How do you write 'Hello World' in an alert box?",
      answers: {
        a: "msg('Hello World')",
        b: "alertBox('Hello World');",
        c: "alert('Hello World');"
      },
      correctAnswer: "c"
    },
    {
      question: "How to empty an array in JavaScript?",
      answers: {
        a: "arrayList[]",
        b: "arrayList(0)",
        c: "arrayList.length = 0"
      },
      correctAnswer: "c"
    },
    {
      question: "What will this output? var a = [1, 2, 3]; console.log(a[6]);",
      answers: {
        a: "undefined",
        b: "0",
        c: "prints nothing",
        d: "Syntax error"
      },
      correctAnswer: "a"
    },
    {
      question: "What would be the result of 3+2+'7'?",
      answers: {
        a: "327",
        b: "12",
        c: "14",
        d: "57"
      },
      correctAnswer: "d"
    },
    {
      question: "What will the code below output to the console? console.log(1 +  +'2' + '2');",
      answers: {
        a: "'32'",
        b: "'122'",
        c: "'13'",
        d: "'14'"
      },
      correctAnswer: "b"
    }
];

// Start quiz
buildQuiz();

// Previous & Next button variables
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

// Show the first slide
showSlide(currentSlide);

// Event listeners
submitButton.addEventListener('click', showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
