let questions;

let questionsCount;
let questionID;

let questionTitle;
let correctAnswer;
let questionImage;
let questionDOMElement = document.querySelector('.question-wrap');
let answers;
let answerOne;
let answerTwo;
let answerTree;
let answerFour;
let startingScreen = document.querySelector('.starting-screen');
let starter = document.querySelector('.starterBtn');
let currentQuestion = 0;






class Questions {
    async getQuestions() {
        let result = await fetch("./questions.json");
        let data = await result.json();
        questions = data.questions
        questionTitle = questions[currentQuestion].question;
        questionImage = questions[currentQuestion].image;
        answers = questions[currentQuestion].answers;
        correctAnswer = questions[currentQuestion].correct;
        answerOne = answers[0].answer;
        answerTwo = answers[1].answer;
        answerTree = answers[2].answer;
        answerFour = answers[3].answer;



    }
}
class Display {
    displayElements() {
        questionDOMElement.innerHTML = '';
        let questionTemplate = '';
        questionTemplate += `<div class="question">
        <img class="question-img" src="${questionImage}" alt="">
        <h1 class="question-title">
            ${questionTitle}
        </h1>
    </div>
    <div class="answers">
            <p id="1" class="ans-btn">${answerOne}</p>
            <p id="2" class="ans-btn">${answerTwo}</p>
            <p id="3" class="ans-btn">${answerTree}</p>
            <p id="4" class="ans-btn">${answerFour}</p>
    </div>
    <h3 class="next-btn">NEXT </h3>
    `;
        questionDOMElement.innerHTML += questionTemplate;
    }
    guessing() {
        document.addEventListener('click', (event) => {
            let answer = event.target;
            if (correctAnswer == answer.id && answer.classList.value == "ans-btn") {
                answer.classList.add('ans-btn-true')
            } else if (correctAnswer !== answer.id && answer.classList.value == "ans-btn") {
                answer.classList.add('ans-btn-false')
            }
        })
    }
    changeQuestion() {
        let nextBtn = document.querySelector('.next-btn');
        nextBtn.addEventListener('click', () => {
            currentQuestion++;
            console.log(currentQuestion);

            start()
        })
    }
    endOfQuiz() {

    }
}

function start() {
    let questions = new Questions;
    let display = new Display;
    questions.getQuestions().then(() => {
        display.displayElements();
        display.guessing();

    }).then(() => {
        display.changeQuestion();
    })

};

starter.addEventListener('click', () => {
    startingScreen.style.display = 'none';
    start()

})

// dodati krej i reset dugme kako bi se resetovala aplikacija
// i dodati score koj se inkrementuje svaki put kada se prikaze tacan odgovor
// blokiraj da se klikce ako je dat odgovor