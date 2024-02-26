// Obtener los elementos de los botones
const greenButton = document.getElementById('green-button');
const redButton = document.getElementById('red-button');
const blueButton = document.getElementById('blue-button');
const yellowButton = document.getElementById('yellow-button');

const colorButtons = ['green-button', 'red-button', 'blue-button', 'yellow-button'];

// Obtener el botón de inicio
const powerOnButton = document.getElementById('power-on-button');
const powerOffButton = document.getElementById('power-off-button');
const playPauseButton = document.getElementById('play-pause-button');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const restartIcon = document.getElementById('restart-icon');

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

const logo = document.getElementById('logo');

logo.style.filter = 'opacity(60%)';
greenButton.style.background = 'radial-gradient(circle, #2f2f2f 35%, #000000 100%)';
redButton.style.background = 'radial-gradient(circle, #2f2f2f 35%, #000000 100%)';
blueButton.style.background = 'radial-gradient(circle, #2f2f2f 35%, #000000 100%)';
yellowButton.style.background = 'radial-gradient(circle, #2f2f2f 35%, #000000 100%)';

powerOnButton.style.display = 'inline';
powerOffButton.style.display = 'none';
playPauseButton.style.display = 'none';
playIcon.style.display = 'none';
pauseIcon.style.display = 'none';
restartIcon.style.display = 'none';

// Deshabilitar los botones de colores
disableColorButtons();

// Eliminar event listeners anteriores para evitar duplicados
powerOnButton.removeEventListener('click', powerGame);
powerOffButton.removeEventListener('click', exitGame);
playPauseButton.removeEventListener('click', startGame);
playPauseButton.removeEventListener('click', restartGame);

powerOnButton.addEventListener('click', powerGame);

// Función para encender el juego
function powerGame() {
    // Habilita la opción de ingresar nombre
    const playerNameInput = document.getElementById('player-name');
    playerNameInput.disabled = false;

    stopGame();
  
    // Establecer los estilos y elementos visuales
    logo.style.filter = 'none';

    greenButton.style.background = 'radial-gradient(circle, rgb(0, 128, 0) 35%, #000000 100%)';
    redButton.style.background = 'radial-gradient(circle, rgb(192, 0, 0) 35%, #000000 100%)';
    blueButton.style.background = 'radial-gradient(circle, rgb(0, 0, 192) 35%, #000000 100%)';
    yellowButton.style.background = 'radial-gradient(circle, rgb(192, 192, 0) 35%, #000000 100%)';

    powerOnButton.style.display = 'none';
    powerOffButton.style.display = 'inline';
    playPauseButton.style.display = 'inline';
    playIcon.style.display = 'inline';
    pauseIcon.style.display = 'none';
    restartIcon.style.display = 'none';

    // Deshabilitar los botones de colores
    disableColorButtons();

    // Muestra el número de nivel inicial en el elemento HTML
    const levelNumberElement = document.getElementById('level-number');
    levelNumberElement.textContent = '1';

    // Muestra el número de light score inicial en el elemento HTML
    const lightScorePointsElement = document.getElementById('light-score-points');
    lightScorePointsElement.textContent = '0';

    // Muestra el número de sequence score inicial en el elemento HTML
    const sequenceScorePointsElement = document.getElementById('sequence-score-points');
    sequenceScorePointsElement.textContent = '0';

    // Muestra el número de minutos del timer inicial en el elemento HTML
    const timerMinutesElement = document.getElementById('minutes');
    timerMinutesElement.textContent = '00';

    // Muestra el número de segundos del timer inicial en el elemento HTML
    const timerSecondsElement = document.getElementById('seconds');
    timerSecondsElement.textContent = '00';

    // Eliminar event listeners anteriores para evitar duplicados
    powerOnButton.removeEventListener('click', powerGame);

    // Agregar nuevos event listeners
    powerOffButton.addEventListener('click', exitGame);
    playPauseButton.addEventListener('click', startGame);
}

