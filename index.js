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

function addToScore(points, team) {
    if (team == 'guest') {
        guest.score += points;
    } else {
        home.score += points;
    }
}

function highlightLeader() {
    if (home.score > guest.score) {
        document.getElementById('home-heading').style.color = LEADERACTIVEHEXVAL;
        document.getElementById('guest-heading').style.color = LEADERINACTIVEHEXVAL;
    } else if (home.score < guest.score) {
        document.getElementById('guest-heading').style.color = LEADERACTIVEHEXVAL;
        document.getElementById('home-heading').style.color = LEADERINACTIVEHEXVAL;
    } else {
        document.getElementById('home-heading').style.color = LEADERINACTIVEHEXVAL;
        document.getElementById('guest-heading').style.color = LEADERINACTIVEHEXVAL;
    }
}

document.getElementById('home-buttons').addEventListener('click', (event) => {
   const elementClicked = event.target;
      
   // Only perform action on button press
   if (elementClicked.nodeName == 'BUTTON') {
       const points = parseInt(elementClicked.dataset.points);
       
       addToScore(points, 'home');
       highlightLeader();
       document.getElementById('home-score').textContent = home.score;    
   }
});

document.getElementById('guest-buttons').addEventListener('click', (event) => {
   const elementClicked = event.target;
      
   // Only perform action on button press
   if (elementClicked.nodeName == 'BUTTON') {
       const points = parseInt(elementClicked.dataset.points);
       
       addToScore(points, 'guest');
       highlightLeader();
       document.getElementById('guest-score').textContent = guest.score;    
   }
});

document.getElementById('home-foul-buttons').addEventListener('click', (event) => {
    const elementClicked = event.target;
    
    if ((home.fouls < MAXBONUSFOULS) && (elementClicked.id == 'home-add-foul')) {
        home.fouls += 1;  
        document.getElementById('home-foul-count').textContent = home.fouls;                
    } else if ((home.fouls > 0) && (elementClicked.id == 'home-subtract-foul')) {
        home.fouls -= 1
        document.getElementById('home-foul-count').textContent = home.fouls;
    }
    
    const inBonus = (home.fouls >= MAXBONUSFOULS);   
    const bonusColor = inBonus ? BONUSACTIVEHEXVAL : BONUSINACTIVEHEXVAL;
    
    document.getElementById('home-bonus').style.color = bonusColor;
});

document.getElementById('guest-foul-buttons').addEventListener('click', (event) => {
    const elementClicked = event.target;
    
    if ((guest.fouls < MAXBONUSFOULS) && (elementClicked.id == 'guest-add-foul')) {
        guest.fouls += 1;  
        document.getElementById('guest-foul-count').textContent = guest.fouls;                
    } else if ((guest.fouls > 0) && (elementClicked.id == 'guest-subtract-foul')) {
        guest.fouls -= 1
        document.getElementById('guest-foul-count').textContent = guest.fouls;
    }
    
    const inBonus = (guest.fouls >= MAXBONUSFOULS);   
    const bonusColor = inBonus ? BONUSACTIVEHEXVAL : BONUSINACTIVEHEXVAL;
    
    document.getElementById('guest-bonus').style.color = bonusColor;
});

document.getElementById('qtr-slider').addEventListener('change', (event) => {
    
    document.getElementById('qtr').textContent = event.target.value;
});

document.getElementById('reset-btn').addEventListener('click', () => {   
    home = {
        score: 0,
        fouls: 0
    }
    
    guest = {
        score: 0,
        fouls: 0
    }
        
    document.getElementById('home-score').textContent = home.score;
    document.getElementById('guest-score').textContent = guest.score;
    document.getElementById('home-foul-count').textContent = home.fouls;
    document.getElementById('guest-foul-count').textContent = guest.fouls;
    document.getElementById('home-bonus').style.color = BONUSINACTIVEHEXVAL;
    document.getElementById('guest-bonus').style.color = BONUSINACTIVEHEXVAL;
    document.getElementById('qtr-slider').value = 1;
    document.getElementById('qtr').textContent = 1;
    
    // Calling this after the score gets reset to 0-0 to reset styling for leader
    highlightLeader()
});