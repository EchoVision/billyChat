const Cleverbot = require('cleverbot-node');
const {generateMessage} = require('./message.js');
var request = require('request');


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
    var nytimes = false;
    if (string.includes("billy") || string.includes("Billy")) {
      billyCalled = true;
      string.replace("billy", "");
      string.replace("Billy", "");
    }
    if (string.includes("news")||string.includes("News")){
      nytimes = true;
      request.get({
      url: "https://api.nytimes.com/svc/topstories/v2/home.json",
      qs: {
        'api-key': "5a3ae8417d944fa5adb387337501da43"
      },
    }, function(err, response, body) {
      body = JSON.parse(body);
      var max = body.num_results - 1;
      var min = 0;
      response = body.results[Math.floor(Math.random() * (max - min + 1)) + min].title;
      //body.results[Math.floor((Math.random * num)+1)].title;
      room.emit('newMessage', generateMessage('nytimes', response ));
    })
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
