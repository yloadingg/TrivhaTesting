// Global Variables
let timer; // Timer variable
let timeRemaining = 20; // Time per question
let correctAnswers = 0; // Count of correct answers
let totalTimeUsed = 0; // Total time used across all questions
let questionSet = []; // Holds the current set of questions
let currentQuestionIndex = 0; // Tracks the current question index

// Helper function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

// Timer Functions
function startTimer(nextQuestionCallback) {
    const timerDisplay = document.getElementById("timer");
    const lastTwoSecondsSound = new Audio("BG/TimesUp-Trivha.mp3"); // Replace with the actual file path
    timeRemaining = 20; // Reset time for each question

    timer = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            timerDisplay.textContent = `:${timeRemaining}`;

            // Play the sound effect when only 2 seconds remain
            if (timeRemaining === 2) {
                lastTwoSecondsSound.play();
            }
        } else {
            clearInterval(timer); // Stop the timer
            showTimesUpMessage(nextQuestionCallback);
        }
    }, 1000); // Run every second
}

function stopTimer() {
    clearInterval(timer); // Stop the timer
    totalTimeUsed += 20 - timeRemaining; // Calculate time used for the question
}

function showTimesUpMessage(nextQuestionCallback) {
    const questionBox = document.getElementById("question-text");

    // Display "Time's Up" message
    questionBox.textContent = "Time's Up! ⏰";
    questionBox.style.color = "red"; // Highlight timeout message

    setTimeout(() => {
        questionBox.style.color = ""; // Reset text color
        nextQuestionCallback(); // Proceed to the next question
    }, 1500); // 1.5 seconds delay
}

