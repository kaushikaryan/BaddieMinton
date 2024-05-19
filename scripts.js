// Define states
const states = {
    START: 'Start',
    PLAYER_A1_SERVES: 'Player A1 Serves',
    PLAYER_A2_SERVES: 'Player A2 Serves',
    PLAYER_B1_SERVES: 'Player B1 Serves',
    PLAYER_B2_SERVES: 'Player B2 Serves',
    GAME_OVER: 'Game Over'
};

// Initialize state and scores
let currentState = states.START;
let scores = { team1: 0, team2: 0 };
let serving = 'Player1'; // Initially, Player1 is serving

// DOM elements
const scoreTeam1 = document.getElementById('score-team1');
const scoreTeam2 = document.getElementById('score-team2');
const dotPlayer1 = document.getElementById('dot-Player1');
const dotPlayer2 = document.getElementById('dot-Player2');
const dotPlayer3 = document.getElementById('dot-Player3');
const dotPlayer4 = document.getElementById('dot-Player4');

// Update the server dot visibility based on current server
function updateServerDot() {
    dotPlayer1.style.visibility = serving === 'odd1' ? 'visible' : 'hidden';
    dotPlayer2.style.visibility = serving === 'even1' ? 'visible' : 'hidden';
    dotPlayer3.style.visibility = serving === 'even2' ? 'visible' : 'hidden';
    dotPlayer4.style.visibility = serving === 'odd2' ? 'visible' : 'hidden';
}

// Start the game
function startGame() {
    currentState = states.PLAYER_A2_SERVES;
    serving = 'even1';
    updateServerDot();
    scores.team1 = 0;
    scores.team2 = 0;
    scoreTeam1.innerText = scores.team1;
    scoreTeam2.innerText = scores.team2;
}

// Check if the game should end
function checkGameEnd() {
    if ((scores.team1 >= 21 || scores.team2 >= 21) && Math.abs(scores.team1 - scores.team2) >= 2) {
        currentState = states.GAME_OVER;
        alert('Game Over');
    }
}

// Update the score and transition states based on who won the point
function pointWonBy(currTeam) {
    if (currentState === states.GAME_OVER) return;

    if (currTeam === 'team1') {
        scores.team1++;
        scoreTeam1.innerText = scores.team1;
        if (currentState === states.PLAYER_A1_SERVES) {
            currentState = states.PLAYER_A1_SERVES;
            checkServerInTeam('team1');
            // swapPlayers('team1');
        } else if (currentState === states.PLAYER_A2_SERVES) {
            currentState = states.PLAYER_A2_SERVES;
            checkServerInTeam('team1');
            // swapPlayers('team1');
        } else if (currentState === states.PLAYER_B1_SERVES) {
            currentState = states.PLAYER_A1_SERVES;
            checkServerInTeam('team1');
        } else if (currentState === states.PLAYER_B2_SERVES) {
            currentState = states.PLAYER_A2_SERVES;
            checkServerInTeam('team1');
        }
    } else {
        scores.team2++;
        scoreTeam2.innerText = scores.team2;
        if (currentState === states.PLAYER_B1_SERVES) {
            currentState = states.PLAYER_B1_SERVES;
            checkServerInTeam('team2');
        } else if (currentState === states.PLAYER_B2_SERVES) {
            currentState = states.PLAYER_B2_SERVES;
            checkServerInTeam('team2');
        } else if (currentState === states.PLAYER_A1_SERVES) {
            currentState = states.PLAYER_B1_SERVES;
            checkServerInTeam('team2');
        } else if (currentState === states.PLAYER_A2_SERVES) {
            currentState = states.PLAYER_B2_SERVES;
            checkServerInTeam('team2');
        }
    }
    updateServerDot();
    checkGameEnd();
}

function checkServerInTeam(team){
    if(team === 'team1'){
        if(scores.team1%2==0){
            serving = 'even1';
        } else {
            serving = 'odd1';
        }
    } else {
        if(scores.team2%2==0){
            serving = 'even2';
        } else {
            serving = 'odd2';
        }
    }
}

// Swap players within the same team
function swapPlayers(team) {
    const leftPlayer = document.getElementById(`${team}Left`).innerText;
    const rightPlayer = document.getElementById(`${team}Right`).innerText;
    document.getElementById(`${team}Left`).innerText = rightPlayer;
    document.getElementById(`${team}Right`).innerText = leftPlayer;
    updateServerDot();
}

// Increment score for Team 1
function incrementTeam1() {
        pointWonBy('team1');
}

// Increment score for Team 2
function incrementTeam2() {
        pointWonBy('team2');
}

// Initialize the game
startGame();
