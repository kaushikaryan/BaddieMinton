const scores = { team1: 0, team2: 0 };
let serving = '';
let gameStarted = false;

function checkServerInTeam(team) {
    if (team === 'team1') {
        if (scores.team1 % 2 === 0) {
            serving = 'even1';
        } else {
            serving = 'odd1';
        }
    } else {
        if (scores.team2 % 2 === 0) {
            serving = 'even2';
        } else {
            serving = 'odd2';
        }
    }
    updateShuttleVisibility();
}

function updateShuttleVisibility() {
    const shuttleIcons = document.querySelectorAll('.shuttleplayer1, .shuttleplayer2, .shuttleplayer3, .shuttleplayer4');
    shuttleIcons.forEach(icon => icon.style.visibility = 'hidden');

    if (serving === 'even1') {
        document.querySelector('.shuttleplayer2').style.visibility = 'visible';
    } else if (serving === 'odd1') {
        document.querySelector('.shuttleplayer1').style.visibility = 'visible';
    } else if (serving === 'even2') {
        document.querySelector('.shuttleplayer4').style.visibility = 'visible';
    } else if (serving === 'odd2') {
        document.querySelector('.shuttleplayer3').style.visibility = 'visible';
    }
}

function updateScores() {
    document.querySelector('.scoreT1').textContent = `Team 1 Score: ${scores.team1}`;
    document.querySelector('.scoreT2').textContent = `Team 2 Score: ${scores.team2}`;
}

document.querySelector('.buttonT1').addEventListener('click', () => {
    if (gameStarted) {
        scores.team1++;
        checkServerInTeam('team1');
        updateScores();
    }
});

document.querySelector('.buttonT2').addEventListener('click', () => {
    if (gameStarted) {
        scores.team2++;
        checkServerInTeam('team2');
        updateScores();
    }
});

document.querySelector('.start-game').addEventListener('click', () => {
    gameStarted = true;
    scores.team1 = 0;
    scores.team2 = 0;
    updateScores();
    checkServerInTeam('team1');
});

// Initialize the game without starting it
updateScores();
