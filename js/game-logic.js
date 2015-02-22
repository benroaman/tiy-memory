game.logic = function() {
  var flips = 0;

  $('.game-card').on('click', flip);

  var timer = game.Timer();
  timer.start();

  function flip(e) {
    ++flips;
    var card = $(this);
    card.off('click', flip);
    card.toggleClass('guess');
    animateFlip(card);
    matchLogic();
  }

  function matchLogic() {
    if (isSecondCard()) {
      var pair = getPair();
      if (isMatch(pair)) {
        right(pair);
      } else {
        wrong(pair);
      }
    }
  }

  function getPair() {
    var pair = $('.guess').toArray();
    pair.forEach(function(item) {
      $(item).toggleClass('guess');
    })
    return pair;
  }

  function animateFlip(card) {
    $('.game-card__shape', card).toggleClass('card-flip');
    $('.game-card__decoration', card).toggleClass('deco-flip');
  }

  function isSecondCard() {
    return !(flips % 2);
  }

  function isMatch(pair) {
    return pair[0].textContent === pair[1].textContent;
  }

  function decrementLife() {
    var lastActive = $('.active').last();
    lastActive.addClass('broken');
    lastActive.removeClass('active');
  }

  function incrementLife() {
    var heartToAdd = $('.broken').first();
    heartToAdd.removeClass('broken');
    heartToAdd.addClass('active');
  }

  function isVictory() {
    if (!$('.ungot').length) {
      victory();
    }
  }


  function isLoss(to) {
    if (!$('.active').length) {
      loss(to);
    }
  }

  function victory() {
    timer.stop();
    var newTime = game.Time({ min: $('.min').text(), sec: $('.sec').text() });
    if ($('.game-card').length === 18) {
      if (game.timeStore.isTopTimeNormal(newTime)) {
        showTopTimeModal(newTime);
      } else {
        showVictoryModal();
      }
    } else {
      if (game.timeStore.isTopTimeHard(newTime)) {
        showTopTimeModal(newTime);
      } else {
        showVictoryModal();
      }
    }
  }

  function showTopTimeModal(newTime) {
    $('.victory-greyout').html($('#top-time-modal').html());
    $('.victory-greyout').toggleClass('modal-visible');
    $('.modal-actual').submit(function(e) {
      e.preventDefault();
      newTime.name = $('.initials').val().toUpperCase();
      while (newTime.name.length < 3) {
        newTime.name = '-' + newTime.name;
      }
      if ($('.game-card').length === 18) {
        game.timeStore.addNormal(newTime);
      } else {
        game.timeStore.addHard(newTime);
      }
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
    if ($('.game-card').length === 18) {
      $('.best-times').html(topTimes({ times: game.timeStore.queryNormal() }));
    } else {
      $('.best-times').html(topTimes({ times: game.timeStore.queryHard() }));
    }
    $('.again').click(function() {
      setTimeout(restart, 2000);
      $('.victory-greyout').toggleClass('modal-visible');
    })
  }

  function restart() {
    game.router.run(location.hash.slice(1))
  }

  function loss(to) {
    clearTimeout(to);
    $('.ungot').off('click', flip);
    timer.stop();
    // $('.ungot').toggleClass('ungot'); // TODO: if you notice no performance issues, delete this shit
    showFailureModal();
  }

  function showFailureModal() {
    $('.failure-greyout').html($('#failure-modal').html());
    $('.failure-greyout').toggleClass('modal-visible');
    $('.again').click(function() {
      $('.failure-greyout').toggleClass('modal-visible');
      setTimeout(restart, 2000);
    })
  }

  function right(pair) {
    incrementLife();
    pair.forEach(function(item) {
      $(item).toggleClass('ungot');
      // $('.game-card__decoration', $(item)).toggleClass('correct-animation');
      setTimeout(function() { $('.game-card__decoration', $(item)).addClass('correct-animation');
                              $('.game-card__decoration', $(item)).toggleClass('deco-flip');}, 300);
    })
    isVictory();
  }

  function wrong(pair) {
    decrementLife();
    var wrongTimeOut = setTimeout(flipBack.bind(null, pair), 1250);
    isLoss(wrongTimeOut);
  }

  function flipBack(pair) {
    pair.forEach(function(item){
      $('.game-card__shape', $(item)).toggleClass('card-flip');
      $('.game-card__decoration', $(item)).toggleClass('deco-flip');
      $(item).on('click', flip);
    })
  }
}
// TODO: style this shit
