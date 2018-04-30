/*
 * Create a list that holds all of your cards
 */
 const deck = document.querySelector('.deck');
 const cards = document.getElementsByClassName('card') ;
 const symbols = Array.from(document.querySelectorAll('.card i'));
 const restartButton = document.querySelector('.fa-repeat');



// declaring move variables
let moves, starCount , starRating, time, firstClick, openCards, matchedPairs, winMinutes, winSeconds;
let seconds = 0, minutes = 0;

let counter = document.querySelector('.moves');
const stars = document.querySelectorAll('.fa-star');
let timer = document.querySelector('.timer');


// // // DOM Modal Elements
const modalContent = document.querySelector(".modal-content");
const modal = document.querySelector(".modal");







// // // Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}




function start () {
  createDeck();
  moves = 0;
  counter.innerHTML = 0;
  starCount = 3;
  starRating = 3;
  openCards = [];
  matchedPairs = [];
  time = 0;
  seconds = 0;
  minutes = 0;
  timer.innerHTML = '0 minutes 0 seconds';
  firstClick = true;

  for (var i= 0; i < stars.length; i++) {
    stars[i].style.visibility = 'visible';
  }

  deck.addEventListener('click', function click (event) {
    if (event.target.nodeName === 'LI') {  
      flipCard();
    }
  });

}




 /*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method above
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 function createDeck() {
  deck.innerHTML = "";
  let shuffledSymbols = shuffle(symbols);

  for(let i = 0; i < 16; i++) {
    // Creates individual cards
    let card = document.createElement('li');
    card.classList.add("card", "closed");

    // Creates the symbol on the card
    let symbol = document.createElement('i');
    let symbolClasses = shuffledSymbols[i].className.split(' ');
    symbol.classList.add(symbolClasses[0], symbolClasses[1]);

    // Add symbol to card then card to deck
    card.appendChild(symbol);
    deck.appendChild(card);
  }
}



function flipCard() {
  if (event.target.classList.contains("closed")) {
    event.target.classList.toggle("closed");
    event.target.classList.add("open", "show");
    openCards.push(event.target);

    if (firstClick === true) {
     timerStart();
     firstClick = false;


   }

   if (openCards.length === 2) {
    moveCounter();
    cardCheck();
  }
}

}



// // //CARD CHECKING AND MATCHING FUNCTIONS

function cardCheck() {

  console.log("card check");
  if (openCards[0].innerHTML === openCards[1].innerHTML){
    console.log("match");
    match();
  }

  else {
    setTimeout (function() {
      openCards[0].classList.remove("open", "show");
      openCards[1].classList.remove("open", "show");
      openCards[0].classList.add("closed");
      openCards[1].classList.add("closed");
      openCards = [];
    }, 500);
  }
}


function match () {
 openCards[0].classList.remove("open", "show");
 openCards[1].classList.remove("open", "show");
 openCards[0].classList.add("match");
 openCards[1].classList.add("match");
 matchedPairs.push(openCards);

 if (matchedPairs.length === 8){

  toggleModal();
}
openCards = [];
}




// // // MOVE COUNTER AND STAR RATING

function moveCounter() {
  moves++;
  counter.innerHTML = moves;

  if (moves > 18 && moves < 22){
    starCount = 2;
    for (i= 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = 'collapse';
        starRating = 2;
      }
    }
  }
  else if (moves > 22) {
    starCount = 3;
    for (i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.visibility = 'collapse';
        starRating = 1;
      }
    }
  }
}



// // // TIMER

function timerStart() {
  time = setInterval(function(){
    timer.innerHTML = minutes +' minutes '+ seconds +' seconds';
    seconds++;
    if(seconds == 60){
      minutes++;
      seconds = 0;
    }
    
  },1000);
}



// // // MODAL AND RESET

function toggleModal() {
  modal.classList.toggle("show-modal");
  clearInterval(time);
  let winMove = document.getElementById('winMove')

  if (minutes < 1){
    document.getElementById('winText').innerHTML = (seconds + " seconds. You took " + moves + " moves, winning " + starRating + " stars." );
  }
  else if (minutes === 1) {
    document.getElementById('winText').innerHTML = (minutes + " minute and " + seconds + " seconds. You took " + moves + " moves, winning " + starRating + " stars." );
  }
  else  {
   document.getElementById('winText').innerHTML = (minutes + " minutes and " + seconds + " seconds. You took " + moves + " moves, winning " + starRating + " stars." );
 }

 const resetButton = document.getElementById("replay").onclick = function(){
  modal.classList.toggle("show-modal")
  start();
}

}





restartButton.addEventListener('click', function() {
  clearInterval(time);
  start();
}
);




start();
