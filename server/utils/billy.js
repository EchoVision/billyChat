const Cleverbot = require('cleverbot');

class Billy {
  constructor() {
    this.counter = 0;
    this.bot = new Cleverbot({
      key: 'CC1mgNLwnCwJc5znc-9X6M0Bv9Q'
    });
  }

  getResponse(string) {
    var response;
    var obj;
    var done = false;
    this.bot.query(string).then(
      function (res) {
        //obj = JSON.parse(JSON.stringify(res));
        //console.log(obj);
        response = res.output;
        console.log("res1"+response);
        done = true;
      }
    )
    while(done !=true){
      
    }
    //console.log("res2"+response);
    this.counter++;
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
