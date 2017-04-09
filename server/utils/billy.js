const Cleverbot = require('cleverbot');

class Billy {
  var counter = 0;
  let bot;
  constructor() {
    this.bot = new Cleverbot({
      key: 'CC1mgNLwnCwJc5znc-9X6M0Bv9Q'
    });
  }

  function getResponse(string) {
    var response;
    cleverbot.query(string).then(
      function (res) {
        response = res;
      }
    )
    counter++;
    if (string.includes("billy") || string.includes("Billy") || counter % 7 == 0) {
      counter = 0; // reset counter
      return response;
    }
    return null; 
  }
}

module.exports = {Billy};
