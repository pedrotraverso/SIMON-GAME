// Obtener los elementos del DOM por sus identificadores
const playerNameInput = document.getElementById("player-name");

const levelNumber = document.getElementById("level-number");
const lightScorePoints = document.getElementById("light-score-points");
const sequenceScorePoints = document.getElementById("sequence-score-points");
const timerMinutes = document.getElementById("minutes");
const timerSeconds = document.getElementById("seconds");

const logo = document.getElementById("logo");

const turnOnButton = document.getElementById("turn-on-button");
const turnOffButton = document.getElementById("turn-off-button");
const playRestartButton = document.getElementById("play-restart-button");
const playIcon = document.getElementById("play-icon");
const restartIcon = document.getElementById("restart-icon");

const greenButton = document.getElementById("green-button");
const redButton = document.getElementById("red-button");
const blueButton = document.getElementById("blue-button");
const yellowButton = document.getElementById("yellow-button");

const modal = document.getElementById("game-over-container");

// Array que contiene los identificadores de los botones de colores
const colorButtons = ["green-button", "red-button", "blue-button", "yellow-button"];

// Array para almacenar la secuencia del juego
let gameSequence = [];

// Array para almacenar la secuencia del jugador
let playerSequence = [];

// Variable para almacenar el nivel actual del juego
let level = 1;

// Variable para almacenar el puntaje de las luces
let lightScore = 0;

// Variable para almacenar el puntaje de la secuencia
let sequenceScore = 0;

// Establecer el estilo inicial del filtro del logo para que tenga opacidad
logo.style.filter = "opacity(60%)";

// Configurar los estilos iniciales de la visibilidad de los botones
turnOnButton.style.display = "inline";
turnOffButton.style.display = "none";
playRestartButton.style.display = "none";
playIcon.style.display = "none";
restartIcon.style.display = "none";

// Configurar los estilos iniciales del color de los botones de colores
greenButton.style.background = "radial-gradient(circle, #2f2f2f 35%, #000000 100%)";
redButton.style.background = "radial-gradient(circle, #2f2f2f 35%, #000000 100%)";
blueButton.style.background = "radial-gradient(circle, #2f2f2f 35%, #000000 100%)";
yellowButton.style.background = "radial-gradient(circle, #2f2f2f 35%, #000000 100%)";

// Deshabilitar los botones de colores
disableLightButtons();

// Eliminar las escuchas de los eventos clic de los botones anteriores para evitar duplicados
turnOnButton.removeEventListener("click", powerGame);
turnOffButton.removeEventListener("click", exitGame);
playRestartButton.removeEventListener("click", startGame);
playRestartButton.removeEventListener("click", restartGame);

// Agregar una escucha del evento clic al botón para encender el juego
turnOnButton.addEventListener("click", powerGame);

// Función para encender el juego
function powerGame() {
    // Habilitar la opción de ingresar el nombre del jugador
    playerNameInput.disabled = false;

    stopGame();

    // Establecer el estilo del filtro del logo para que no tenga ninguna opacidad
    logo.style.filter = "none";

    // Configurar los estilos de la visibilidad de los botones
    turnOnButton.style.display = "none";
    turnOffButton.style.display = "inline";
    playRestartButton.style.display = "inline";
    playIcon.style.display = "inline";
    restartIcon.style.display = "none";

    // Configurar los estilos del color de fondo de los botones de colores
    greenButton.style.background = "radial-gradient(circle, rgb(0, 128, 0) 35%, #000000 100%)";
    redButton.style.background = "radial-gradient(circle, rgb(192, 0, 0) 35%, #000000 100%)";
    blueButton.style.background = "radial-gradient(circle, rgb(0, 0, 192) 35%, #000000 100%)";
    yellowButton.style.background = "radial-gradient(circle, rgb(192, 192, 0) 35%, #000000 100%)";

    // Deshabilitar los botones de colores
    disableLightButtons();

    // Mostrar el número de nivel inicial en el elemento HTML
    levelNumber.textContent = "1";

    // Mostrar el número de light score inicial en el elemento HTML
    lightScorePoints.textContent = "0";

    // Mostrar el número de sequence score inicial en el elemento HTML
    sequenceScorePoints.textContent = "0";

    // Mostrar el número de minutos del timer inicial en el elemento HTML
    timerMinutes.textContent = "00";

    // Mostrar el número de segundos del timer inicial en el elemento HTML
    timerSeconds.textContent = "00";

    // Agregar el título del botón para que lo muestre en pantalla al pasar el ratón por encima
    playRestartButton.title = "Play";

    // Eliminar la escucha del evento clic del botón anterior para evitar duplicados
    turnOnButton.removeEventListener("click", powerGame);

    // Agregar las escuchas de los eventos clic a los botones
    turnOffButton.addEventListener("click", exitGame);
    playRestartButton.addEventListener("click", startGame);
}

