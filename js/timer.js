game.Timer = function() {
  var clock = $('.game-timer');
  var min = $('.min');
  var sec = $('.sec');
  var timer;

  function updateTimer() {
    secNum = Number(sec.text());
    minNum = Number(min.text());
    ++secNum;
    if (secNum < 10) {
      sec.text('0' + secNum);
    } else {
      sec.text(secNum);
    }
    if (secNum === 60) {
      sec.text('00');
      ++minNum;
      if (minNum < 10) {
        min.text('0' + minNum);
      } else {
        min.text(minNum);
      }
    }
  }

  return {
    start: function() {
      timer = setInterval(updateTimer, 1000);
    },
    stop: function() {
      clearInterval(timer);
    },
    reset: function() {
      min.text('00');
      sec.text('00');
    }
  }

}
