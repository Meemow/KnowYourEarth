const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Which country uses sunflowers to clear up radiation',
        choice1: 'Japan',
        choice2: 'China',
        choice3: 'Mexico',
        choice4: 'None of the above',
        answer: 1,
    },
    {
        question:
            "A: An adult's blood vessels could circle the equator how many times? ",
        choice1: "Two",
        choice2: "Three",
        choice3: "Katy Perry",
        choice4: "None of the above",
        answer: 2,
    },
    {
        question: " Global warming can cause increased rainfall. The Great Wall of China cannot be seen from the moon",
        choice1: "Only the first statement is correct",
        choice2: "Only the second statement is correct",
        choice3: "Both are correct",
        choice4: "None are correct",
        answer: 3,
    },
    {
        question: "A man once ate an airplane",
        choice1: "True",
        choice2: "False",
        choice3: "Of course not!",
        choice4: "The man ate on the airplane!",
        answer: 1,
    },
  {
        question: "A: A humpback whale was found in the middle of the Amazon rainforest. Global warming might be a good thing",
        choice1: "Only the first statement is correct",
        choice2: "Only the second statement is correct",
        choice3: "Both are correct",
        choice4: "None are correct",
        answer: 1,
    },
  {
        question: "Within the next 2 decades, global temperatures are likely to rise to how many degrees",
        choice1: "3",
        choice2: "1.5",
        choice3: "3",
        choice4: "None of the above",
        answer: 2,
    },
    {
        question: " It is possible to burp in space. It is not possible to turn plastic into vanilla flavoring ",
        choice1: "Both statements are correct",
        choice2: "The first statement only is correct",
        choice3: "The second statement only is correct",
        choice4: "None are correct",
        answer: 4,
    },
    {
        question: "How many acres of rainforests are cut down every minute? ",
        choice1: "200",
        choice2: "100",
        choice3: "300",
        choice4: "None of the above",
        answer: 2,
    },
    {
        question: " How many tons of oil is produced in the world that end up in our oceans every year",
        choice1: "Five",
        choice2: "Ten",
        choice3: "Seven",
        choice4: "None of the above",
        answer: 1,
    },
    {
        question: "Wood and paper wasted annually could heat 50,000,000 homes.There is a high chance that some of the water you drink will have passed through a dinosaur",
        choice1: "Only the first statement is right",
        choice2: "Only the second statement is right",
        choice3: "Both statements are correct",
        choice4: "None of the above",
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
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
    score +=num
    scoreText.innerText = score
}

startGame()