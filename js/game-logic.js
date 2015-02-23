game.logic = function(difficulty) {

  if (difficulty === 'hard') {  //shall we paint it black?
    getHard();
  }

  var flips = 0;  //tracks number of flips to identify pair events

  $('.game-card').on('click', flip);

  var timer = game.Timer();  //instancing and starting timer
  timer.start();

  function flip(e) {
    ++flips;
    var card = $(this);
    card.off('click', flip); //turn off flip while card is exposed
    card.toggleClass('guess');  //class identifies card as current selection
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
      $(item).toggleClass('guess'); //cards in pairs are no longer current selections
    })
    return pair;
  }

  function getHard() {  //applies classes with hard aesthetic css rules
    $('.main-content').addClass('hard-board');
    $('.game-card__shape').addClass('hard-card');
    $('.game-card__decoration').addClass('hard-dec');
    $('.title-o').addClass('hard-o');
    $('.heart').addClass('hard-heart');
    $('.game-card').addClass('hard-shape');
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
    lastActive.addClass('broken'); //triggers animation
    lastActive.removeClass('active'); //'active' is used in isLoss() logic
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
    var newTime = game.Time({ min: $('.min').text(), sec: $('.sec').text() });  //creates time to test against top times
    if (difficulty === 'normal') {  //TimeStore has a hard and a normal collection
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
    $('.victory-greyout').html($('#top-time-modal').html());  //loads modal into display
    $('.victory-greyout').toggleClass('modal-visible'); //makes modal visible
    $('.modal-actual').submit(function(e) { //'modal-actual' is the form that submits player's initials
      e.preventDefault();
      newTime.name = $('.initials').val().toUpperCase();  //saves inputted initials into their time
      while (newTime.name.length < 3) { //makes sure there are three characters to display
        newTime.name = '-' + newTime.name;
      }
      if (difficulty === 'normal') {
        game.timeStore.addNormal(newTime);
      } else {
        game.timeStore.addHard(newTime);
      }
      game.timeStore.save();
      showVictoryModal();
    })
  }

  function showVictoryModal() {
    $('.victory-greyout').html($('#victory-modal').html()); //loads victory modal into display
    if (!$('.victory-greyout').hasClass('modal-visible')) { //modal may already be visible
      $('.victory-greyout').toggleClass('modal-visible');
    }
    var topTimes = _.template($('#top-times').html(), { variable: 'm' }); //loads top times
    if (difficulty === 'normal') {
      $('.best-times').html(topTimes({ times: game.timeStore.queryNormal() }));
    } else {
      $('.best-times').html(topTimes({ times: game.timeStore.queryHard() }));
    }
    $('.again').click(function() {
      setTimeout(restart, 2750); //needs timeout to allow modal to fade out before refresh
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
    if (difficulty === 'normal') {
      incrementLife();
    }
    pair.forEach(function(item) {
      $(item).toggleClass('ungot');
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
