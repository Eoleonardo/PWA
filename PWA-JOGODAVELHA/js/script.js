let currentPlayer = 'X'; // Define o jogador atual como 'X' no início do jogo.
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Inicializa o tabuleiro vazio com 9 células.
let gameOver = false; // Inicializa o jogo como não encerrado.

function makeMove(cell) {
    const index = Array.from(cell.parentElement.children).indexOf(cell); // Obtém o índice da célula clicada.

    if (!gameOver && gameBoard[index] === '') { // Verifica se o jogo não acabou e a célula está vazia.
        const img = document.createElement('img'); // Cria um elemento de imagem.
        img.src = currentPlayer === 'X' ? './images/X.png' : './images/O.png'; // Define a imagem com base no jogador atual.
        img.alt = currentPlayer; // Define o atributo 'alt' da imagem com o jogador atual.
        cell.appendChild(img); // Adiciona a imagem à célula clicada.
        gameBoard[index] = currentPlayer; // Atualiza o estado do tabuleiro com a jogada.
        checkWinner(); // Verifica se há um vencedor após a jogada.
        togglePlayer(); // Alterna para o próximo jogador.
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Alterna entre os jogadores 'X' e 'O'.
    document.getElementById('status').textContent = `Vez do Jogador ${currentPlayer}`; // Atualiza a mensagem de status.
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]; // Define as combinações vencedoras no jogo da velha.

    for (const combo of winningCombos) { // Itera pelas combinações vencedoras.
        const [a, b, c] = combo; // Obtém os índices das células na combinação.
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            // Verifica se as células na combinação têm o mesmo valor (X ou O).
            document.getElementById('status').textContent = `Jogador ${currentPlayer} venceu!`;
            gameOver = true;
            highlightWinningSquares(combo); // Destaca as células vencedoras.
            showWinMessage(`Jogador ${currentPlayer} venceu!`); // Exibe mensagem de vitória.
            return;
        }
    }

    if (!gameBoard.includes('')) { // Verifica se todas as células foram preenchidas (empate).
        document.getElementById('status').textContent = 'Empate!';
        gameOver = true;
        showWinMessage('Empate!'); // Exibe mensagem de empate.
    }
}

function highlightWinningSquares(winningCombo) {
    for (const index of winningCombo) {
        document.querySelector(`.cell:nth-child(${index + 1})`).classList.add('winner');
        // Adiciona a classe 'winner' às células vencedoras para destacá-las.
    }
}

function showWinMessage(message) {
    const winMessage = document.getElementById('win-message');
    winMessage.textContent = message; // Define o texto da mensagem de vitória.
    winMessage.style.display = 'block'; // Exibe a mensagem de vitória.
}

function resetGame() {
    currentPlayer = 'X'; // Reinicia o jogador atual como 'X'.
    gameBoard = ['', '', '', '', '', '', '', '', '']; // Reinicia o tabuleiro vazio.
    gameOver = false; // Reinicia o jogo como não encerrado.

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = ''; // Remove o conteúdo das células.
        cell.classList.remove('winner'); // Remove a classe 'winner' das células.
    });

    const winMessage = document.getElementById('win-message');
    winMessage.style.display = 'none'; // Oculta a mensagem de vitória.

    document.getElementById('status').textContent = 'Vez do Jogador X'; // Atualiza a mensagem de status.
}

document.getElementById('status').textContent = 'Vez do Jogador X'; // Define a mensagem de status inicial.
