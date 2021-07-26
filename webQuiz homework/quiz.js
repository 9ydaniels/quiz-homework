const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = []

let questions = [
    {
        question: '5 x 10',
        choice1: '100',
        choice2: '50',
        choice3: '85',
        choice4: '5',
        answer: 2,
    },
    {
        question: 'Who won the NBA finals in 2021?',
        choice1: 'Bucks',
        choice2: 'Suns',
        choice3: 'Lakers',
        choice4: 'Nets',
        answer: 1,
    },
    {
        question: 'what is the color of a ruby?',
        choice1: 'green',
        choice2: 'blue',
        choice3: 'yellow',
        choice4: 'red',
        answer: 4,
    },
    {
        question: 'if you freeze water what do you get?',
        choice1: 'a puddle',
        choice2: 'clouds',
        choice3: 'rain',
        choice4: 'ice',
        answer: 4,
    },
    {
        question: 'how many planets are there in our solar system?',
        choice1: '100',
        choice2: '50',
        choice3: '8',
        choice4: '5',
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startQuiz = () => {
    questionCounter = 0
    score - 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]

    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}



startQuiz()