// Función para salir del juego
function exitGame() {
    // Cerrar la ventana de fin de juego
    modal.style.display = "none";

    if (isGameActive) {
        // Guardar los resultados de la partida actual si el juego está activo
        saveGameResults();

        // Actualizar la tabla con los resultados actuales si el juego está activo
        updateHighScores();
    }

    stopGame();

    // Inicializar el temporizador y los puntajes
    initializeTimer();
    initializeLevel();
    initializeLightScore();
    initializeSequenceScore();

    // Establecer el estilo del filtro del logo para que tenga opacidad
    logo.style.filter = "opacity(60%)";

    // Configurar los estilos de la visibilidad de los botones
    turnOnButton.style.display = "inline";
    turnOffButton.style.display = "none";
    playRestartButton.style.display = "none";
    playIcon.style.display = "none";
    restartIcon.style.display = "none";

    // Configurar los estilos del color de los botones de colores
    greenButton.style.background = "radial-gradient(circle, #2f2f2f 35%, #000000 100%)";
    redButton.style.background = "radial-gradient(circle, #2f2f2f 35%, #000000 100%)";
    blueButton.style.background = "radial-gradient(circle, #2f2f2f 35%, #000000 100%)";
    yellowButton.style.background = "radial-gradient(circle, #2f2f2f 35%, #000000 100%)";

    // Restablecer el nombre del jugador y deshabilitar la opción de ingresar el nombre del jugador
    playerNameInput.value = "";
    playerNameInput.disabled = true;

    // Deshabilitar los botones de colores
    disableLightButtons();;

    // Eliminar la escucha del evento clic del botón anterior para evitar duplicados
    turnOffButton.removeEventListener("click", exitGame);

    // Agregar una escucha del evento clic al botón
    turnOnButton.addEventListener("click", powerGame);
}

let isGameActive = true;

// Función para iniciar la partida
function startGame() {
    // Obtener el valor ingresado del elemento nombre del jugador del DOM por su identificador
    const playerNameValue = document.getElementById("player-name").value;

    // Verificar que el nombre del jugador tenga al menos 3 letras
    if (playerNameValue.length < 3) {
        alert("Please enter a name with at least 3 letters.");
        return;
    }

    // Configurar los estilos de la visibilidad de los botones
    turnOnButton.style.display = "none";
    turnOffButton.style.display = "inline";
    playRestartButton.style.display = "inline";
    playIcon.style.display = "none";
    restartIcon.style.display = "inline";

    // Habilitar los botones de colores
    enableLightButtons();

    isGameActive = true;

    // Deshabilitar la opción de ingresar el nombre del jugador
    playerNameInput.disabled = true;

    // Generar la secuencia
    generateSequence();

    // Reproducir la secuencia
    playSequence();

    // Iniciar el temporizador
    startTimer();

    // Agregar el título del botón para que lo muestre en pantalla al pasar el ratón por encima
    playRestartButton.title = "Restart";

    // Eliminar la escucha del evento clic del botón anterior para evitar duplicados
    playRestartButton.removeEventListener("click", startGame);

    // Agregar las escuchas de los eventos clic a los botones
    turnOffButton.addEventListener("click", exitGame);
    playRestartButton.addEventListener("click", restartGame);
}

