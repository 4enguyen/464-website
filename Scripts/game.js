const catImage = document.getElementById('catImage');
const options = document.getElementById('options');
const nextButton = document.getElementById('next');
const breeds = {
  'Bengal': 5,
  'Birman': 5,
  'British Shorthair': 5,
  'Maine Coon': 5,
  'Persian': 5,
  'Ragdoll': 5,
  'Siamese': 5,
  'Sphynx': 5
};
let currentScore = 0;
const currentScoreDisplay = document.getElementById('currentScore');
let highScore = 0;
const highScoreDisplay = document.getElementById('highScore');
let isLoggedIn = false;

function newGame() {
  let breedKeys = Object.keys(breeds);
  currentBreed = breedKeys[Math.floor(Math.random() * breedKeys.length)];
  let imageNumber = Math.floor(Math.random() * breeds[currentBreed]) + 1;
  catImage.src = `Images/Breeds/${currentBreed}/${imageNumber}.jpg`;

  let otherBreeds = breedKeys.filter(breed => breed !== currentBreed);
  let randomBreeds = [];
  for (let i = 0; i < 3; i++) {
    let randomIndex = Math.floor(Math.random() * otherBreeds.length);
    randomBreeds.push(...otherBreeds.splice(randomIndex, 1));
  }

  let optionBreeds = [...randomBreeds, currentBreed];
  optionBreeds.sort(() => Math.random() - 0.5);

  options.innerHTML = '';
  for (let breed of optionBreeds) {
    let option = document.createElement('button');
    option.classList = 'option-button';
    option.textContent = breed;
    option.addEventListener('click', () => {
      if (breed === currentBreed) {
        showMessage('Correct!', true);
        option.style.background = 'lime';
        currentScore++;
        currentScoreDisplay.textContent = 'Score:' + currentScore;
      } else {
        showMessage('Try Again!', false);
        option.disabled = true;
        endGame();
        currentScore = 0;
        currentScoreDisplay.textContent = 'Score:' + currentScore;
      }
    });
    options.appendChild(option);
  }
}

function endGame() {
  if (isLoggedIn) {
    fetch('update_score.php', {
      method: 'POST',
      body: JSON.stringify({ score: currentScore}),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.text())
    .then(newHighScore => {
      if (newHighScore > highScore) {
        highScore = newHighScore;
        highScoreDisplay.textContent = 'High Score: ' + highScore;
      }
    });
  }
}

function showMessage(text, isCorrect) {
  message.textContent = text;
  message.style.display = 'block';
  message.style.background = isCorrect ? 'lime' : 'red';
  setTimeout(() => {
    message.style.display = 'none';
    if(isCorrect) {
      setTimeout(newGame(), 1000);
    }

  }, 1000);

}

window.onload = function() {
  fetch('update_score.php')
    .then(response => response.text())
    .then(responseHighScore => {
      if (responseHighScore === 'Not logged in') {
        isLoggedIn = false;
      } else {
        isLoggedIn = true;
        highScore = responseHighScore;
        highScoreDisplay.textContent = 'High Score: ' + highScore;
      }
    });
};

nextButton.addEventListener('click', newGame);
newGame();