// Quiz Loading and Question Handling
function loadQuiz(category) {
    const difficulty = localStorage.getItem('selectedDifficulty'); // Retrieve difficulty
    const questionText = document.getElementById("question-text");
    const answerButtons = document.querySelectorAll(".answer-btn"); // Answer buttons
    const progress = document.querySelector(".progress");

    // Retrieve questions for the selected difficulty and category
    questionSet = getQuestions(difficulty, category); // Get questions
    shuffleArray(questionSet); // Randomize questions
    currentQuestionIndex = 0; // Reset index

    function displayQuestion() {
        const currentQuestion = questionSet[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;

        currentQuestion.options.forEach((option, index) => {
            answerButtons[index].textContent = `${String.fromCharCode(65 + index)}. ${option}`;
        });

        progress.textContent = `${currentQuestionIndex + 1}/${questionSet.length}`;

        startTimer(nextQuestion);
    }

    function nextQuestion() {
        stopTimer(); // Stop timer for the current question

        currentQuestionIndex++;
        if (currentQuestionIndex < questionSet.length) {
            displayQuestion(); // Load the next question
        } else {
            const totalQuestions = questionSet.length;
            const avgTime = calculateAverageTime();

            // Show result modal with results
            showResultContainer(correctAnswers, totalQuestions, avgTime);
        }
    }

    answerButtons.forEach((button, index) => {
        button.onclick = () => {
            stopTimer(); // Stop the timer when an answer is selected
            const currentQuestion = questionSet[currentQuestionIndex];
            checkAnswer(index, currentQuestion.correctAnswer, nextQuestion);
        };
    });

    displayQuestion(); // Start the quiz
}

function checkAnswer(selectedIndex, correctIndex, nextQuestionCallback) {
    const questionBox = document.getElementById("question-text");

    // Sound effects for correct and wrong answers
    const correctSound = new Audio("BG/Right-Trivha.mp3");
    const wrongSound = new Audio("BG/Wrong-Trivha.mp3");

    if (selectedIndex === correctIndex) {
        questionBox.textContent = "Correct 🎉";
        questionBox.style.color = "green";
        correctSound.play(); // Play correct sound
        correctAnswers++;
    } else {
        questionBox.textContent = "Wrong ❌";
        questionBox.style.color = "red";
        wrongSound.play(); // Play wrong sound
    }

    setTimeout(() => {
        questionBox.style.color = ""; // Reset text color
        nextQuestionCallback();
    }, 1500); // 1.5 seconds delay
}

// Result Container Handling
function showResultContainer(correctAnswers, totalQuestions, avgTime) {
    const resultContainer = document.getElementById("resultContainer");
    const resultMessage = document.getElementById("resultMessage");
    const totalScore = document.getElementById("totalScore");
    const averageTime = document.getElementById("averageTime");

    // Set the result text
    resultMessage.textContent = `You completed the quiz!`;
    totalScore.textContent = `Your Score: ${correctAnswers} out of ${totalQuestions}`;
    averageTime.textContent = `Average Time per Question: ${avgTime} seconds`;

    // Show the result container
    resultContainer.style.display = "flex";
    resultContainer.classList.remove("hidden");
}

function closeResultContainer() {
    const resultContainer = document.getElementById("resultContainer");
    resultContainer.style.display = "none"; // Hide the container when closed
}

function restartQuiz() {
    window.location.reload(); // Reload the page to restart the quiz
}

// Utility Functions
function calculateAverageTime() {
    return Math.round(totalTimeUsed / questionSet.length) || 0;         
}


function restartQuiz() {
    window.location.reload(); 
}



  

// handle questions
function getQuestions(difficulty, category) {
    const questions = {
        Math: {
            EASY: [
                { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correctAnswer: 1 },
                { question: "Root of 4?", options: ["3", "4", "2", "1"], correctAnswer: 2 },
                { question: "What is 10 ÷ 2?", options: ["6", "5", "8", "4"], correctAnswer: 1 },
                { question: "Among These 4 Who is Well Known for Their Math Skills?", options: ["Lebron", "Pepito", "Isaac Newton", "Van Gogh"], correctAnswer: 2 },
                { question: "What kind of angle is exactly 90 degrees?", options: ["Acute angle", "Obtuse angle", "Right angle", "Reflex angle"], correctAnswer: 2 },
                { question: "What shape has three sides?", options: ["Square", "Circle", "Triangle", "Rectangle"], correctAnswer: 2 },
                { question: "What is the perimeter of a square with side length 5?", options: ["15", "20", "25", "10"], correctAnswer: 1 },
                { question: "What do you call an angle less than 90 degrees?", options: ["Right angle", "Obtuse angle", "Acute angle", "Reflex angle"], correctAnswer: 2 },
                { question: "Which of these is a 4-sided figure with opposite sides equal?", options: ["Square", "Circle", "Rectangle", "Triangle"], correctAnswer: 2 },
                { question: "What is the value of \(2^3\)?", options: ["6", "8", "4", "9"], correctAnswer: 1 },
                { question: "Which of the following shapes has only one curved edge?", options: ["Square", "Triangle", "Circle", "Rectangle"], correctAnswer: 2 },
                { question: "What is the sum of the angles in a triangle?", options: ["90 degrees", "180 degrees", "360 degrees", "120 degrees"], correctAnswer: 1 },
                { question: "What do you call a polygon with 5 sides?", options: ["Pentagon", "Hexagon", "Octagon", "Decagon"], correctAnswer: 0 },
                { question: "Which of these is a right angle?", options: ["30°", "45°", "60°", "90°"], correctAnswer: 3 },
            ],
            
            MEDIUM: [
                { question: "What is 12 x 3?", options: ["36", "40", "24", "30"], correctAnswer: 0 },
                { question: "What is the square root of 49?", options: ["6", "7", "8", "9"], correctAnswer: 1 },
                { question: "What is 15 + 28?", options: ["45", "42", "43", "44"], correctAnswer: 2 },
                { question: "What is the area of a rectangle with length 4 and width 7?", options: ["28", "25", "20", "35"], correctAnswer: 0 },
                { question: "What do you call a triangle with all equal sides?", options: ["Scalene", "Equilateral", "Isosceles", "Right"], correctAnswer: 1 },
                { question: "What is the volume of a cube with side length 3?", options: ["9", "27", "18", "12"], correctAnswer: 1 },
                { question: "What is the sum of the interior angles of a quadrilateral?", options: ["90°", "180°", "360°", "540°"], correctAnswer: 2 },
                { question: "What is the difference between 100 and 63?", options: ["40", "37", "33", "23"], correctAnswer: 1 },
                { question: "How many sides does a hexagon have?", options: ["4", "5", "6", "8"], correctAnswer: 2 },
                { question: "Which of the following shapes has the most sides?", options: ["Pentagon", "Hexagon", "Octagon", "Triangle"], correctAnswer: 2 },
                { question: "What is the area of a rectangle with length 8 and width 12?", options: ["96", "88", "104", "96"], correctAnswer: 0 },
                { question: "What is 20% of 150?", options: ["25", "30", "35", "40"], correctAnswer: 1 },
                { question: "What is the volume of a rectangular prism with length 5, width 3, and height 4?", options: ["60", "40", "50", "55"], correctAnswer: 0 },
                { question: "What is the value of 3x if x = 4?", options: ["11", "12", "14", "15"], correctAnswer: 1 },
                { question: "What is the result of (5 + 3) × 2?", options: ["10", "12", "16", "14"], correctAnswer: 1 },
                { question: "Which of the following is a multiple of 9?", options: ["18", "20", "25", "30"], correctAnswer: 0 },
                { question: "What is the perimeter of a triangle with sides 7, 10, and 13?", options: ["25", "30", "33", "28"], correctAnswer: 3 },
                { question: "If the angle of a triangle is 60°, what is the sum of the other two angles?", options: ["60°", "90°", "120°", "180°"], correctAnswer: 1 },
                { question: "What is the value of 9 squared?", options: ["81", "72", "90", "100"], correctAnswer: 0 },
                { question: "What is the next number in the sequence: 5, 10, 15, ?", options: ["20", "30", "25", "35"], correctAnswer: 0 }
                
            ],
            
            HARD: [
                { question: "Solve for x: 2x + 3 = 11", options: ["3", "4", "5", "6"], correctAnswer: 1 },
                { question: "What is 144 ÷ 12?", options: ["10", "11", "12", "9"], correctAnswer: 2 },
                { question: "What is 15 x 15?", options: ["225", "215", "200", "210"], correctAnswer: 0 },
                { question: "What is the area of a circle with radius 7?", options: ["49π", "14π", "7π", "21π"], correctAnswer: 0 },
                { question: "What is the perimeter of a triangle with sides 6, 8, and 10?", options: ["24", "26", "28", "30"], correctAnswer: 1 },
                { question: "What is the volume of a cylinder with radius 4 and height 9?", options: ["36π", "32π", "45π", "50π"], correctAnswer: 0 },
                { question: "What is the value of \( (2^3) \times (3^2) \)?", options: ["72", "54", "24", "48"], correctAnswer: 0 },
                { question: "What is the square root of 625?", options: ["25", "35", "20", "45"], correctAnswer: 0 },
                { question: "What is the area of a triangle with base 10 and height 5?", options: ["20", "25", "30", "35"], correctAnswer: 0 },
                { question: "What is the volume of a cone with radius 3 and height 6?", options: ["18π", "36π", "27π", "54π"], correctAnswer: 0 },
                { question: "What is the area of a triangle with base 10 and height 12?", options: ["60", "55", "65", "75"], correctAnswer: 0 },
                { question: "What is the value of \(5^3\)?", options: ["125", "100", "110", "120"], correctAnswer: 0 },
                { question: "What is the perimeter of a rectangle with length 7 and width 5?", options: ["20", "24", "25", "30"], correctAnswer: 1 },
                { question: "What is the square root of 144?", options: ["12", "11", "13", "14"], correctAnswer: 0 },
                { question: "What is 15% of 200?", options: ["25", "30", "35", "40"], correctAnswer: 1 },
                { question: "What is the value of \( \frac{3}{4} \times 8 \)?", options: ["5", "6", "7", "8"], correctAnswer: 1 },
                { question: "What is the volume of a sphere with radius 4?", options: ["268.08", "216.63", "150.72", "100.48"], correctAnswer: 0 },
                { question: "What is the area of a circle with a radius of 7?", options: ["49π", "14π", "21π", "35π"], correctAnswer: 0 },
                { question: "If a right triangle has legs of 6 and 8, what is the length of the hypotenuse?", options: ["10", "11", "12", "9"], correctAnswer: 0 },
                { question: "What is the solution to \(2x - 5 = 15\)?", options: ["7", "10", "5", "8"], correctAnswer: 1 },
                { question: "What is the result of \( \frac{20}{5} \times 3 + 2 \)?", options: ["14", "12", "10", "16"], correctAnswer: 0 },
                { question: "What is the value of \( \left( \frac{3}{5} \right) \div \left( \frac{2}{3} \right)?", options: ["9/10", "1/2", "5/6", "5/3"], correctAnswer: 3 },
                { question: "What is the sum of the interior angles of a hexagon?", options: ["720°", "540°", "360°", "900°"], correctAnswer: 0 },
                { question: "What is the value of \( 3x + 2 = 11 \)?", options: ["3", "4", "5", "6"], correctAnswer: 1 },
                { question: "What is the value of \(7^2 - 3^2\)?", options: ["40", "45", "30", "50"], correctAnswer: 0 },
                { question: "What is the sum of the first 10 prime numbers?", options: ["129", "130", "131", "132"], correctAnswer: 1 }
                
            ],
        },

        Science: {
            EASY: [
                { question: "What planet is known as the Red Planet?", options: ["Earth", "Venus", "Mars", "Jupiter"], correctAnswer: 2 },
                { question: "What gas do plants need for photosynthesis?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correctAnswer: 1 },
                { question: "What is the center of an atom called?", options: ["Nucleus", "Proton", "Electron", "Neutron"], correctAnswer: 0 },
                { question: "What is the chemical symbol for water?", options: ["O2", "CO2", "H2O", "HO2"], correctAnswer: 2 },
                { question: "Which planet has the most moons?", options: ["Jupiter", "Saturn", "Mars", "Neptune"], correctAnswer: 1 },
                { question: "What is the boiling point of water?", options: ["90°C", "100°C", "110°C", "120°C"], correctAnswer: 1 },
                { question: "What gas do we breathe in from the air?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correctAnswer: 0 },
                { question: "Which planet is known as the 'Blue Planet'?", options: ["Earth", "Mars", "Venus", "Jupiter"], correctAnswer: 0 },
                { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Silver"], correctAnswer: 2 },
                { question: "What is the main source of energy for Earth?", options: ["The Moon", "The Sun", "The Stars", "Volcanic Activity"], correctAnswer: 1 },
                { question: "Which part of the plant is responsible for photosynthesis?", options: ["Roots", "Stem", "Leaves", "Flowers"], correctAnswer: 2 },
                { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Pb", "Fe"], correctAnswer: 0 },
                { question: "What is the process by which plants make their food?", options: ["Respiration", "Transpiration", "Photosynthesis", "Digestion"], correctAnswer: 2 },
                { question: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], correctAnswer: 2 },
                { question: "What type of animal is a dolphin?", options: ["Fish", "Reptile", "Mammal", "Bird"], correctAnswer: 2 }
                
            ],
            
            MEDIUM: [
                { question: "What is the chemical symbol for sodium?", options: ["Na", "S", "So", "K"], correctAnswer: 0 },
                { question: "Which planet is closest to the Sun?", options: ["Earth", "Venus", "Mercury", "Mars"], correctAnswer: 2 },
                { question: "What type of rock is formed by cooling magma?", options: ["Sedimentary", "Igneous", "Metamorphic", "Fossil"], correctAnswer: 1 },
                { question: "What is the process by which liquid water turns into water vapor?", options: ["Condensation", "Evaporation", "Precipitation", "Transpiration"], correctAnswer: 1 },
                { question: "What is the main component of the Earth's atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correctAnswer: 1 },
                { question: "What organ in the human body is responsible for pumping blood?", options: ["Brain", "Lungs", "Heart", "Kidneys"], correctAnswer: 2 },
                { question: "Which planet is closest to the Sun?", options: ["Mercury", "Venus", "Earth", "Mars"], correctAnswer: 0 },
                { question: "What is the chemical formula for water?", options: ["H2O", "CO2", "O2", "H2O2"], correctAnswer: 0 },
                { question: "What is the process by which plants release water vapor?", options: ["Transpiration", "Evaporation", "Respiration", "Photosynthesis"], correctAnswer: 0 },
                { question: "Which element is essential for the production of thyroid hormones?", options: ["Iodine", "Iron", "Calcium", "Magnesium"], correctAnswer: 0 },
                { question: "What is the smallest unit of matter?", options: ["Molecule", "Atom", "Proton", "Electron"], correctAnswer: 1 },
                { question: "Which gas is produced during photosynthesis?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correctAnswer: 0 },
                { question: "What is the largest organ in the human body?", options: ["Brain", "Heart", "Liver", "Skin"], correctAnswer: 3 },
                { question: "Which type of rock is formed from the cooling of magma?", options: ["Sedimentary", "Metamorphic", "Igneous", "Limestone"], correctAnswer: 2 },
                { question: "What is the main function of red blood cells?", options: ["To fight infection", "To carry oxygen", "To digest food", "To clot blood"], correctAnswer: 1 },
                { question: "What is the primary source of energy for the Sun?", options: ["Fission", "Fusion", "Electricity", "Geothermal"], correctAnswer: 1 },
                { question: "What is the function of the roots in a plant?", options: ["To store food", "To absorb water and minerals", "To produce seeds", "To make food"], correctAnswer: 1 },
                { question: "What part of the cell controls its activities?", options: ["Mitochondria", "Nucleus", "Cytoplasm", "Membrane"], correctAnswer: 1 },
                { question: "Which part of the brain controls balance and coordination?", options: ["Cerebrum", "Cerebellum", "Medulla", "Hypothalamus"], correctAnswer: 1 },
                { question: "What is the Earth's core primarily made of?", options: ["Iron and Nickel", "Oxygen and Nitrogen", "Silicon and Magnesium", "Aluminum and Copper"], correctAnswer: 0 },
                { question: "What is the outer layer of the Earth called?", options: ["Crust", "Mantle", "Core", "Lithosphere"], correctAnswer: 0 }
                
            ],

            HARD: [
                { question: "What is the most abundant gas in Earth’s atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"], correctAnswer: 2 },
                { question: "What is the term for animals that maintain a constant body temperature?", options: ["Ectothermic", "Endothermic", "Photosynthetic", "Thermotropic"], correctAnswer: 1 },
                { question: "What is the chemical formula for table salt?", options: ["NaCl", "HCl", "KCl", "NaOH"], correctAnswer: 0 },
                { question: "What is the primary function of mitochondria in cells?", options: ["Protein synthesis", "Energy production", "Waste removal", "Cell division"], correctAnswer: 1 },
                { question: "What element is most abundant in the Earth's crust?", options: ["Oxygen", "Silicon", "Iron", "Aluminum"], correctAnswer: 1 },
                { question: "Which type of electromagnetic radiation has the shortest wavelength?", options: ["X-rays", "Ultraviolet", "Visible light", "Gamma rays"], correctAnswer: 3 },
                { question: "What is the name of the process by which a liquid turns into a solid?", options: ["Freezing", "Evaporation", "Condensation", "Sublimation"], correctAnswer: 0 },
                { question: "Which of these is NOT a noble gas?", options: ["Neon", "Argon", "Oxygen", "Helium"], correctAnswer: 2 },
                { question: "What is the most common element in the human body by mass?", options: ["Oxygen", "Carbon", "Hydrogen", "Nitrogen"], correctAnswer: 0 },
                { question: "Which of the following organs is part of the endocrine system?", options: ["Heart", "Lungs", "Thyroid", "Liver"], correctAnswer: 2 },
                { question: "What is the half-life of carbon-14?", options: ["5730 years", "1500 years", "1000 years", "7000 years"], correctAnswer: 0 },
                { question: "What is the molecular formula for methane?", options: ["CH4", "C2H6", "C3H8", "C4H10"], correctAnswer: 0 },
                { question: "In which organ does the majority of digestion and nutrient absorption occur?", options: ["Stomach", "Large intestine", "Small intestine", "Pancreas"], correctAnswer: 2 },
                { question: "What type of galaxy is the Milky Way?", options: ["Spiral", "Elliptical", "Irregular", "Lenticular"], correctAnswer: 0 },
                { question: "What is the most abundant gas in the Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"], correctAnswer: 2 },
                { question: "Which of these elements is a halogen?", options: ["Fluorine", "Oxygen", "Nitrogen", "Carbon"], correctAnswer: 0 },
                { question: "What is the atomic number of carbon?", options: ["6", "12", "8", "14"], correctAnswer: 0 },
                { question: "Which of the following is NOT part of the cell theory?", options: ["All living organisms are made of cells", "The cell is the basic unit of life", "Cells can only arise from non-living matter", "All cells come from pre-existing cells"], correctAnswer: 2 },
                { question: "Which law states that energy cannot be created or destroyed?", options: ["Newton's first law", "Law of Conservation of Mass", "Law of Conservation of Energy", "Boyle's law"], correctAnswer: 2 },
                { question: "What is the main function of the lymphatic system?", options: ["To transport oxygen", "To remove waste products", "To regulate body temperature", "To fight infections"], correctAnswer: 3 },
                { question: "What causes the phenomenon of refraction?", options: ["Change in temperature", "Change in pressure", "Change in speed of light", "Change in frequency of light"], correctAnswer: 2 },
                { question: "What is the process called when a solid changes directly to a gas?", options: ["Melting", "Sublimation", "Evaporation", "Freezing"], correctAnswer: 1 },
                { question: "Which of the following is responsible for the greenhouse effect?", options: ["Oxygen", "Carbon dioxide", "Methane", "Nitrogen"], correctAnswer: 1 },
                { question: "What is the primary function of the kidneys?", options: ["Digest food", "Filter waste from blood", "Regulate body temperature", "Produce hormones"], correctAnswer: 1 },
                { question: "What is the approximate age of the Earth?", options: ["4.5 million years", "4.5 billion years", "4.5 trillion years", "4.5 thousand years"], correctAnswer: 1 },
                { question: "What type of bond involves the sharing of electron pairs between atoms?", options: ["Ionic", "Covalent", "Hydrogen", "Metallic"], correctAnswer: 1 },
                { question: "Which of the following is NOT a type of fossil?", options: ["Cast", "Mold", "Petrograph", "Amber"], correctAnswer: 2 }
                
            ],
        },

        History: {
            EASY: [
                { question: "Who was the first President of the United States?", options: ["George Washington", "Abraham Lincoln", "Thomas Jefferson", "John Adams"], correctAnswer: 0 },
                { question: "In which year did World War I begin?", options: ["1912", "1914", "1916", "1918"], correctAnswer: 1 },
                { question: "What is the name of the ship that brought the Pilgrims to America in 1620?", options: ["The Mayflower", "The Nina", "The Santa Maria", "The Discovery"], correctAnswer: 0 },
                { question: "Who is known as the 'Father of India'?", options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Subhas Chandra Bose", "Indira Gandhi"], correctAnswer: 1 },
                { question: "In which country did the ancient civilization of the Pharaohs exist?", options: ["Egypt", "Greece", "Rome", "Mesopotamia"], correctAnswer: 0 },
                { question: "Who was the first woman to fly solo across the Atlantic Ocean?", options: ["Amelia Earhart", "Bessie Coleman", "Harriet Quimby", "Rosie the Riveter"], correctAnswer: 0 },
                { question: "Who was the first man to walk on the moon?", options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Michael Collins"], correctAnswer: 0 },
                { question: "Which war was fought between the North and South regions of the United States?", options: ["Civil War", "World War I", "War of 1812", "Revolutionary War"], correctAnswer: 0 },
                { question: "Who discovered America in 1492?", options: ["Christopher Columbus", "Vasco da Gama", "Marco Polo", "John Cabot"], correctAnswer: 0 },
                { question: "In what year did the Titanic sink?", options: ["1912", "1900", "1920", "1898"], correctAnswer: 0 },
                { question: "What ancient civilization built the pyramids?", options: ["Ancient Egyptians", "Greeks", "Romans", "Mayans"], correctAnswer: 0 },
                { question: "Who was the leader of Nazi Germany during World War II?", options: ["Adolf Hitler", "Joseph Stalin", "Winston Churchill", "Franklin D. Roosevelt"], correctAnswer: 0 },
                { question: "Which country was ruled by the Pharaohs?", options: ["Egypt", "Rome", "Greece", "Persia"], correctAnswer: 0 },
                { question: "What was the name of the first successful English colony in America?", options: ["Jamestown", "Plymouth", "Roanoke", "Salem"], correctAnswer: 0 },
                { question: "What year did the Berlin Wall fall?", options: ["1989", "1991", "1975", "1963"], correctAnswer: 0 }
                
            ],
            MEDIUM: [
                { question: "In which year did the United States gain independence?", options: ["1776", "1789", "1800", "1774"], correctAnswer: 0 },
                { question: "Who was the leader of the Soviet Union during World War II?", options: ["Joseph Stalin", "Leon Trotsky", "Vladimir Lenin", "Mikhail Gorbachev"], correctAnswer: 0 },
                { question: "What empire did Julius Caesar rule?", options: ["Roman Empire", "Ottoman Empire", "Mongol Empire", "Byzantine Empire"], correctAnswer: 0 },
                { question: "Which country was formerly known as Persia?", options: ["Iran", "Iraq", "Afghanistan", "Syria"], correctAnswer: 0 },
                { question: "Which event triggered the start of World War I?", options: ["Assassination of Archduke Franz Ferdinand", "German invasion of Poland", "Attack on Pearl Harbor", "Sinking of the Lusitania"], correctAnswer: 0 },
                { question: "Who was the first emperor of China?", options: ["Qin Shi Huang", "Kublai Khan", "Li Shimin", "Sun Tzu"], correctAnswer: 0 },
                { question: "Which ancient civilization built Machu Picchu?", options: ["Inca", "Aztec", "Maya", "Olmec"], correctAnswer: 0 },
                { question: "In which year did the French Revolution begin?", options: ["1789", "1776", "1792", "1804"], correctAnswer: 0 },
                { question: "Which country was the first to grant women the right to vote?", options: ["New Zealand", "United States", "United Kingdom", "Australia"], correctAnswer: 0 },
                { question: "Who was the British prime minister during most of World War II?", options: ["Winston Churchill", "Neville Chamberlain", "Clement Attlee", "David Lloyd George"], correctAnswer: 0 },
                { question: "What was the name of the first human-made satellite?", options: ["Sputnik 1", "Apollo 11", "Explorer 1", "Hubble Space Telescope"], correctAnswer: 0 },
                { question: "Which empire was ruled by Genghis Khan?", options: ["Mongol Empire", "Ottoman Empire", "Roman Empire", "Persian Empire"], correctAnswer: 0 },
                { question: "What was the name of the ship that carried the Pilgrims to the New World in 1620?", options: ["The Mayflower", "The Nina", "The Santa Maria", "The Discovery"], correctAnswer: 0 },
                { question: "Which war was fought between the United States and Vietnam?", options: ["Vietnam War", "Korean War", "Civil War", "World War II"], correctAnswer: 0 },
                { question: "Which European country was the first to abolish slavery?", options: ["Denmark", "France", "England", "Portugal"], correctAnswer: 0 },
                { question: "In what year did the United States enter World War I?", options: ["1917", "1914", "1915", "1919"], correctAnswer: 0 },
                { question: "Who was the first African-American president of the United States?", options: ["Barack Obama", "George Washington", "Abraham Lincoln", "Martin Van Buren"], correctAnswer: 0 },
                { question: "Which event marked the end of the Cold War?", options: ["Fall of the Berlin Wall", "Cuban Missile Crisis", "Vietnam War", "Signing of the Treaty of Versailles"], correctAnswer: 0 },
                { question: "Who was the first man to circumnavigate the globe?", options: ["Ferdinand Magellan", "Christopher Columbus", "Marco Polo", "Vasco da Gama"], correctAnswer: 0 },
                { question: "Which country was the main rival of the United States during the Cold War?", options: ["Soviet Union", "China", "Germany", "Japan"], correctAnswer: 0 }
                
            ],
            
            HARD: [
                { question: "Who was the longest-reigning monarch of France?", options: ["Louis XIV", "Louis XVI", "Napoleon Bonaparte", "Charles de Gaulle"], correctAnswer: 0 },
                { question: "What was the name of the treaty that ended World War I?", options: ["Treaty of Versailles", "Treaty of Paris", "Treaty of Tordesillas", "Treaty of Utrecht"], correctAnswer: 0 },
                { question: "Which ancient civilization is known for creating the first form of writing?", options: ["Sumerians", "Egyptians", "Romans", "Greeks"], correctAnswer: 0 },
                { question: "Who was the British monarch during the American Revolution?", options: ["King George III", "Queen Victoria", "King Henry VIII", "King Edward VII"], correctAnswer: 0 },
                { question: "Which historical figure was known as the 'Iron Lady'?", options: ["Margaret Thatcher", "Indira Gandhi", "Golda Meir", "Catherine the Great"], correctAnswer: 0 },
                { question: "What was the name of the first human to orbit the Earth?", options: ["Yuri Gagarin", "Alan Shepard", "Valentina Tereshkova", "Neil Armstrong"], correctAnswer: 0 },
                { question: "In which year was the Berlin Wall erected?", options: ["1961", "1950", "1949", "1965"], correctAnswer: 0 },
                { question: "Which empire was responsible for the construction of the Colosseum?", options: ["Roman Empire", "Byzantine Empire", "Ottoman Empire", "Mongol Empire"], correctAnswer: 0 },
                { question: "Which country was ruled by the Romanov dynasty until 1917?", options: ["Russia", "Poland", "France", "Sweden"], correctAnswer: 0 },
                { question: "Who was the first emperor of the Roman Empire?", options: ["Augustus", "Julius Caesar", "Nero", "Caligula"], correctAnswer: 0 },
                { question: "In which year was the Magna Carta signed?", options: ["1215", "1066", "1492", "1503"], correctAnswer: 0 },
                { question: "Who was the leader of the Spanish forces during the conquest of the Aztecs?", options: ["Hernán Cortés", "Francisco Pizarro", "Diego de Almagro", "Christopher Columbus"], correctAnswer: 0 },
                { question: "Which battle was the turning point in the American Civil War?", options: ["Battle of Gettysburg", "Battle of Antietam", "Battle of Fort Sumter", "Battle of Saratoga"], correctAnswer: 0 },
                { question: "What event marked the end of the Roman Empire?", options: ["Fall of Constantinople", "Sacking of Rome", "Battle of Hastings", "The Black Death"], correctAnswer: 1 },
                { question: "Which country was the birthplace of the Renaissance?", options: ["Italy", "France", "England", "Spain"], correctAnswer: 0 },
                { question: "What was the primary cause of the Hundred Years' War?", options: ["Territorial disputes", "Religious differences", "Dynastic succession", "Cultural differences"], correctAnswer: 2 },
                { question: "Which country was involved in the Opium Wars with China?", options: ["Britain", "United States", "France", "Germany"], correctAnswer: 0 },
                { question: "Who was the first person to circumnavigate the globe?", options: ["Ferdinand Magellan", "Christopher Columbus", "Marco Polo", "Vasco da Gama"], correctAnswer: 0 },
                { question: "Which African empire was founded by Sundiata Keita?", options: ["Mali Empire", "Ghana Empire", "Songhai Empire", "Carthaginian Empire"], correctAnswer: 0 },
                { question: "Which world event was triggered by the assassination of Archduke Franz Ferdinand?", options: ["World War I", "World War II", "Cold War", "Vietnam War"], correctAnswer: 0 },
                { question: "In what year did the Soviet Union dissolve?", options: ["1991", "1989", "1990", "1995"], correctAnswer: 0 },
                { question: "What was the main goal of the Crusades?", options: ["To reclaim Jerusalem", "To conquer Constantinople", "To spread Christianity", "To find new trade routes"], correctAnswer: 0 },
                { question: "Which ancient empire was ruled by Alexander the Great?", options: ["Macedonian Empire", "Roman Empire", "Ottoman Empire", "Persian Empire"], correctAnswer: 0 },
                { question: "Who was the founder of the Ottoman Empire?", options: ["Osman I", "Suleiman the Magnificent", "Mehmed the Conqueror", "Selim I"], correctAnswer: 0 },
                { question: "What was the name of the ship that carried the first English settlers to America in 1607?", options: ["The Susan Constant", "The Mayflower", "The Sea Venture", "The Discovery"], correctAnswer: 0 },
                { question: "Who was the first female ruler of Egypt?", options: ["Cleopatra", "Hatshepsut", "Nefertiti", "Neferure"], correctAnswer: 1 },
                { question: "What event triggered the start of the French Revolution?", options: ["Storming of the Bastille", "Execution of Louis XVI", "Reign of Terror", "Fall of the monarchy"], correctAnswer: 0 },
                { question: "Which civilization is credited with inventing the wheel?", options: ["Sumerians", "Egyptians", "Indus Valley", "Aztecs"], correctAnswer: 0 }
                
            ],
        }
        
    };

    // Return the relevant questions
    return questions[category][difficulty];
}




