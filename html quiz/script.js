const questions = [
    { 
        question : "How many levels of Headings does HTML have?",
        answers:[
            {Text: 'Six levels', correct: true},
            {Text: 'Infinite levels', correct: false},
            {Text: 'Only one level', correct: false},
            {Text: 'Ten levels', correct: false}
        ],
    },
    { 
        question : "What is the HTML tag for the image elemnt?",
        answers:[
            {Text: '&lt;p&gt;', correct: false},
            {Text: '&lt;image&gt;', correct: false},
            {Text: '&lt;img&gt;', correct: true},
            {Text: '&lt;h1&gt;', correct: false}
        ],
    },
    { 
        question : "What is the &lt;p&gt; tag used for?",
        answers:[
            {Text: 'title', correct: false},
            {Text: 'color', correct: false},
            {Text: 'length', correct: false},
            {Text: 'paragraph', correct: true}
        ],
    },
    { 
        question : "Which of the following elements require's an empty tag?",
        answers:[
            {Text: '&lt;img&gt;', correct: true},
            {Text: '&lt;p&gt;', correct: false},
            {Text: '&lt;body&gt;', correct: false},
            {Text: '&lt;div&gt;', correct: false}
        ],
    },
    { 
        question : "Which of the following tags is used to diplay text in bold?",
        answers:[
            {Text: '&lt;b&gt;', correct: true},
            {Text: '&lt;bold&gt;', correct: false},
            {Text: '&lt;i&gt;', correct: false},
            {Text: '&lt;p&gt;', correct: false}
        ],
    },
    { 
        question : "Which attribute is required for an image tag to work correctly?",
        answers:[
            {Text: 'link', correct: false},
            {Text: 'src', correct: true},
            {Text: 'img', correct: false},
            {Text: 'url', correct: false}
        ],
    },
    { 
        question : "In container tags where do attributes go..?",
        answers:[
            {Text: 'Closing tag.', correct: false},
            {Text: 'They have their own tags.', correct: false},
            {Text: 'Opening tag.', correct: true},
            {Text: 'They are only used in empty tags.', correct: false}
        ],
    },
    { 
        question : "The 'alt' attribute is used to..?",
        answers:[
            {Text: 'Add an alternate link to your page.', correct: false},
            {Text: 'There is no alt attribute.', correct: false},
            {Text: 'Add descriptive text for screen readers.', correct: true},
            {Text: 'When you want to replace the src attribute.', correct: false}
        ],
    },
    { 
        question : "What is the correct file extension for saving HTML documents?",
        answers:[
            {Text: '.page', correct: false},
            {Text: '.txt', correct: false},
            {Text: '.css', correct: false},
            {Text: '.html', correct: true}
        ],
    },
    { 
        question : "The alt attribute is used with..?",
        answers:[
            {Text: 'buttons', correct: false},
            {Text: 'forms', correct: false},
            {Text: 'paragraphs', correct: false},
            {Text: 'images', correct: true}
        ],
    },
]

const questionElement = document.getElementById("question")
const answerButton = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0;
let quizScore = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    quizScore = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNum = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNum + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "hide";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild); 
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        quizScore++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your score is ${quizScore} out of ${questions.length}.`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextbutton(){
    currentQuestionIndex++;
    if(currentQuestionIndex< questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextbutton();
    }else{
        startQuiz();
    }})

startQuiz();