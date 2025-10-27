// ----------------------------------------------------
// FUNCIONES DE ELECCIÓN
// ----------------------------------------------------

/**
 * Genera y devuelve una elección aleatoria de la computadora: "piedra", "papel" o "tijera".
 * @returns {string} La elección de la computadora.
 */
function getComputerChoice() {
    const choices = ["piedra", "papel", "tijera"];
    // Genera un índice aleatorio (0, 1 o 2)
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

/**
 * Solicita la elección del usuario mediante un prompt y la sanitiza.
 * @returns {string | null} La elección del usuario en minúsculas, o null si cancela.
 */
function getHumanChoice() {
    let choice = prompt("Introduzca su elección para la ronda: Piedra, Papel o Tijera");
    
    // Maneja la cancelación del usuario o entrada vacía
    if (choice === null || choice.trim() === "") {
        return null;
    }
    
    // Aseguramos que la entrada sea case-insensitive (minúsculas)
    return choice.toLowerCase().trim();
}

// ----------------------------------------------------
// FUNCIÓN playRound
// ----------------------------------------------------

/**
 * Juega una sola ronda de Piedra, Papel o Tijera y determina el ganador.
 * @param {string} humanChoice - La elección del jugador (ya en minúsculas).
 * @param {string} computerChoice - La elección de la computadora.
 * @returns {number | null} 1 si gana el humano, 0 si gana la computadora, o null si es empate.
 */
function playRound(humanChoice, computerChoice) {
    const human = humanChoice; // Ya está en minúsculas
    const computer = computerChoice;
    let resultMessage = "";
    let winner = null; // null: empate, 0: computadora, 1: humano

    // Lógica de desempate
    if (human === computer) {
        resultMessage = `¡Ronda ${window.i}: Es un empate! Ambos eligieron ${human}.`;
    } 
    // Lógica para victoria del jugador
    else if (
        (human === "piedra" && computer === "tijera") ||
        (human === "papel" && computer === "piedra") ||
        (human === "tijera" && computer === "papel")
    ) {
        winner = 1; // Humano gana
        resultMessage = `¡Ronda ${window.i}: Ganaste! ${human} le gana a ${computer}.`;
    } 
    // Lógica para derrota del jugador (victoria de la computadora)
    else {
        winner = 0; // Computadora gana
        resultMessage = `¡Ronda ${window.i}: Perdiste! ${computer} le gana a ${human}.`;
    }

    console.log(resultMessage);
    
    return winner;
}

// ----------------------------------------------------
// FUNCIÓN FINAL (Declaración de Ganador)
// ----------------------------------------------------

/**
 * Declara el ganador final del juego.
 * @param {number} finalHumanScore - Puntaje final del humano.
 * @param {number} finalComputerScore - Puntaje final de la computadora.
 */
function declareWinner(finalHumanScore, finalComputerScore) {
    console.log("\n=====================================");
    console.log("--- RESULTADO FINAL DEL JUEGO ---");
    console.log(`Humano: ${finalHumanScore} | Computadora: ${finalComputerScore}`);
    
    if (finalHumanScore > finalComputerScore) {
        console.log("¡GANASTE EL JUEGO! Eres el campeón.");
    } else if (finalComputerScore > finalHumanScore) {
        console.log("¡PERDISTE EL JUEGO! La computadora es superior.");
    } else {
        console.log("¡EMPATE GENERAL! Gran batalla.");
    }
    console.log("=====================================");
}


// ----------------------------------------------------
// FUNCIÓN PRINCIPAL DEL JUEGO: JUGAR 5 RONDAS
// ----------------------------------------------------

/**
 * Ejecuta 5 rondas del juego, mantiene el puntaje y declara el ganador final.
 */
function playGame() {
    // Las variables de puntaje se declaran aquí y se mantienen durante todo el juego
    let humanScore = 0;
    let computerScore = 0;
    const numRounds = 5;
    
    console.log("=====================================");
    console.log("¡Comienza el juego de Piedra, Papel o Tijera!");
    console.log(`Se jugarán ${numRounds} rondas.`);
    console.log("=====================================");

    // Bucle para jugar 5 rondas
    for (let i = 1; i <= numRounds; i++) {
        // Hacemos 'i' disponible globalmente para usarla en 'playRound'
        window.i = i; 
        
        const hChoice = getHumanChoice();
        
        // Si el usuario cancela, rompemos el juego
        if (hChoice === null) {
            console.log("--- Juego cancelado. Fin de la sesión. ---");
            break; 
        }

        const cChoice = getComputerChoice();

        // Jugar la ronda y obtener el resultado
        const roundWinner = playRound(hChoice, cChoice); 
        
        // Actualizar puntajes basado en el resultado de playRound
        if (roundWinner === 1) {
            humanScore++;
        } else if (roundWinner === 0) {
            computerScore++;
        }
        
        console.log(`PUNTAJE ACUMULADO: Humano: ${humanScore} | Computadora: ${computerScore}`);
        console.log("-------------------------------------");

        // Si esta es la última ronda, declaramos el ganador
        if (i === numRounds) {
            declareWinner(humanScore, computerScore);
        }
    }
}


// INICIAR EL JUEGO
playGame();
