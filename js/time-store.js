game.TimeStore = function() {
  var collection = [];

  return {
    query: function() {
      return collection;
    },

    add: function(time) {
      var cmp = time;
      var tmp;
      for (var i = 0; i < 5; ++i) {
        if (!collection[i]) {
          collection[i] = cmp;
          return;
        } else if (cmp.total < collection[i].total) {
          tmp = collection[i];
          collection[i] = cmp;
          cmp = tmp;
        }
      }
      // if (cmp === time) {
      //   return false;
      // } else {
      //   return true;
      // }
    },

    isTopTime: function(cmp) {
      for (var i = 0; i < 5; ++i) {
        if (!collection[i]) {
          return true;
        } else if (cmp.total < collection[i].total) {
          return true;
        }
      }
    },

    save: function() {
      localStorage.setItem('memoryTimes', JSON.stringify(collection));
    },

    load: function() {
      collection = JSON.parse(localStorage.getItem('memoryTimes') || '[]');
    }
  };
}
