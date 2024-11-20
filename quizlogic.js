function loadQuiz(category) {
    const difficulty = localStorage.getItem('selectedDifficulty'); // Store difficulty from previous modal
    const questionText = document.getElementById("question-text");
    const options = [
        document.getElementById("option1"),
        document.getElementById("option2"),
        document.getElementById("option3"),
        document.getElementById("option4"),
    ];

    // Fetch questions based on difficulty and category
    const questionSet = getQuestions(difficulty, category); // Assume this function exists in `gamelogic.js`
    let currentQuestionIndex = 0;

    // Display the first question
    const currentQuestion = questionSet[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    // Display options
    currentQuestion.options.forEach((option, index) => {
        options[index].textContent = `${String.fromCharCode(65 + index)}. ${option}`;
    });

    // Handle answer selection
    options.forEach((btn, index) => {
        btn.onclick = () => checkAnswer(index, currentQuestion.correctAnswer, questionSet, currentQuestionIndex);
    });
}


function openCategoryModal(difficulty) {
    const difficultyModal = document.getElementById("difficultyModal");
    const categoryModal = document.getElementById("categoryModal");
    const modalDifficulty = document.getElementById("modal-difficulty");

    // Save the selected difficulty to localStorage
    localStorage.setItem('selectedDifficulty', difficulty);

    modalDifficulty.textContent = "Difficulty: " + difficulty;

    // Animate modals
    difficultyModal.style.animation = "zoomOut 0.3s forwards";
    difficultyModal.addEventListener("animationend", function onAnimationEnd() {
        difficultyModal.classList.add("hidden");
        difficultyModal.style.display = "none"; 
        difficultyModal.style.animation = ""; 
        difficultyModal.removeEventListener("animationend", onAnimationEnd);

        categoryModal.classList.remove("hidden");
        categoryModal.style.display = "flex";
        categoryModal.style.animation = "zoomIn 0.3s forwards";
    });
}

function loadQuiz(category) {
    const difficulty = localStorage.getItem('selectedDifficulty'); // Retrieve difficulty
    const questionText = document.getElementById("question-text");
    const answerButtons = document.querySelectorAll(".answer-btn"); // Buttons for answers
    const progress = document.querySelector(".progress");

    // Fetch questions based on difficulty and category
    const questionSet = getQuestions(difficulty, category);
    let currentQuestionIndex = 0;

    // Display a question
    function displayQuestion() {
        const currentQuestion = questionSet[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;

        // Set options
        currentQuestion.options.forEach((option, index) => {
            answerButtons[index].textContent = `${String.fromCharCode(65 + index)}. ${option}`;
        });

        // Update progress
        progress.textContent = `${currentQuestionIndex + 1}/${questionSet.length}`;
    }

    // Move to the next question
    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questionSet.length) {
            displayQuestion();
        } else {
            // End the quiz
            alert("Quiz Complete!");
            quizContainer.style.display = "none";
        }
    }

    // Attach event listeners to answer buttons
    answerButtons.forEach((button, index) => {
        button.onclick = () => {
            const currentQuestion = questionSet[currentQuestionIndex];
            checkAnswer(index, currentQuestion.correctAnswer, nextQuestion);
        };
    });

    // Display the first question
    displayQuestion();
}

function checkAnswer(selectedIndex, correctIndex, nextQuestionCallback) {
    if (selectedIndex === correctIndex) {
        alert("Correct!");
    } else {
        alert("Wrong!");
    }

    // next question
    nextQuestionCallback();
}


// handle questions
function getQuestions(difficulty, category) {
    const questions = {
        Math: {
            EASY: [
                { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correctAnswer: 1 },
                { question: "Root of 4?", options: ["3", "4", "2", "1"], correctAnswer: 2 },
                { question: "What is 10 ÷ 2?", options: ["6", "5", "8", "4"], correctAnswer: 1 },
                { question: "Among These 4 Who is Well Known for Their Math Skills ?", options: ["Lebron", "Pepito", "Isaac Newton", "Van Gough"], correctAnswer: 2 },
              

            ],
                
            MEDIUM: [
                { question: "What is 12 x 3?", options: ["36", "40", "24", "30"], correctAnswer: 0 },
                { question: "What is the square root of 49?", options: ["6", "7", "8", "9"], correctAnswer: 1 },
                { question: "What is 15 + 28?", options: ["45", "42", "43", "44"], correctAnswer: 2 },
            ],
            HARD: [
                { question: "Solve for x: 2x + 3 = 11", options: ["3", "4", "5", "6"], correctAnswer: 1 },
                { question: "What is 144 ÷ 12?", options: ["10", "11", "12", "9"], correctAnswer: 2 },
                { question: "What is 15 x 15?", options: ["225", "215", "200", "210"], correctAnswer: 0 },
            ],
        },
    };

    // Return the relevant questions
    return questions[category][difficulty];
}