// Función para iniciar una nueva partida
function restartGame() {
    // Cerrar la ventana de fin de juego
    modal.style.display = "none";

    if (isGameActive) {
        // Guardar los resultados de la partida actual si el juego está activo
        saveGameResults();

        // Actualizar la tabla con los resultados actuales si el juego está activo
        updateHighScores();
    }

    stopGame();

    // Restablecer las variables del juego
    gameSequence = [];
    playerSequence = [];
    level = 1;
    lightScore = 0;
    sequenceScore = 0;

    // Restablecer el puntaje de las luces
    updateLightScore();

    // Restablecer el puntaje de la secuencia
    updateSequenceScore();

    // Restablecer el temporizador
    resetTimer();

    // Habilitar los botones de colores
    enableLightButtons();

    // Agregar el título del botón para que lo muestre en pantalla al pasar el ratón por encima
    playRestartButton.title = "Play";

    // Eliminar la escucha del evento clic del botón anterior para evitar duplicados
    playRestartButton.removeEventListener("click", restartGame);

    // Agregar las escuchas de los eventos clic a los botones
    turnOffButton.addEventListener("click", exitGame);
    playRestartButton.addEventListener("click", startGame);

    // Encender el juego
    powerGame();
}

// Función para detener el juego
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

// Función para manejar el clic en los botones de colores
function handleLightButtonClick(buttonIndex) {
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

// Función para verificar si la secuencia del jugador coincide con la secuencia actual generada
function checkSequence() {
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== gameSequence[i]) {
            return false;
        }
    }
    return true;
}

