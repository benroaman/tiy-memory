game.router.add('hardmode', function() {
  $('title').text('Memory :: Hard Mode');
  var hardBoard = _.template($('#game-screen').html(), { variable: 'm' });
  $('.main-content').html(hardBoard({ deck: game.shuffleDeck() }));
  game.logic('hard');
})
