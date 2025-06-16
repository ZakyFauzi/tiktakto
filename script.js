// === DOM ELEMENTS ===
const nameInputContainer = document.getElementById('name-input-container');
const startGameBtn = document.getElementById('start-game-btn');
const gameWrapper = document.getElementById('game-wrapper');
const boxes = document.querySelectorAll('.box');
const restartBtn = document.getElementById('restart');
// Modal Elements
const winModal = document.getElementById('win-modal');
const modalWinnerText = document.getElementById('modal-winner-text');
const modalRestartBtn = document.getElementById('modal-restart-btn');

// Player 1 Elements
const p1Panel = document.getElementById('player1-panel');
const p1DisplayName = document.getElementById('p1-display-name');
const p1AvatarOptions = document.getElementById('p1-avatar-options');
const p1PiecesContainer = document.getElementById('p1-pieces');

// Player 2 Elements
const p2Panel = document.getElementById('player2-panel');
const p2DisplayName = document.getElementById('p2-display-name');
const p2AvatarOptions = document.getElementById('p2-avatar-options');
const p2PiecesContainer = document.getElementById('p2-pieces');

// === GAME STATE VARIABLES ===
let players = {
    P1: { name: '', avatar: '', piecesInHand: 3 },
    P2: { name: '', avatar: '', piecesInHand: 3 }
};
let gamePhase = 'NAME_INPUT';
let currentPlayerId;
let selectedPiece = { source: null, avatar: '' };

const allAvatars = ['🍃', '🪨', '🌸'];
const winnerPattern = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// === FUNGSI NOTIFIKASI BARU ===
const showToast = (message) => {
    // Hapus toast lama jika ada
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100); // delay kecil untuk trigger transisi

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 500); // tunggu transisi selesai sebelum menghapus elemen
    }, 3000); // Toast hilang setelah 3 detik
};

const showWinModal = (winnerText) => {
    modalWinnerText.innerText = `${winnerText} MENANG!`;
    winModal.style.display = 'flex';
};

// === CORE FUNCTIONS ===
const initializeGame = () => {
    players.P1.name = document.getElementById('player1-name').value || 'Pemain 1';
    players.P2.name = document.getElementById('player2-name').value || 'Pemain 2';
    
    currentPlayerId = Math.random() < 0.5 ? 'P1' : 'P2';
    gamePhase = 'AVATAR_SELECT';
    updateUI();
};

const updateUI = () => {
    if (gamePhase === 'NAME_INPUT') {
        nameInputContainer.style.display = 'block';
        gameWrapper.style.display = 'none';
    } else {
        nameInputContainer.style.display = 'none';
        gameWrapper.style.display = 'flex';
        p1DisplayName.innerText = players.P1.name;
        p2DisplayName.innerText = players.P2.name;
    }

    if (gamePhase === 'AVATAR_SELECT') {
        showToast(`Giliran ${players[currentPlayerId].name} memilih avatar.`);
        toggleAvatarButtons(currentPlayerId, true);
        toggleAvatarButtons(currentPlayerId === 'P1' ? 'P2' : 'P1', false);
    }
    
    if (gamePhase === 'GAME_PLAY') {
        p1AvatarOptions.style.display = 'none';
        p2AvatarOptions.style.display = 'none';
        p1Panel.querySelector('p').style.display = 'none';
        p2Panel.querySelector('p').style.display = 'none';
        showToast(`Giliran ${players[currentPlayerId].name} (${players[currentPlayerId].avatar})`);
    }
};

const handleAvatarSelect = (playerId, avatar) => {
    if (gamePhase !== 'AVATAR_SELECT' || playerId !== currentPlayerId) return;
    players[playerId].avatar = avatar;
    createPlayerPieces(playerId, avatar);

    const otherPlayerId = (playerId === 'P1') ? 'P2' : 'P1';
    document.querySelectorAll(`#${otherPlayerId.toLowerCase()}-avatar-options .avatar-btn`).forEach(btn => {
        if (btn.innerText === avatar) btn.disabled = true;
    });

    currentPlayerId = otherPlayerId;
    if (players.P1.avatar && players.P2.avatar) {
        gamePhase = 'GAME_PLAY';
        currentPlayerId = Math.random() < 0.5 ? 'P1' : 'P2';
    }
    updateUI();
};

const createPlayerPieces = (playerId, avatar) => {
    const container = (playerId === 'P1') ? p1PiecesContainer : p2PiecesContainer;
    container.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const pieceBtn = document.createElement('button');
        pieceBtn.classList.add('piece-btn');
        pieceBtn.innerText = avatar;
        pieceBtn.dataset.playerId = playerId;
        pieceBtn.addEventListener('click', () => handlePieceSelection('hand', pieceBtn));
        container.appendChild(pieceBtn);
    }
};

const handlePieceSelection = (source, element) => {
    if (gamePhase !== 'GAME_PLAY' || element.dataset.playerId !== currentPlayerId) return;
    clearSelections();
    selectedPiece = { source, avatar: element.innerText, element };
    element.classList.add('selected');
    showToast(`${players[currentPlayerId].name}, letakkan bidak di kotak kosong.`);
};

const handleBoardClick = (box) => {
    if (gamePhase !== 'GAME_PLAY' || !selectedPiece.source || box.innerText !== '') return;
    box.innerText = selectedPiece.avatar;
    box.dataset.playerId = currentPlayerId;
    if (selectedPiece.source === 'hand') selectedPiece.element.disabled = true;
    else if (selectedPiece.source === 'board') {
        selectedPiece.element.innerText = '';
        delete selectedPiece.element.dataset.playerId;
    }
    clearSelections();
    if (!checkWinner()) switchTurn();
};

const switchTurn = () => {
    currentPlayerId = (currentPlayerId === 'P1') ? 'P2' : 'P1';
    showToast(`Giliran ${players[currentPlayerId].name} (${players[currentPlayerId].avatar})`);
};

const checkWinner = () => {
    for (let pattern of winnerPattern) {
        const [a, b, c] = pattern;
        if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
            gamePhase = 'GAME_OVER';
            showWinModal(players[currentPlayerId].name);
            return true;
        }
    }
    return false;
};

const clearSelections = () => {
    document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
    selectedPiece = { source: null, avatar: '' };
};

const resetGame = () => {
    window.location.reload();
};

const toggleAvatarButtons = (playerId, enabled) => {
    const options = (playerId === 'P1') ? p1AvatarOptions : p2AvatarOptions;
    options.querySelectorAll('.avatar-btn').forEach(btn => {
        if (!btn.disabled) {
            btn.style.cursor = enabled ? 'pointer' : 'not-allowed';
            btn.style.opacity = enabled ? '1' : '0.5';
        }
    });
    const avatarButtons = document.querySelectorAll(`#${playerId.toLowerCase()}-avatar-options .avatar-btn`);
    avatarButtons.forEach(btn => {
        btn.onclick = enabled ? () => handleAvatarSelect(playerId, btn.innerText) : null;
    });
};

// === EVENT LISTENERS INITIALIZATION ===
startGameBtn.addEventListener('click', initializeGame);
restartBtn.addEventListener('click', resetGame);
modalRestartBtn.addEventListener('click', resetGame);

boxes.forEach(box => {
    box.addEventListener('click', () => {
        if (box.innerText !== '' && selectedPiece.source === null) handlePieceSelection('board', box);
        else if (box.innerText === '' && selectedPiece.source !== null) handleBoardClick(box);
    });
});

updateUI();