// Función para salir del juego
function exitGame() {
    // Cerrar la ventana modal
    var modal = document.getElementById("game-over");
    modal.style.display = "none";

    if (isGameActive) {
        // Guardar los resultados de la partida actual si el juego está activo
        saveGameResult();

        // Actualizar el ranking con los resultados actuales si el juego está activo
        updateRanking();
    }

    stopGame();

    // Restablecer el temporizador y los puntajes
    initializeTimer();
    initializeLevel();
    initializeLightScore();
    initializeSequenceScore();

    // Establecer los estilos y elementos visuales
    logo.style.filter = 'opacity(60%)';
    greenButton.style.background = 'radial-gradient(circle, #2f2f2f 35%, #000000 100%)';
    redButton.style.background = 'radial-gradient(circle, #2f2f2f 35%, #000000 100%)';
    blueButton.style.background = 'radial-gradient(circle, #2f2f2f 35%, #000000 100%)';
    yellowButton.style.background = 'radial-gradient(circle, #2f2f2f 35%, #000000 100%)';

    powerOnButton.style.display = 'inline';
    powerOffButton.style.display = 'none';
    playPauseButton.style.display = 'none';
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'none';
    restartIcon.style.display = 'none';

    // Restablece el nombre del jugador y deshabilita la opción de ingresar nombre
    const playerNameInput = document.getElementById('player-name');
    playerNameInput.value = '';
    playerNameInput.disabled = true;

    // Deshabilitar los botones de colores
    disableColorButtons();;

    // Eliminar event listeners anteriores para evitar duplicados
    powerOffButton.removeEventListener('click', exitGame);

    // Agregar nuevos event listeners
    powerOnButton.addEventListener('click', powerGame);
}

let isGameActive = true;

// Función para iniciar la partida
function startGame() {
    // Obtener el nombre ingresado por el jugador
    const playerName = document.getElementById('player-name').value;

    // Verificar que el nombre tenga al menos 3 letras
    if (playerName.length < 3) {
        alert('Please enter a name with at least 3 letters.');
        return;
    }

    // Establecer los estilos y elementos visuales
    powerOnButton.style.display = 'none';
    powerOffButton.style.display = 'inline';
    playPauseButton.style.display = 'inline';
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'none';
    restartIcon.style.display = 'inline';

    // Habilitar los botones de colores
    enableColorButtons();

    isGameActive = true;

    // Deshabilita la opción de ingresar nombre
    const playerNameInput = document.getElementById('player-name');
    playerNameInput.disabled = true;

    // Generar la secuencia, reproducir la secuencia e iniciar el temporizador
    generateSequence();
    playSequence();
    startTimer();

    // Eliminar event listeners anteriores para evitar duplicados
    playPauseButton.removeEventListener('click', startGame);

    // Agregar nuevos event listeners o realizar otras operaciones si es necesario
    powerOffButton.addEventListener('click', exitGame);
    playPauseButton.addEventListener('click', restartGame);
}

// Función para iniciar una nueva partida
function restartGame() {
    // Cerrar la ventana modal
    var modal = document.getElementById("game-over");
    modal.style.display = "none";

    if (isGameActive) {
        // Guardar los resultados de la partida actual si el juego está activo
        saveGameResult();

        // Actualizar el ranking con los resultados actuales si el juego está activo
        updateRanking();
    }

    stopGame();

    // Restablecer las variables del juego
    gameSequence = [];
    playerSequence = [];
    level = 1;
    lightScore = 0;
    sequenceScore = 0;

    // Restablecer el temporizador y los puntajes
    resetTimer();
    updateLightScore();
    updateSequenceScore();

    // Habilitar los botones de colores
    enableColorButtons();

    // Eliminar event listeners anteriores para evitar duplicados
    playPauseButton.removeEventListener('click', restartGame);

    // Agregar nuevos event listeners
    powerOffButton.addEventListener('click', exitGame);
    playPauseButton.addEventListener('click', startGame);

    // Reiniciar el juego
    powerGame();
}

