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
      localStorage.setItem('memoryTimesNormal', JSON.stringify(collectionNormal));
      localStorage.setItem('memoryTimesHard', JSON.stringify(collectionHard));
    },

    load: function() {
      collectionNormal = JSON.parse(localStorage.getItem('memoryTimesNormal') || '[]');
      collectionHard = JSON.parse(localStorage.getItem('memoryTimesHard') || '[]');
    }
  };
}
