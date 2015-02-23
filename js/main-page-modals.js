game.mainPageButtons = function() {
  $('.records-link').click(function() {
    $('.records-modal-greyout').toggleClass('modal-visible');
    var topTimes = _.template($('#top-times').html(), { variable: 'm' });
    $('.normal-times').html(topTimes({ times: game.timeStore.queryNormal() }));
    $('.hard-times').html(topTimes({ times: game.timeStore.queryHard() }));
    if (!$('.close-records-modal').hasClass('ready')) {
      $('.close-records-modal').toggleClass('ready');
      $('.close-records-modal').click(function() {
        $('.records-modal-greyout').toggleClass('modal-visible');
      })
    }
  })

}
