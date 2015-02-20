game.logic = function() {

  $('.game-card').on('click', flip);

  function flip(e) {
    var card = $(this);
    card.toggleClass('guess')
    $('.game-card__shape', card).toggleClass('card-flip');
    $('.game-card__decoration', card).toggleClass('deco-flip');
    if (isSecondCard()) {
      if (isMatch()) {
        right();
      } else {
        decrementLife();
        $('.solo-heart').removeClass('pop');
        $('.solo-heart').toggleClass('pop-pop');
        $('.ungot').off('click', flip); // makes it so you can't flip cards while incorrect answers are exposed
        isLoss();
        setTimeout(wrong, 2000);
      }
    }
  }

  function isSecondCard() {
    return $('.guess').length === 2;
  }

  function isMatch() {
    var guesses = $('.game-card__decoration', '.guess');
    return $(guesses[0]).text() === $(guesses[1]).text();
  }

  function decrementLife() {
    var lifeBar = $('.game-life');
    lifeBar.text(lifeBar.text().slice(1));
  }

  function isVictory() {
    if (!$('.ungot').length) {
      victory();
    }
  }


  function isLoss() {
    if ($('.game-life').text() === '') {
      loss();
    }
  }

  function victory() {
    alert('you win!');
  }

  function loss() {
    $('.ungot').off('click', flip);
    alert('you lose!');
  }

  function right() {
    $('.guess').off('click', flip);
    $('.guess').toggleClass('ungot');
    $('.guess').toggleClass('guess');
    isVictory();
  }

  function wrong() {
    $('.card-flip', '.guess').toggleClass('card-flip');
    $('.deco-flip', '.guess').toggleClass('deco-flip');
    $('.guess').toggleClass('guess');
    $('.ungot').on('click', flip);
    $('.solo-heart').addClass('pop');
    $('.solo-heart').toggleClass('pop-pop');
  }

}
