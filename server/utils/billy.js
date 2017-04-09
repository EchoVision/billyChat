const Cleverbot = require('cleverbot-node');
const {generateMessage} = require('./message.js');

class Billy {
  constructor() {
    this.counter = 0;
    this.bot = new Cleverbot;
    this.bot.configure({botapi: "CC1mgNLwnCwJc5znc-9X6M0Bv9Q"});
  }

  getResponse(string, room) {
    var response;
    var obj;
    var done = false;
    var billyCalled = false;
    if (string.includes("billy") || string.includes("Billy")) {
      billyCalled = true;
      string.replace("billy", "");
      string.replace("Billy", "");
    }

    this.counter++;
    this.bot.write(string, function (res) {
      response = res.output;
      console.log("res1" + response);
      if (billyCalled || Math.random() > 0.75) {
      room.emit('newMessage', generateMessage('billy', response));
    }
    });

    if (string.includes("billy") || string.includes("Billy") || this.counter % 7 == 0) {
      this.counter = 0; // reset counter
      return response;
    }
    return response;
  }
}

module.exports = {Billy};
