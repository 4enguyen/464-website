const options = document.getElementById('options');
const questionDisplay = document.getElementById('questionDisplay');
let questions = [
  {
    question: "What is the scientific name for the domestic cat?",
    choices: ["Canis lupus", "Felis catus", "Panthera leo", "Ursus arctos"],
    correctAnswer: "B) Felis catus"
  },
  {
    question: "Which cat is known for being hairless?",
    choices: ["Persian", "Maine Coon", "Sphynx", "Ragdoll"],
    correctAnswer: "Sphynx"
  },
  {
    question: "What unique feature do Maine Coon cats have?",
    choices: ["Curly fur", "Extra toes", "No tail", "Blue eyes"],
    correctAnswer: "Extra toes"
  },
  {
    question: "Cats are known to sleep for how many hours per day on average?",
    choices: ["8-12 hours", "12-16 hours", "16-20 hours", "More than 20 hours"],
    correctAnswer: "16-20 hours"
  },
  {
    question: "Which of the following is NOT a reason a cat might purr?",
    choices: ["Happiness", "Stress", "Hunger", "Cold"],
    correctAnswer: "Cold"
  },
  {
    question: "What do cats use their whiskers for?",
    choices: ["Balancing", "Measuring gaps", "Showing emotions", "All of the above"],
    correctAnswer: "All of the above"
  }
];
let score = 0;
let questionsCopy = [...questions];

function newGame() {
  const options = document.getElementById('options');
  const questionDisplay = document.getElementById('questionDisplay');

  // Check if there are no more questions
  if (questions.length === 0) {
    questionDisplay.textContent = `Game over! Your final score is ${score}.`;
    options.innerHTML = '';
  
    options.style.display = 'flex';
    options.style.justifyContent = 'center';
    options.style.alignItems = 'center';
  
    let restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Quiz';
    restartButton.addEventListener('click', function() {
      // Reset the questions array and score, and start a new game
      questions = [...questionsCopy];
      score = 0;
      newGame();
      options.style.display = 'grid';
      options.style.justifyContent = 'normal';
      options.style.alignItems = 'normal';
    });
    restartButton.classList = 'option-button';
    options.appendChild(restartButton);
    return;
  }

  // Select a random question
  let randomQuestionIndex = Math.floor(Math.random() * questions.length);
  let currentQuestion = questions[randomQuestionIndex];

  // Display the question
  questionDisplay.textContent = currentQuestion.question;
  questionDisplay.style.fontWeight = 'bold';
  questionDisplay.style.textAlign = 'center';
  questionDisplay.style.fontSize = '1.5em';
  questionDisplay.style.marginBottom = '1em';

  // Clear previous options
  options.innerHTML = '';

  // Display the answer choices
  for (let choice of currentQuestion.choices) {
    let option = document.createElement('button');
    option.classList = 'option-button';
    option.textContent = choice;
    option.addEventListener('click', function() {
      if (this.textContent === currentQuestion.correctAnswer) {
        score++;
      }
      // Next Question
      newGame();
    });
    options.appendChild(option);
  }

  // Remove the current question from the array so it won't be repeated
  questions.splice(randomQuestionIndex, 1);
}

newGame();