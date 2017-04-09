const Cleverbot = require('cleverbot-node');
const $ = require("jQuery");
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

    /*
    this.bot.query(string).then(
      function (res) {
        //obj = JSON.parse(JSON.stringify(res));
        //console.log(obj);
        response = res.output;
        console.log("res1" + response);
        done = true;
      }
    )*/
    this.counter++;
    this.bot.write(string, function (res) {
      response = res.output;
      console.log("res1" + response);
      if (billyCalled || Math.random() > 0.75) {
      room.emit('newMessage', generateMessage('billy', response));
    }
    });

    console.log("res2"+response);

    //console.log(string);
    if (string.includes("billy") || string.includes("Billy") || this.counter % 7 == 0) {
      this.counter = 0; // reset counter
      //console.log(response);
      return response;
    }
    return response;
  }
}

module.exports = {Billy};
