// Define states
const states = {
    START: 'Start',
    TEAM1_SERVES: 'Team 1 Serves',
    TEAM2_SERVES: 'Team 2 Serves',
    GAME_OVER: 'Game Over'
};

// Initialize state and scores
let currentState = states.START;
let scores = { team1: 0, team2: 0 };
let serving = 'even1'; // Initially, Player1 is serving

// DOM elements
const scoreTeam1 = document.getElementById('score-team1');
const scoreTeam2 = document.getElementById('score-team2');
const dotPlayer1 = document.getElementById('dot-Player1');
const dotPlayer2 = document.getElementById('dot-Player2');
const dotPlayer3 = document.getElementById('dot-Player3');
const dotPlayer4 = document.getElementById('dot-Player4');

// Update the server dot visibility based on current server
function updateServerDot() {
    shuttlePlayer1.style.visibility = serving === 'odd1' ? 'visible' : 'hidden';
    shuttleplayer2.style.visibility = serving === 'even1' ? 'visible' : 'hidden';
    shuttleplayer3.style.visibility = serving === 'even2' ? 'visible' : 'hidden';
    shuttleplayer4.style.visibility = serving === 'odd2' ? 'visible' : 'hidden';
}

// Start the game
function startGame() {
    currentState = states.TEAM1_SERVES;
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
function pointWonBy(team) {
    if (currentState === states.GAME_OVER) return;

    if (team === 'team1') {
        scores.team1++;
        scoreTeam1.innerText = scores.team1;
        currentState = states.TEAM1_SERVES;
        checkServerInTeam('team1');
    } else {
        scores.team2++;
        scoreTeam2.innerText = scores.team2;
        currentState = states.TEAM2_SERVES;
        checkServerInTeam('team2');
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

document.getElementById('buttonT1').addEventListener('click', incrementTeam1);
document.getElementById('buttonT2').addEventListener('click', incrementTeam2);
