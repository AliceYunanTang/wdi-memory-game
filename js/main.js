

var cards = [
  {
    rank:'queen',
    suit:'hearts',
    cardImage:"images/queen-of-hearts.png"
  },
  {
    rank:'queen',
    suit:'diamonds',
    cardImage:"images/queen-of-diamonds.png"
  },
  {
    rank:'king',
    suit:'king-of-hearts',
    cardImage:"images/king-of-hearts.png"
  },
  {
    rank:'king',
    suit:'diamonds',
    cardImage:"images/king-of-diamonds.png"
  }
];

var cardsInPlay = [];
var cardsFlipped = 0;

var checkForMatch = function(){
  if(cardsInPlay.length ===2){
    if (cards[cardsInPlay[0].getAttribute('data-id')].rank===cards[cardsInPlay[1].getAttribute('data-id')].rank){
      cardsFlipped +=2;
      cardsInPlay = [];
      setTimeout(function(){
        if (cardsFlipped == 4) {
          alert("you win!");
          resetGame();
        }
      },700)
    } else {
      setTimeout(function(){
        cardsInPlay[0].setAttribute('src','images/back.png');
        cardsInPlay[1].setAttribute('src','images/back.png');
        cardsInPlay=[];
      },700);
    }
  }
}

var flipCard = function(){
  if(this.getAttribute('src') === 'images/back.png' && cardsInPlay.length <2){
    var cardId=this.getAttribute('data-id');
    this.setAttribute('src',cards[cardId].cardImage);
    if (cardsInPlay.length ==0){
      cardsInPlay.push(this);
    } else if (cardsInPlay.length==1){
      cardsInPlay.push(this);
      checkForMatch();
    }
  }
}

Array.prototype.shuffle = function(){
  var l = this.length;
  var temp;
  var r;                //random array index number
  while (--l >0) {
    r = Math.floor(Math.random() * (l+1));
    temp = this[l];
    this[l] = this[r];
    this[r] = temp;
  }
}

var init = function(){
  //initialize
  cardsFlipped =0;
  cardsInplay =0;

  //shuffle the cards
  cards.shuffle();
}

var createBoard = function(){
  //initialize game and shuffle the cards
  init();

  // create the cards inside the game-board;
  for (var i = 0; i < cards.length; i++) {
    var cardElement = document.createElement('img');
    cardElement.setAttribute('src','images/back.png');
    cardElement.setAttribute('data-id',i);
    cardElement.addEventListener('click',flipCard);
    document.getElementById("game-board").appendChild(cardElement);
  }
}

var resetGame = function(){
  //initialize game and shuffle the cards
  init();

  // reset cards image to background image;
  var cardElements = document.getElementsByTagName('img');
  for (var i = 0; i < cards.length; i++) {
    cardElements[i].setAttribute('src','images/back.png');
  }
}

createBoard();
