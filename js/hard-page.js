game.router.add('hardmode', function() {
  var hardBoard = _.template($('#hard-mode').html(), { variable: 'm' });
  $('.main-content').html(hardBoard({ deck: game.shuffleDeck(0) }));
  game.logic();
})
