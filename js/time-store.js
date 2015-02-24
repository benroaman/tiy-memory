game.TimeStore = function() {
  var collectionNormal = [];
  var collectionHard = [];

  return {
    queryNormal: function() {
      return collectionNormal;
    },

    queryHard: function() {
      return collectionHard;
    },

    addNormal: function(time) {
      var cmp = time;
      var tmp;
      for (var i = 0; i < 5; ++i) {
        if (!collectionNormal[i]) {
          collectionNormal[i] = cmp;
          return;
        } else if (cmp.total < collectionNormal[i].total) {
          tmp = collectionNormal[i];
          collectionNormal[i] = cmp;
          cmp = tmp;
          // I hope this works, it's meant to make it so that when a score ties, the oldest gets priority
          var x = i;
          while (collectionNormal[x + 1] && cmp.total === collectionNormal[x + 1].total) {
            tmp = collectionNormal[x + 1];
            collectionNormal[x + 1] = cmp;
            cmp = tmp;
            ++x;
          }
        }
      }
    },

    addHard: function(time) {
      var cmp = time;
      var tmp;
      for (var i = 0; i < 5; ++i) {
        if (!collectionHard[i]) {
          collectionHard[i] = cmp;
          return;
        } else if (cmp.total < collectionHard[i].total) {
          tmp = collectionHard[i];
          collectionHard[i] = cmp;
          cmp = tmp;
          // I hope this works, it's meant to make it so that when a score ties, the oldest gets priority
          var x = i;
          while (collectionHard[x + 1] && cmp.total === collectionHard[x + 1].total) {
            tmp = collectionHard[x + 1];
            collectionHard[x + 1] = cmp;
            cmp = tmp;
            ++x;
          }
        }
      }
    },

    isTopTimeNormal: function(cmp) {
      for (var i = 0; i < 5; ++i) {
        if (!collectionNormal[i]) {
          return true;
        } else if (cmp.total < collectionNormal[i].total) {
          return true;
        }
      }
    },

    isTopTimeHard: function(cmp) {
      for (var i = 0; i < 5; ++i) {
        if (!collectionHard[i]) {
          return true;
        } else if (cmp.total < collectionHard[i].total) {
          return true;
        }
      }
    },

    save: function() {
      localStorage.setItem('memoryTimesNormalMil', JSON.stringify(collectionNormal));
      localStorage.setItem('memoryTimesHardMil', JSON.stringify(collectionHard));
    },

    load: function() {
      collectionNormal = JSON.parse(localStorage.getItem('memoryTimesNormalMil') || '[]');
      collectionHard = JSON.parse(localStorage.getItem('memoryTimesHardMil') || '[]');
    }
  };
}
