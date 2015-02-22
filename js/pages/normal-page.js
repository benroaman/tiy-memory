game.router.add('normalmode', function() {
  $('title').text('Memory :: Normal Mode');
  var normalBoard = _.template($('#game-screen').html(), { variable: 'm' });
  $('.main-content').html(normalBoard({ deck: game.shuffleDeck() }));
  game.logic('normal');
})
