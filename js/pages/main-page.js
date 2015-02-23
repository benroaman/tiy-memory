game.router.add('', function() {
  $('title').text('Memory :: Game Select');
  $('.main-content').removeClass('hard-board');
  $('.main-content').html($('#main-page').html());
  game.mainPageButtons();
})
