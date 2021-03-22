/* GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game */

//--------------SET INSTRUCTION----------------------//
setTimeout(function () {
    document.querySelector("#instructions").style.display = "block";//to show instructions
}, 1000);

const player0 = {
    name: document.querySelector('#name-0'),
    panel: document.querySelector('.player-0-panel'),
    currentScore: document.querySelector("#current-0"),
    totalScore: document.querySelector("#score-0"),
}

const player1 = {
    name: document.querySelector('#name-1'),
    panel: document.querySelector('.player-1-panel'),
    currentScore: document.querySelector("#current-1"),
    totalScore: document.querySelector("#score-1"),
}

const dice = {
    panel: document.querySelector('.dice-panel'),
    One: document.querySelector("#dice-0"),
    Two: document.querySelector("#dice-1"),
}

// Starting settings---------//
player0.currentScore.innerText = "0";
player1.currentScore.innerText = "0";
player0.totalScore.innerText = "0";
player1.totalScore.innerText = "0";
dice.One.style.opacity = "0.5";
dice.Two.style.opacity = "0.5";

class Game {
    constructor(player0, player1) {
        this.player0 = player0
        this.player1 = player1
    }
    reset() {
        // Reset Scores and Names---------//
        player0.currentScore.innerText = "0";
        player1.currentScore.innerText = "0";
        player0.totalScore.innerText = "0";
        player1.totalScore.innerText = "0";
        player0.name.innerText = document.querySelector("#player-1-name").value;
        player1.name.innerText = document.querySelector("#player-2-name").value;

        // Reset Active class---------// to start with player 0
        player0.panel.classList.add("active");
        player1.panel.classList.remove("active");

        // Remove Winner Class---------// to remove winner class
        player0.panel.classList.remove("winner");
        player1.panel.classList.remove("winner");
    }
    //----------SWITCHING OF PLAYERS---------//
    switchActive() {
        player0.panel.classList.toggle("active"); //to show active player 
        player1.panel.classList.toggle("active"); //add or remove if present in elements classlist
    }
    hideRoll() {
        document.querySelector(".btn-roll").style.display = "none"; //if there is winner
    }
    showRoll() {
        document.querySelector(".btn-roll").style.display = "block";
    }
    showHold() {
        document.querySelector(".btn-hold").style.display = "block";
    }
    hideHold() {
        document.querySelector(".btn-hold").style.display = "none"; //if there is winner
    }
    winner() {
        let input = document.querySelector("#win-score").value;
        if (player0.totalScore.innerText >= parseFloat(input)) { //if totalscore is greater than or equal then declare winner
            player0.panel.classList.add("winner");
            document.querySelector('#name-0').innerHTML = "<span class='won'>WINNER!<span><br>" + player0.name.innerText;
            game.hideHold();
            game.hideRoll();
        } else if (player1.totalScore.innerText >= parseFloat(input)) {
            player1.panel.classList.add("winner");
            document.querySelector('#name-1').innerHTML = "<span class='won'>WINNER!<span><br>" + player1.name.innerText;
            game.hideHold();
            game.hideRoll();
        }
    }
    //----------SOUNDS-------------//
    soundRoll() { //rolling dice
        const audio = new Audio("assets/dicesound2.mp3");
        audio.play();
    }
    soundHold() { //for hold
        const audio = new Audio("assets/ring.mp3");
        audio.play();
    }
    soundLose() { //when the player get 1 in a dice
        const audio = new Audio("assets/laughlose.mp3");
        audio.play();
    }
    styleDice(diceValue, dice) { //style for the dice before starting
        if (diceValue === 1) {
            dice.style.boxShadow = '0px 0px 5px 5px rgba(255, 0, 0, 0.3)';
            dice.style.opacity = "0.8";
        } else {
            dice.style.boxShadow = "0px 10px 50px rgba(0, 0, 0, 0.1)";
            dice.style.opacity = "1.0";
        }
    }
    rotateDice(dice) {
        dice.classList.add("spin");
    }
}
//-----------GAME RESET / ROLL---------//
const game = new Game(player0, player1);