function stopGame() {
    isGameActive = false;
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
        if (isGameActive) {
            const buttonIndex = gameSequence[i];

            // Verificar que buttonIndex sea un índice válido
            if (buttonIndex !== undefined && buttonIndex >= 0 && buttonIndex < colorButtons.length) {
                lightUpButton(buttonIndex);
            }

            i++;
            if (i >= gameSequence.length) {
                clearInterval(sequenceInterval);
            }
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

// Función para verificar si la secuencia del jugador coincide con la secuencia actual
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

// Función para avanzar al siguiente nivel del juego
function nextLevel() {
    playerSequence = [];
    level++;
    generateSequence();
    playSequence();
    sequenceScore++;
    updateSequenceScore();
    // saveGameResult();

    // Agrega la siguiente línea para actualizar el nivel en pantalla
    updateLevel();
}

// Función para actualizar el puntaje de las luces acertadas en pantalla
function updateLightScore() {
    const lightScoreElement = document.getElementById('light-score-points');
    lightScoreElement.textContent = `${lightScore}`;
}

// Función para actualizar el puntaje de las luces acertadas en pantalla
function initializeLightScore() {
    const lightScoreElement = document.getElementById('light-score-points');
    lightScoreElement.textContent = "-";
}

// Función para actualizar el puntaje de las sequencias acertadas en pantalla
function updateSequenceScore() {
    const sequenceScoreElement = document.getElementById('sequence-score-points');
    sequenceScoreElement.textContent = `${sequenceScore}`;
}

// Función para actualizar el puntaje de las sequencias acertadas en pantalla
function initializeSequenceScore() {
    const sequenceScoreElement = document.getElementById('sequence-score-points');
    sequenceScoreElement.textContent = "-";
}

// Función para actualizar el puntaje de las luces acertadas en pantalla
function updateLevel() {
    const levelElement = document.getElementById('level-number');
    levelElement.textContent = `${level}`;
}

// Función para actualizar el puntaje de las luces acertadas en pantalla
function initializeLevel() {
    const levelElement = document.getElementById('level-number');
    levelElement.textContent = "-";
}

// Función para deshabilitar los botones de colores
function disableColorButtons() {
    greenButton.disabled = true;
    redButton.disabled = true;
    blueButton.disabled = true;
    yellowButton.disabled = true;
}

// Función para habilitar los botones de colores
function enableColorButtons() {
    greenButton.disabled = false;
    redButton.disabled = false;
    blueButton.disabled = false;
    yellowButton.disabled = false;
}





/* start TIMER */

let timer;
let minutes = 0;
let seconds = 0;
let isRunning = false;

// Función para iniciar el temporizador
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTimer, 1000); // Cada 1000 ms (1 segundo)
    }
}

// Función para detener el temporizador
function stopTimer() {
    isRunning = false;
    clearInterval(timer);
}

// Función para resetear el temporizador
function resetTimer() {
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    isRunning = false;
    document.getElementById('minutes').innerText = '00';
    document.getElementById('seconds').innerText = '00';
}

// Función para resetear el temporizador
function initializeTimer() {
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    isRunning = false;
    document.getElementById('minutes').innerText = '--';
    document.getElementById('seconds').innerText = '--';
}

// Función para actualizar el temporizador
function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    document.getElementById('minutes').innerText = padNumber(minutes);
    document.getElementById('seconds').innerText = padNumber(seconds);
}

// Función para rellenar con ceros a la izquierda si es necesario
function padNumber(num) {
    return num.toString().padStart(2, '0');
}

/* end TIMER */





/* start RANKING */

// Función para mostrar el modal
function gameOver() {
    // Detener el temporizador
    stopGame();
    stopTimer();

    // Guardar los resultados del juego
    saveGameResult();

    // Al finalizar el juego, actualiza el elemento del DOM con los puntajes
    updateRanking();

    // Ventana modal
    var modal = document.getElementById("game-over");

    // Cuando el usuario, se abre la ventana
    modal.style.display = "block";
}

// Función para guardar los resultados de la partida en LocalStorage
function saveGameResult() {
    const playerName = document.getElementById('player-name').value;
    const gameResult = {
        playerName: playerName,
        lightScore: lightScore,
        sequenceScore: sequenceScore,
        level: level,
        dateTime: new Date()
    };

    // Obtener el historial de juegos almacenado en LocalStorage
    let gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];

    // Agregar el resultado actual al historial
    gameHistory.push(gameResult);

    // Guardar el historial actualizado en LocalStorage
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));

    // Mensajes de registro en la consola
    console.log('Resultado de la partida guardado en LocalStorage:', gameResult);
    console.log('Historial de juegos actualizado:', gameHistory);
}

