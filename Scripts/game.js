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
      } else {
        showMessage('Try Again!', false);
        option.disabled = true;
      }
    });
    options.appendChild(option);
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
nextButton.addEventListener('click', newGame);
newGame();