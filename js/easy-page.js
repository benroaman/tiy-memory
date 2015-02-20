game.router.add('normalmode', function() {
  var normalBoard = _.template($('#normal-mode').html(), { variable: 'm' });
  $('.main-content').html(normalBoard({ deck: game.shuffleDeck(14) }));
  game.logic();
})