// Función para mostrar y ocultar el contenido
function toggleRanking() {
    var resultsContainer = document.getElementById('results-container');
    var boardContainer = document.getElementById('board-container');

    if (resultsContainer.style.display === 'none' || resultsContainer.style.display === '') {
        resultsContainer.style.display = 'inline-flex';
        boardContainer.style.display = 'inline-flex';
        resultsContainer.style.gridColumnStart = 1;
        resultsContainer.style.gridColumnEnd = 2;
        resultsContainer.style.gridRowStart = 2;
        resultsContainer.style.gridRowEnd = 3;
        boardContainer.style.gridColumnStart = 2;
        boardContainer.style.gridColumnEnd = 3;
        boardContainer.style.gridRowStart = 2;
        boardContainer.style.gridRowEnd = 3;
    } else {
        resultsContainer.style.display = 'none';
        boardContainer.style.display = 'inline-flex';
        boardContainer.style.gridColumnStart = 1;
        boardContainer.style.gridColumnEnd = 3;
        boardContainer.style.gridRowStart = 2;
        boardContainer.style.gridRowEnd = 3;
    }
}

// Función para actualizar el ranking
function updateRanking() {
    // Obtén el elemento de la tabla en el DOM donde deseas mostrar los puntajes
    const modalRankingsTable = document.getElementById('modal-rankings').getElementsByTagName('tbody')[0];

    // Obtén el historial de juegos almacenado en LocalStorage
    let gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];

    // Elimina todas las filas de la tabla
    while (modalRankingsTable.firstChild) {
        modalRankingsTable.removeChild(modalRankingsTable.firstChild);
    }

    // Obtén el resultado más reciente
    // const gameResult = gameHistory[gameHistory.length - 1];

    // Construir filas de la tabla con los puntajes y la fecha/hora
    gameHistory.forEach(gameResult => {
        // Construye una nueva fila para la tabla con los puntajes y la fecha/hora
        const newRow = modalRankingsTable.insertRow();

        // Inserta celdas en la fila con la información del jugador y los puntajes
        const playerNameCell = newRow.insertCell(0);
        playerNameCell.textContent = gameResult.playerName;

        const levelCell = newRow.insertCell(1);
        levelCell.textContent = gameResult.level;

        const lightScoreCell = newRow.insertCell(2);
        lightScoreCell.textContent = gameResult.lightScore;

        // Agrega celdas para la fecha y la hora
        const dateCell = newRow.insertCell(3);
        const timeCell = newRow.insertCell(4);

        // Separa la fecha y la hora
        const date = new Date(gameResult.dateTime);
        const formattedDate = `${padNumber(date.getDate())}/${padNumber(date.getMonth() + 1)}/${date.getFullYear()}`;
        const formattedTime = `${padNumber(date.getHours())}:${padNumber(date.getMinutes())}:${padNumber(date.getSeconds())}`;

        // Establece el contenido de las celdas de fecha y hora
        dateCell.textContent = formattedDate;
        timeCell.textContent = formattedTime;
    });

    // Ordena las filas de la tabla por el puntaje de luces (Light Score)
    sortTableByLightScore();
}

// Función para ordenar la tabla por el puntaje de luces (Light Score)
function sortTableByLightScore() {
    const modalRankingsTable = document.getElementById('modal-rankings');
    const tableBody = modalRankingsTable.getElementsByTagName('tbody')[0];

    // Convierte las filas de la tabla en una matriz
    const rowsArray = Array.from(tableBody.rows);

    // Ordena la matriz según el valor del puntaje de luces (segunda columna)
    rowsArray.sort((a, b) => {
        const lightScoreA = parseInt(a.cells[2].textContent);
        const lightScoreB = parseInt(b.cells[2].textContent);
        return lightScoreB - lightScoreA; // Orden descendente
    });

    // Elimina todas las filas de la tabla
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    // Agrega las filas ordenadas de nuevo a la tabla
    rowsArray.forEach(row => {
        tableBody.appendChild(row);
    });
}

// Obtén el botón para limpiar el ranking por su ID
const clearRankingButton = document.getElementById('clear-ranking-button');

// Agrega un evento de clic al botón para limpiar el ranking
clearRankingButton.addEventListener('click', clearRanking);

// Función para limpiar (eliminar) el ranking en localStorage
function clearRanking() {
    // Pregunta al usuario si realmente desea borrar el historial
    const confirmClear = confirm('Are you sure you want to clear the ranking? This action cannot be undone.');

    if (confirmClear) {
        // Limpia el historial almacenado en localStorage
        localStorage.removeItem('gameHistory');

        // Actualiza la visualización del ranking
        updateRanking();
    }
}

/* end RANKING */