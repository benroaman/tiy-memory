game.shuffleDeck = function() {
  var deck = ['h', 'h', 'p', 'p', 'c', 'c', 'd', 'd', 'e', 'e', 'f', 'f', 'g', 'g', 'j', 'j', 'i', 'i'];

  var mixDeck = [];

  while (arr.length > 0) {
    mixArr.push(deck.splice(Math.floor(Math.random()*deck.length), 1)[0]);
  }

  return mixDeck;
}
