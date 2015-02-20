$(function () {

  function processHash() {
    var hash = location.hash || '#';

    if (!game.router.run(hash.slice(1))) {
      game.pageNotFound();
    }
  }

  window.addEventListener('hashchange', processHash);
  processHash();

});
