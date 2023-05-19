import randomWords from "random-words";
import './style.css'


const secretWord = randomWords()
const secretWordArrLetter = secretWord.split('')
// console.log(secretWord)
// console.log('array', secretWordArrLetter)


const word = document.getElementById('word')

const manImage = document.getElementById('manImage')
const message = document.getElementById('message')
const guessedLetters = document.getElementById('guessedLetters')

const form = document.querySelector('form');
const userInput = document.getElementById('userInput')
const button = document.getElementById('enterBtn')

// add letters boxes to the DOM
for (let letter of secretWord){
  const divLetter = document.createElement('div');
  divLetter.classList.add('letter')
  word.append(divLetter)
}
const divLetters = document.querySelectorAll('.letter')
console.log(divLetters);

// placeholders for game state
let currentError = 0
let rightGuesses = 0
let guessedLettersArr = []

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const letter = userInput.value
  console.log('letter input', letter)
  userInput.value = ''
  message.classList.remove('error', 'right', 'wrong')
  if (isValidGuess(letter)) {
    console.log('valid guess')
    handleValidGuess(letter)
    return
  } 
  console.log('invalid guess')
})



/**
 * Verifies if the guess is valid
 * @param {string} letter - The character guessed by the user
 * @returns {boolean}
 */
function isValidGuess(character){
  // If is not letter => false
  if(!isItALetter(character)){
    message.textContent = ` ${character} is not a valid letter`  
    message.classList.add('error')
    return false
  }

  // If  is already guessed => false
  if (guessedLettersArr.includes(character)){
    message.textContent = `The letter ${character} has been guessed`
    message.classList.add('error')
    return false
  }
  return true
}

function handleValidGuess(letter){
  // If is a new letter => add to guessedLettersArr
  guessedLettersArr.push(letter)
  guessedLetters.textContent = guessedLettersArr.join(', ')
  
  // If is a correct guess => add to word
  if (secretWordArrLetter.includes(letter)){
    console.log('right guess')
    handleRightGuess(letter)
    checkVictory()
  } else {
    console.log('wrong guess')
    handleErrorGuess()
    checkLost()
  }
}

function handleRightGuess(letter){
  message.textContent = 'You got it'
  message.classList.add('right')
  console.log(letter)
  secretWordArrLetter.forEach((value, index) => {
    if(value === letter){
      divLetters[index].textContent = letter
      rightGuesses += 1
    }
  })
  
}

// If all letters are guessed => win game
function checkVictory() {

if (rightGuesses === secretWordArrLetter.length){
  message.textContent = 'You won'
}
}

// If is a wrong guess => add to manImage
function handleErrorGuess() {
  message.textContent = 'Wrong Guess'
  message.classList.add('wrong')
  currentError += 1
  console.log(currentError)
  manImage.src = `./images/${currentError}.jpg`
}

// If got 6 wrong guesses => lost game
function checkLost(){
  console.log('check lost', currentError)
  if (currentError === 6){
    userInput.disabled = true
    button.disabled = true
    message.textContent = 'You lost'
    message.classList.add('wrong')
  }
}

//eu tenho que interagir na palavra, letra por letra - done
// e ver se essa letra esta inclusa na palavra
// se tiver, ela deve aparecer nos tracinhos se nao uma parte do homem
// tem que aparecer no hanger


//validar se o usuario usou somente letra
//do I need to have form tag to validate the user input
//also onChange?
function isItALetter(character){
  const regex = new RegExp(/^[A-Za-z]+$/)
  return regex.test(character)
}



