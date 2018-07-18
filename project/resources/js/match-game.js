var MatchGame = {
/*1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8*/
};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready(function() {
  let $game = $("#game");
  MatchGame.renderCards(MatchGame.generateCardValues(), $game);
});

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  let generateCardValues = [];
  for (let randomValue = 1; randomValue <= 8; randomValue++) {
    generateCardValues.push(randomValue, randomValue);
  }
  let randomCardValues = [];
  while (generateCardValues.length > 0) {
    let index = Math.floor(generateCardValues.length * Math.random());
    randomCardValues.push(generateCardValues[index]);
    generateCardValues.splice(index, 1);
  }
  return randomCardValues;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  $game.data("flippedCards", []); // note: do not put a "let" here because $game is already in the function argument.
  let cardColor = [
    "hsl(25, 85%, 65%)",
    "hsl(55, 85%, 65%)",
    "hsl(90, 85%, 65%)",
    "hsl(160, 85%, 65%)",
    "hsl(220, 85%, 65%)",
    "hsl(265, 85%, 65%)",
    "hsl(310, 85%, 65%)",
    "hsl(360, 85%, 65%)"];

  $game.empty(); // http://api.jquery.com/empty/
  for (let cardValue = 0; cardValue < cardValues.length; cardValue++) {
    let $newCard = $("<div class='card col-md-3'></div>");
    $newCard.data("value", cardValues[cardValue]);
    $newCard.data("isFlipped", false);
    $newCard.data("color", cardColor[cardValues[cardValue]-1]);
    $game.append($newCard);
  }
  $(".card").on("click", function() { //need to call on the individual card by using the .card class.
    MatchGame.flipCard($(this), $game);
  });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if($card.data("isFlipped")) { // use .data("item") to access a data attribute in a jQuery element.
    return;
  }

  $card.css("background-color", $card.data("color")).text($card.data("value")).data("isFlipped", true);
  let flippedCards = $game.data("flippedCards");
  flippedCards.push($card);

  if(flippedCards.length === 2) {
    if(flippedCards[0].data("value") === flippedCards[1].data("value")) {
      flippedCards[0].css("background-color", "rgb(153, 153, 153)");
      flippedCards[0].css("color", "rgb(204, 204, 204)");
      flippedCards[1].css("background-color", "rgb(153, 153, 153)");
      flippedCards[1].css("color", "rgb(204, 204, 204)");
    } else {
      window.setTimeout(function() {
        flippedCards[0].data("isFlipped", false);
        flippedCards[0].text("");
        flippedCards[0].css("background-color", "rgb(32, 64, 86)");
        flippedCards[1].data("isFlipped", false);
        flippedCards[1].text("");
        flippedCards[1].css("background-color", "rgb(32, 64, 86)"); //Must put the rgb() in quotes because this is a css properly, NOT a javascript one.
      }, 350);
    }
    $game.data("flippedCards", []);
  }
};
