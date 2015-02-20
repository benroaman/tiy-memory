game.shuffleDeck = function(n) {
  var deck = ['a', 'a', 'b', 'b', 'c', 'c', 'd', 'd', 'e', 'e', 'f', 'f',
              'g', 'g', 'h', 'h', 'i', 'i', 'j', 'j', 'k', 'k', 'l', 'l',
              'm', 'm', 'n', 'n', 'o', 'o', 'p', 'p'].slice(n);

  var mixDeck = [];

  while (deck.length > 0) {
    mixDeck.push(deck.splice(Math.floor(Math.random()*deck.length), 1)[0]);
  }

  return mixDeck;
}
