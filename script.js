// Obtener los elementos de los botones
const greenButton = document.getElementById('green-button');
const redButton = document.getElementById('red-button');
const blueButton = document.getElementById('blue-button');
const yellowButton = document.getElementById('yellow-button');

const colorButtons = ['green-button', 'red-button', 'blue-button', 'yellow-button'];

// Obtener el botón de inicio
const startButton = document.getElementById('start-button');

// Array para almacenar la secuencia del juego
let gameSequence = [];

// Array para almacenar la secuencia del jugador
let playerSequence = [];

// Variable para almacenar el nivel actual del juego
let level = 1;

// Variable para almacenar el puntaje acumulado
let score = 0;

startButton.addEventListener('click', startGame);

// Función para iniciar el juego
function startGame() {
    const powerIcon = document.getElementById('power-icon');
    const playIcon = document.getElementById('play-icon');
    const resetIcon = document.getElementById('reset-icon');

    powerIcon.style.display = 'none';
    resetIcon.style.display = 'inline';
    generateSequence();
    playSequence();
    startTimer();
    startButton.addEventListener('click', resetGame);
}

// Función para generar una nueva secuencia de juego
function generateSequence() {
    for (let i = 0; i < level; i++) {
        const randomColor = Math.floor(Math.random() * colorButtons.length);
        gameSequence.push(randomColor);
    }
}

// Función para reproducir la secuencia de juego
function playSequence() {
    let i = 0;
    const sequenceInterval = setInterval(() => {
        const buttonIndex = gameSequence[i];
        lightUpButton(buttonIndex);
        i++;
        if (i >= gameSequence.length) {
            clearInterval(sequenceInterval);
        }
    }, 1000);
}

// Función para manejar el clic en los botones del juego
function handleButtonClick(buttonIndex) {
    if (gameSequence.length > 0) {
        lightUpButton(buttonIndex);
        if (buttonIndex === gameSequence[playerSequence.length]) {
            playerSequence.push(buttonIndex);
            if (playerSequence.length === gameSequence.length) {
                setTimeout(nextLevel, 1000);
            }
        } else {
            gameOver();
        }
    }
}

// Verificar si la secuencia del jugador coincide con la secuencia actual
function checkSequence() {
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== gameSequence[i]) {
            return false;
        }
    }
    return true;
}

// Función para iluminar un botón
function lightUpButton(buttonIndex) {
    const buttons = [greenButton, redButton, blueButton, yellowButton];
    buttons[buttonIndex].classList.add('active');
    setTimeout(() => {
        buttons[buttonIndex].classList.remove('active');
    }, 500);
}

function resetGame() {
    gameSequence = [];
    playerSequence = [];
    level = 1;
    score = 0;
    updateScore();
    resetTimer();
    const powerIcon = document.getElementById('power-icon');
    const playIcon = document.getElementById('play-icon');
    const resetIcon = document.getElementById('reset-icon');
    powerIcon.style.display = 'inline';
    resetIcon.style.display = 'none';
    window.location.href = "index.html";
}

// Función para actualizar el puntaje en pantalla
function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${score}`;
}

let timer;
let minutes = 0;
let seconds = 0;
let isRunning = false;

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTimer, 1000); // Cada 1000 ms (1 segundo)
    }
}

function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    document.getElementById('minutes').innerText = padNumber(minutes);
    document.getElementById('seconds').innerText = padNumber(seconds);
}

function padNumber(num) {
    return num.toString().padStart(2, '0');
}

function resetTimer() {
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    isRunning = false;
    document.getElementById('minutes').innerText = '00';
    document.getElementById('seconds').innerText = '00';
}

// Función para avanzar al siguiente nivel del juego
function nextLevel() {
    playerSequence = [];
    level++;
    generateSequence();
    playSequence();
    score++;
    updateScore();
}

// Función para finalizar el juego
function gameOver() {
    // const board = document.getElementById('board');
    const gameOver = document.getElementById('game-over');
    gameOver.style.display = 'inline';
    board.style.filter = 'grayscale(100%)';
    gameSequence = [];
    playerSequence = [];
    level = 1;
    score = 0;
    updateScore();
    resetTimer();
}