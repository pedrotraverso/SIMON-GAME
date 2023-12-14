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

// Variable para almacenar el puntaje de las luces
let lightScore = 0;

// Variable para almacenar el puntaje de la sequencia
let sequenceScore = 0;

// Variable para almacenar el tiempo al iniciar la partida
let startTime;

// Array para almacenar los resultados de cada partida
let gameResults = [];



// Obtener el elemento del modal
const results = document.getElementById('results-container');



// Obtén el elemento del modal
const modal2 = document.getElementById('myModal');

// Ventana modal
var modale = document.getElementById("ventanaModal");

// Hace referencia al elemento <span> que tiene la X que cierra la ventana
var span = document.getElementsByClassName("cerrar")[0];

// Cuando el usuario hace click en el botón, se abre la ventana
boton.addEventListener("click", function () {
    modale.style.display = "block";
});

// Si el usuario hace click en la x, la ventana se cierra
span.addEventListener("click", function () {
    modale.style.display = "none";
});

// Si el usuario hace click fuera de la ventana, se cierra.
window.addEventListener("click", function (event) {
    if (event.target == modale) {
        modale.style.display = "none";
    }
});



startButton.addEventListener('click', startGame);

// Función para iniciar el juego
function startGame() {
    // Obtén el valor del nombre ingresado por el jugador
    const playerName = document.getElementById('player-name').value;

    // Verifica que el nombre tenga al menos 3 letras
    if (playerName.length < 3) {
        alert('Please enter a name with at least 3 letters.');
        return;
    }

    const powerIcon = document.getElementById('power-icon');
    const playIcon = document.getElementById('play-icon');
    const restartIcon = document.getElementById('restart-icon');

    powerIcon.style.display = 'none';
    restartIcon.style.display = 'inline';
    generateSequence();
    playSequence();
    startTimer();
    startButton.addEventListener('click', restartGame);
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
            lightScore++;
            updateLightScore();
            if (playerSequence.length === gameSequence.length) {
                setTimeout(() => {
                    nextLevel();
                    updateSequenceScore();
                }, 1000);
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

function restartGame() {
    gameSequence = [];
    playerSequence = [];
    level = 1;
    lightScore = 0;
    sequenceScore = 0;
    updateSequenceScore();
    resetTimer();
    const powerIcon = document.getElementById('power-icon');
    const playIcon = document.getElementById('play-icon');
    const restartIcon = document.getElementById('restart-icon');
    powerIcon.style.display = 'inline';
    restartIcon.style.display = 'none';
    window.location.href = "index.html";
}

// Función para actualizar el puntaje de las luces acertadas en pantalla
function updateLightScore() {
    const lightScoreElement = document.getElementById('light-score');
    lightScoreElement.textContent = `Light Score: ${lightScore}`;
}

// Función para actualizar el puntaje de las sequencias acertadas en pantalla
function updateSequenceScore() {
    const sequenceScoreElement = document.getElementById('sequence-score');
    sequenceScoreElement.textContent = `Sequence Score: ${sequenceScore}`;
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
    sequenceScore++;
    updateSequenceScore();
}

// Función para finalizar el juego
// function gameOver() {
//     // const board = document.getElementById('board');
//     const gameOver = document.getElementById('game-over');
//     gameOver.style.display = 'inline';
//     board.style.filter = 'grayscale(100%)';

//     // Calcula el tiempo transcurrido y aplica la penalización
//     const endTime = new Date().getTime();
//     const elapsedTime = (endTime - startTime) / 1000; // segundos
//     const penalty = 0.5; // ajusta según tu preferencia

//     // Calcula el puntaje final
//     const finalScore = lightScore - penalty * elapsedTime;

//     // Guarda el resultado de la partida
//     saveGameResult(finalScore);

//     gameSequence = [];
//     playerSequence = [];
//     level = 1;
//     lightScore = 0;
//     sequenceScore = 0;
//     updateLightScore();
//     updateSequenceScore();
//     resetTimer();
// }

// Nueva función para guardar el resultado de la partida
function saveGameResult(finalScore) {
    const playerName = document.getElementById('player-name').value;
    const currentDate = new Date();

    const gameResult = {
        playerName: playerName,
        score: finalScore,
        level: level,
        date: currentDate.toLocaleString(),
    };

    // Agrega el resultado al array
    gameResults.push(gameResult);

    // Guarda el array en LocalStorage
    localStorage.setItem('gameResults', JSON.stringify(gameResults));
}

// Nueva función para mostrar el ranking
function showRanking() {
    // Ordena los resultados por puntaje
    gameResults.sort((a, b) => b.score - a.score);

    // Muestra un popup con el ranking
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = '<h2>Game Results Ranking</h2>';

    gameResults.forEach((result, index) => {
        const resultItem = document.createElement('p');
        resultItem.textContent = `${index + 1}. ${result.playerName} - Score: ${result.score} - Level: ${result.level} - Date: ${result.date}`;
        modalContent.appendChild(resultItem);
    });

    results.style.display = 'block';
}

function gameOver() {
    const gameOverElement = document.getElementById('game-over');
    gameOverElement.style.display = 'inline';
    board.style.filter = 'grayscale(100%)';

    // Muestra el modal de Game Over
    showModal();
}

// Función para mostrar el modal
function showModal() {
    modal.style.display = 'block';
}

// Función para reiniciar el juego al hacer clic en el botón del modal
function restartGame() {
    modal.style.display = 'none';
    restartGame();
}

// Nueva función para cerrar el popup
function closeModal() {
    results.style.display = 'none';
}