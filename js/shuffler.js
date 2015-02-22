game.shuffleDeck = function() {
  var deck = ['h', 'h', 'i', 'i', 'j', 'j', 'k', 'k', 'l', 'l',
              'm', 'm', 'n', 'n', 'o', 'o', 'p', 'p'];

  var mixDeck = [];

  while (deck.length > 0) {
    mixDeck.push(deck.splice(Math.floor(Math.random()*deck.length), 1)[0]);
  }

  return mixDeck;
}