document.querySelector('.btn-new').addEventListener('click', function () {// to show all buttons once reset
    game.reset(); //method for showing reset
    game.showRoll(); //method for showing roll
    game.showHold(); //method for showing hold
});

document.querySelector('.btn-roll').addEventListener('click', function () {//declaration 

    let min = 1; //minimum dice roll
    let max = 6; //maximum dice roll
    let random0 = Math.floor(Math.random() * max) + min; //to randomize the dice roll
    let random1 = Math.floor(Math.random() * max) + min;//round off to lowest math.random(decimal)*
    let sum = random0 + random1; //to add 2 dice value

    let twoDice = document.querySelector("#twoDice").checked;//settings 2 dice
    if (twoDice == true) { //if selected 2 dice will be displayed
        dice.Two.style.display = "block"; //dice display
        document.querySelector("#dice-0").src = "Assets/dice-" + random0 + ".png";//set attribute src image 1-6
        document.querySelector("#dice-1").src = "Assets/dice-" + random1 + ".png";
        document.querySelector("#dice-0").style.margin = "0 0 0 0";
    } else {
        sum = random0;
        dice.Two.style.display = "none";
        random1 = 0;
        document.querySelector("#dice-0").src = "Assets/dice-" + random0 + ".png";
        document.querySelector("#dice-1").src = "";
        document.querySelector("#dice-0").style.margin = "50px 0 0 0";
    }

    console.log('%c ROLL DICE', 'color:green; font-weight: bold', { twoDice, random0, random1 });
    // switching player scores based on who has active class
    //to which player should acummulate the score
    if (player0.panel.classList.contains('active')) {
        current = player0.currentScore;
        total = player0.totalScore;
    } else if (player1.panel.classList.contains('active')) {
        current = player1.currentScore;
        total = player1.totalScore;
    }

    // if at least 1 dice rolls 1, switchActive + return 0; else, add to current
    if (random0 === 1 || random1 === 1) { // if 1 switch active
        current.innerText = 0;
        game.switchActive();
        game.soundLose();
    } else { //if not 1
        current.innerText = parseInt(current.innerText) + sum; //add the rolled dice to the current score
        game.soundRoll();
    }

    // change image and style of dice
    game.styleDice(random0, dice.One); //change the image
    game.styleDice(random1, dice.Two);

    // rotate dice, remove class after to allow for next spins
    game.rotateDice(dice.One);
    game.rotateDice(dice.Two);
    setTimeout(function () { dice.One.classList.remove("spin") }, 500);
    setTimeout(function () { dice.Two.classList.remove("spin") }, 500);
});
//------------------HOLD FUNCTION-----------------//
document.querySelector('.btn-hold').addEventListener('click', function () {
    // add current score to totals, reset current to 0
    total.innerText = parseInt(total.innerText) + parseInt(current.innerText);//total inner text  + current innert text (to get the sum)
    current.innerText = "0"; //clear the  score of current
    game.switchActive(); //switch player 
    game.soundHold();
    game.winner(); //to check if the condition of winner is met
});


//--------Event Listeners for Pop-ups--------- //
//to show settings/rules pop up
document.querySelector('.btn-settings').addEventListener('click', function () {
    document.querySelector('#popup').style.display = 'block';
})

//
document.querySelector('#set-btn').addEventListener('click', function () {
    game.reset();
    game.showHold();
    game.showRoll();
    document.querySelector('#popup').style.display = 'none';
    player0.name.innerText = document.querySelector("#player-1-name").value; //to change name
    player1.name.innerText = document.querySelector("#player-2-name").value; //to change name
    document.querySelector(".btn-flag").innerHTML = "<i class='ion-ios-flag'></i> Race to " + document.querySelector("#win-score").value
});
//to exit the pop up
document.querySelector('.popup-close').addEventListener('click', function () {
    document.querySelector('#popup').style.display = 'none';
})
//to exit the pop up of instruction
document.querySelector('#close-guide').addEventListener('click', function () {
    document.querySelector("#instructions").style.display = 'none';
})
//to pop-up the rules
document.querySelector('.btn-rules').addEventListener('click', function () {
    document.querySelector("#instructions").style.display = "block";
})