// Función para iluminar un botón de color
function lightUpButton(buttonIndex) {
    const buttons = [greenButton, redButton, blueButton, yellowButton];
    buttons[buttonIndex].classList.add("light-button-active");
    setTimeout(() => {
        buttons[buttonIndex].classList.remove("light-button-active");
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

    // Agrega la siguiente línea para actualizar el nivel en pantalla
    updateLevel();
}

// Función para actualizar el puntaje de las luces
function updateLightScore() {
    lightScorePoints.textContent = `${lightScore}`;
}

// Función para inicializar el puntaje de las luces
function initializeLightScore() {
    lightScorePoints.textContent = "-";
}

// Función para actualizar el puntaje de las secuencias
function updateSequenceScore() {
    sequenceScorePoints.textContent = `${sequenceScore}`;
}

// Función para inicializar el puntaje de las secuencias
function initializeSequenceScore() {
    sequenceScorePoints.textContent = "-";
}

// Función para actualizar el nivel del juego
function updateLevel() {
    levelNumber.textContent = `${level}`;
}

// Función para inicializar el nivel del juego
function initializeLevel() {
    levelNumber.textContent = "-";
}

// Función para deshabilitar los botones de colores
function disableLightButtons() {
    greenButton.disabled = true;
    redButton.disabled = true;
    blueButton.disabled = true;
    yellowButton.disabled = true;

    // Agregar la clase "light-button-disabled" a los botones desactivados
    greenButton.classList.add("light-button-disabled");
    redButton.classList.add("light-button-disabled");
    blueButton.classList.add("light-button-disabled");
    yellowButton.classList.add("light-button-disabled");
}

// Función para habilitar los botones de colores
function enableLightButtons() {
    greenButton.disabled = false;
    redButton.disabled = false;
    blueButton.disabled = false;
    yellowButton.disabled = false;

    // Eliminar la clase "light-button-disabled" de los botones habilitados
    greenButton.classList.remove("light-button-disabled");
    redButton.classList.remove("light-button-disabled");
    blueButton.classList.remove("light-button-disabled");
    yellowButton.classList.remove("light-button-disabled");
}

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

// Función para restablecer el temporizador
function resetTimer() {
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    isRunning = false;
    timerMinutes.innerText = "00";
    timerSeconds.innerText = "00";
}

// Función para inicializar el temporizador
function initializeTimer() {
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    isRunning = false;
    timerMinutes.innerText = "--";
    timerSeconds.innerText = "--";
}

// Función para actualizar el temporizador
function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    timerMinutes.innerText = padNumber(minutes);
    timerSeconds.innerText = padNumber(seconds);
}

// Función para rellenar con ceros a la izquierda en caso de ser necesario
function padNumber(num) {
    return num.toString().padStart(2, "0");
}

// Función de fin de juego
function gameOver() {
    // Detener el juego
    stopGame();

    // Detener el temporizador
    stopTimer();

    // Guardar los resultados del juego
    saveGameResults();

    // Actualizar la tabla con los resultados guardados del juego
    updateHighScores();

    // Mostrar la ventana de fin de juego
    modal.style.display = "block";
}

// Función para guardar los resultados del juego localmente (localStorage)
function saveGameResults() {
    // Obtener el valor ingresado del elemento nombre del jugador del DOM por su identificador
    const playerNameValue = document.getElementById("player-name").value;

    // Crear un objeto con los resultados del juego
    const gameResult = {
        playerName: playerNameValue,
        lightScore: lightScore,
        sequenceScore: sequenceScore,
        level: level,
        dateTime: new Date()
    };

    // Obtener el historial de juegos almacenados en localStorage
    let gameHistory = JSON.parse(localStorage.getItem("gameHistory")) || [];

    // Agregar los resultados actuales al historial
    gameHistory.push(gameResult);

    // Guardar el historial actualizado en localStorage
    localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
}

// Función para mostrar y ocultar la ventana con la tabla de máximos puntajes
function handleHighScores() {
    // Obtener los elementos del DOM necesarios por su identificador
    const highScoresContainer = document.getElementById("high-scores-container");
    const mainContainer = document.getElementById("main-container");

    // Obtener el tamaño de la ventana
    const windowWidth = window.innerWidth;

    if (windowWidth <= 1242) {
        // Para pantalla de dispositivo móvil, verificar si la ventana con la tabla de máximos puntajes está visible u oculta
        if (highScoresContainer.style.display === "none" || highScoresContainer.style.display === "") {
            // Mostrar la ventana con la tabla de máximos puntajes y ajustar estilos
            highScoresContainer.style.display = "inline-flex";
            mainContainer.style.display = "none";
            highScoresContainer.style.gridRowStart = 2;
            highScoresContainer.style.gridRowEnd = 3;
            highScoresContainer.style.gridColumnStart = 1;
            highScoresContainer.style.gridColumnEnd = 2;
        } else {
            // Ocultar la ventana con la tabla de máximos puntajes y ajustar estilos
            highScoresContainer.style.display = "none";
            mainContainer.style.display = "inline-flex";
            mainContainer.style.gridRowStart = 2;
            mainContainer.style.gridRowEnd = 3;
            mainContainer.style.gridColumnStart = 1;
            mainContainer.style.gridColumnEnd = 2;
        }
    } else {
        // Para otras pantallas, verificar si la ventana con la tabla de máximos puntajes está visible u oculta
        if (highScoresContainer.style.display === "none" || highScoresContainer.style.display === "") {
            // Mostrar la ventana con la tabla de máximos puntajes y ajustar estilos
            highScoresContainer.style.display = "inline-flex";
            mainContainer.style.display = "inline-flex";
            highScoresContainer.style.gridRowStart = 2;
            highScoresContainer.style.gridRowEnd = 3;
            highScoresContainer.style.gridColumnStart = 1;
            highScoresContainer.style.gridColumnEnd = 2;
            mainContainer.style.gridRowStart = 2;
            mainContainer.style.gridRowEnd = 3;
            mainContainer.style.gridColumnStart = 2;
            mainContainer.style.gridColumnEnd = 3;
        } else {
            // Ocultar la ventana con la tabla de máximos puntajes y ajustar estilos
            highScoresContainer.style.display = "none";
            mainContainer.style.display = "inline-flex";
            mainContainer.style.gridRowStart = 2;
            mainContainer.style.gridRowEnd = 3;
            mainContainer.style.gridColumnStart = 1;
            mainContainer.style.gridColumnEnd = 3;
        }
    }
}

// Función para actualizar la tabla de máximos puntajes
function updateHighScores() {
    // Obtener el elemento de la tabla de máximos puntajes en el DOM por su identificador donde se desea mostrar los resultados
    const highScoresTable = document.getElementById("high-scores-table");
    const tableBody = highScoresTable.getElementsByTagName("tbody")[0];

    // Obtener el historial de juegos almacenados en localStorage
    let gameHistory = JSON.parse(localStorage.getItem("gameHistory")) || [];

    // Eliminar todas las filas de la tabla
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    // Crear las filas y las celdas de la tabla
    gameHistory.forEach(gameResult => {
        // Insertar una nueva fila en la tabla con el nombre del jugador, el nivel, el puntaje de luces, la fecha y la hora
        const newRow = tableBody.insertRow();

        // Insertar una celda en la fila para el nombre del jugador
        const playerNameCell = newRow.insertCell(0);
        // Establecer el contenido de la celda con el resultado del nombre del jugador
        playerNameCell.textContent = gameResult.playerName;

        // Insertar una celda en la fila para el nivel
        const levelCell = newRow.insertCell(1);
        // Establecer el contenido de la celda con el resultado del nivel
        levelCell.textContent = gameResult.level;

        // Insertar una celda en la fila para el puntaje de luces
        const lightScoreCell = newRow.insertCell(2);
        // Establecer el contenido de la celda con el resultado del puntaje de luces
        lightScoreCell.textContent = gameResult.lightScore;

        // Insertar una celda en la fila para la fecha
        const dateCell = newRow.insertCell(3);

        // Insertar una celda en la fila para la hora
        const timeCell = newRow.insertCell(4);

        // Separar la fecha y la hora en el formato correspondiente
        const date = new Date(gameResult.dateTime);
        const formattedDate = `${padNumber(date.getDate())}/${padNumber(date.getMonth() + 1)}/${date.getFullYear()}`;
        const formattedTime = `${padNumber(date.getHours())}:${padNumber(date.getMinutes())}:${padNumber(date.getSeconds())}`;

        // Establecer el contenido de la celda con el resultado de la fecha
        dateCell.textContent = formattedDate;

        // Establecer el contenido de la celda con el resultado de la hora
        timeCell.textContent = formattedTime;
    });

    // Ordenar las filas de la tabla por el puntaje de luces
    sortTableByLightScore();
}

// Función para ordenar la tabla por el puntaje de luces
function sortTableByLightScore() {
    // Obtener el elemento de la tabla de máximos puntajes en el DOM por su identificador
    const highScoresTable = document.getElementById("high-scores-table");
    const tableBody = highScoresTable.getElementsByTagName("tbody")[0];

    // Convertir las filas de la tabla en una matriz
    const rowsArray = Array.from(tableBody.rows);

    // Ordenar la matriz según el valor del puntaje de luces (tercera columna)
    rowsArray.sort((a, b) => {
        const lightScoreA = parseInt(a.cells[2].textContent);
        const lightScoreB = parseInt(b.cells[2].textContent);
        return lightScoreB - lightScoreA; // Orden descendente
    });

    // Eliminar todas las filas de la tabla
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    // Agregar las filas ordenadas a la tabla
    rowsArray.forEach(row => {
        tableBody.appendChild(row);
    });
}

// Obtener el elemento del botón para eliminar (limpiar) la tabla de máximos puntajes
const deleteHighScoresButton = document.getElementById("delete-high-scores-button");

// Agregar una escucha del evento clic al botón para eliminar (limpiar) la tabla de máximos puntajes
deleteHighScoresButton.addEventListener("click", deleteHighScores);

// Función para eliminar (limpiar) la tabla de máximos puntajes en localStorage
function deleteHighScores() {
    // Preguntar al usuario si realmente desea eliminar el historial
    const confirmClear = confirm("Are you sure you want to clear the table with high scores? This action cannot be undone.");

    if (confirmClear) {
        // Eliminar el historial almacenado en localStorage
        localStorage.removeItem("gameHistory");

        // Actualizar la visualización de la tabla de máximos puntajes
        updateHighScores();
    }
}