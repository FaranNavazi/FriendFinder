var allData = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(allData);
  });

  app.post("/api/friends", function(req, res) {
    var user = req.body;

    //Best match logic
    //1-parseInt the scores
    for (let i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    //2-min and max
    var bestFriend = 0;
    var minDifference = 40;

    //3-loop, start from zero and compare user with friends
    //get the difference and add to total difference
    for (let i = 0; i < allData.length; i++) {
      var totalDifference = 0;
      for (let j = 0; j < allData[i].scores.length; j++) {
        var difference = Math.abs(user.scores[j] - allData[i].scores[j]);
        totalDifference += difference;
      }

      if (totalDifference < minDifference) {
        bestFriend = i;
        minDifference = totalDifference;
      }
    }


    //add user to allData
    allData.push(user);
    //The match send to html
    res.json(allData[bestFriend]);
  });
};