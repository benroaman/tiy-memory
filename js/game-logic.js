game.logic = function() {
  var flips = 0;

  $('.game-card').on('click', flip);

  var timer = game.Timer();
  timer.start();

  function flip(e) {
    ++flips;
    var card = $(this);
    card.off('click', flip);
    card.toggleClass('guess')
    card.toggleClass('current-guess')
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
        setTimeout(wrong, 1250);
      }
    }
  }

  function isSecondCard() {
    return !(flips % 2);
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
    timer.stop();
    var newTime = game.Time({ min: $('.min').text(), sec: $('.sec').text() });
    if (game.timeStore.isTopTime(newTime)) {
      showTopTimeModal(newTime);
    } else {
      showVictoryModal();
    }
  }

  function showTopTimeModal(newTime) {
    $('.victory-greyout').html($('#top-time-modal').html());
    $('.victory-greyout').toggleClass('modal-visible');
    $('.initials-submit').click(function() {
      newTime.name = $('.initials').val().toUpperCase();
      while (newTime.name.length < 3) {
        newTime.name = '-' + newTime.name;
      }
      game.timeStore.add(newTime);
      game.timeStore.save();
      showVictoryModal();
    })
  }

  function showVictoryModal() {
    $('.victory-greyout').html($('#victory-modal').html());
    if (!$('.victory-greyout').hasClass('modal-visible')) {
      $('.victory-greyout').toggleClass('modal-visible');
    }
    var topTimes = _.template($('#top-times').html(), { variable: 'm' });
    $('.best-times').html(topTimes({ times: game.timeStore.query() }));
    $('.again').click(function() {
      setTimeout(restart, 2000);
      $('.victory-greyout').toggleClass('modal-visible');
    })
  }

  function restart() {
    game.router.run(location.hash.slice(1))
  }

  function loss() {
    $('.ungot').off('click', flip);
    timer.stop();
    $('.ungot').toggleClass('ungot');
    showFailureModal();
  }

  function showFailureModal() {
    $('.failure-greyout').html($('#failure-modal').html());
    $('.failure-greyout').toggleClass('modal-visible');
    $('.again').click(function() {
      setTimeout(restart, 2000);
      $('.failure-greyout').toggleClass('modal-visible');
    })
  }

  function right() {
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
    isLoss();
  }

}

// TODO: add victory screen
// TODO: add failure screen?
// TODO: add return to main link
// TODO: style this shit
