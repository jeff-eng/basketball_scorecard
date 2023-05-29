let home = {
    score: 0,
    fouls: 0
};

let guest = {
    score: 0,
    fouls: 0
}

// Constants
const MAXBONUSFOULS = 5;
const BONUSACTIVEHEXVAL = '#F94F6D';
const BONUSINACTIVEHEXVAL = '#3d51a9';
const LEADERACTIVEHEXVAL = '#FCD34D';
const LEADERINACTIVEHEXVAL = '#EEEEEE';

// Queried elements
const homeHeading = document.getElementById('home-heading');
const guestHeading = document.getElementById('guest-heading');
const homePointBtns = document.getElementById('home-buttons');
const guestPointBtns = document.getElementById('guest-buttons');
const homeFoulBtns = document.getElementById('home-foul-buttons');
const guestFoulBtns = document.getElementById('guest-foul-buttons');
const qtrSlider = document.getElementById('qtr-slider');
const qtrSpanEl = document.getElementById('qtr');
const resetBtn = document.getElementById('reset-btn');
const homeScoreEl = document.getElementById('home-score');
const guestScoreEl = document.getElementById('guest-score');
const homeFoulCountEl = document.getElementById('home-foul-count');
const guestFoulCountEl = document.getElementById('guest-foul-count');
const homeBonusEl = document.getElementById('home-bonus');
const guestBonusEl = document.getElementById('guest-bonus');

function addToScore(points, team) {
    if (team == 'guest') {
        guest.score += points;
    } else {
        home.score += points;
    }
}

function highlightLeader() {
    if (home.score > guest.score) {
        homeHeading.style.color = LEADERACTIVEHEXVAL;
        guestHeading.style.color = LEADERINACTIVEHEXVAL;
    } else if (home.score < guest.score) {
        guestHeading.style.color = LEADERACTIVEHEXVAL;
        homeHeading.style.color = LEADERINACTIVEHEXVAL;
    } else {
        homeHeading.style.color = LEADERINACTIVEHEXVAL;
        guestHeading.style.color = LEADERINACTIVEHEXVAL;
    }
}

function handlePointBtnClick(event, team) {
    const elementClicked = event.target;
    
    // Only perform action on button press
    if (elementClicked.nodeName == 'BUTTON') {
        const points = parseInt(elementClicked.dataset.points);
        
        addToScore(points, team);
        highlightLeader();
        document.getElementById(`${team}-score`).textContent = (team === 'home' ? home.score : guest.score);    
    }
}

function handleFoulBtnClick(event, team) {
    const elementClicked = event.target;

    // Get reference to the JS object for the team to pass into changeFoulCount()
    const teamObj = (team === 'home' ? home: guest);
    
    changeFoulCount(teamObj, team, elementClicked);

    const inBonus = (teamObj.fouls >= MAXBONUSFOULS);   
    const bonusColor = inBonus ? BONUSACTIVEHEXVAL : BONUSINACTIVEHEXVAL;
    
    document.getElementById(`${team}-bonus`).style.color = bonusColor;
}

function changeFoulCount(teamJSObject, team, clickedEl) {
    if ((teamJSObject.fouls < MAXBONUSFOULS) && (clickedEl.id === `${team}-add-foul`)) {
        teamJSObject.fouls += 1;  
        document.getElementById(`${team}-foul-count`).textContent = teamJSObject.fouls; 
    } else if ((teamJSObject.fouls > 0) && (clickedEl.id == `${team}-subtract-foul`)) {
            teamJSObject.fouls -= 1
            document.getElementById(`${team}-foul-count`).textContent = teamJSObject.fouls;
    }
}

// Event listeners for points buttons
homePointBtns.addEventListener('click', (e) => handlePointBtnClick(e, 'home'));
guestPointBtns.addEventListener('click', (e) => handlePointBtnClick(e, 'guest'));
// Event listeners for foul buttons
homeFoulBtns.addEventListener('click', (e) => handleFoulBtnClick(e, 'home'));
guestFoulBtns.addEventListener('click', (e) => handleFoulBtnClick(e, 'guest'));

qtrSlider.addEventListener('change', (event) => {
    qtrSpanEl.textContent = event.target.value;
});

resetBtn.addEventListener('click', () => {   
    home = {
        score: 0,
        fouls: 0
    };
    
    guest = {
        score: 0,
        fouls: 0
    };
        
    homeScoreEl.textContent = home.score;
    guestScoreEl.textContent = guest.score;
    homeFoulCountEl.textContent = home.fouls;
    guestFoulCountEl.textContent = guest.fouls;
    homeBonusEl.style.color = BONUSINACTIVEHEXVAL;
    guestBonusEl.style.color = BONUSINACTIVEHEXVAL;
    qtrSlider.value = 1;
    qtrSpanEl.textContent = 1;
    
    // Calling this after the score gets reset to 0-0 to reset styling for leader
    highlightLeader()
});