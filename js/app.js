
let computerLetter = '';
let guesses = [];
let turnsLeft = 10;

const guessInput = document.getElementById('guess-input');
const messageDisplay = document.getElementById('message');
const remainingTurnsDisplay = document.getElementById('remaining-turns');
const previousGuessesDisplay = document.getElementById('previous-guesses');
const restartBtn = document.getElementById('restart-btn');
const checkBtn = document.getElementById('check-btn');
const alphabetButtons = document.querySelectorAll('.Alphabet-btn')

alphabetButtons.forEach(button => {
    button.addEventListener('click', function() {
        guessInput.value = this.textContent;
    });
});

function generateRandomLetter() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return letters[Math.floor(Math.random() * letters.length)];
}

function initGame() {
    computerLetter = generateRandomLetter();
    guesses = [];
    turnsLeft = 10;
    guessInput.value = '';
    messageDisplay.textContent = '';
    updateGameDisplay();
}

function updateGameDisplay() {
    remainingTurnsDisplay.textContent = `You have: ${turnsLeft}`;
    previousGuessesDisplay.textContent = `Previous guesses: ${guesses.join(', ')}`;
}

function checkGuess() {
    const guess = guessInput.value.toLowerCase();
    
    if (!guess || guess.length !== 1 || !/[a-z]/.test(guess)) {
        alert('Please enter a valid letter!');
        return;
    }

    if (guesses.includes(guess)) {
        alert('You already guessed that letter!');
        return;
    }

    guesses.push(guess);
    turnsLeft--;

    if (guess === computerLetter) {
        messageDisplay.textContent = `YOU WIN!! ${computerLetter}`;
        disableGame();
    } else if (turnsLeft === 0) {
        messageDisplay.textContent = `GG TRY AGINE!!  THE LETTER WAS  ${computerLetter}`;
        disableGame();
    } else {
        updateGameDisplay();
        guessInput.value = '';
    }
}


function disableGame() {
    guessInput.disabled = true;
    checkBtn.disabled = true;
}

function restartGame() {
    guessInput.disabled = false;
    checkBtn.disabled = false;
    initGame();
}


checkBtn.addEventListener('click', checkGuess);
restartBtn.addEventListener('click', restartGame);

window.onload = initGame;
