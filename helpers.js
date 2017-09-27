

module.exports = {


  formatScores: function(scores){
    var scoreString = " ";
    console.log("helper function called");
    console.log(scores);
    for (let i =0, l = scores.games.length; i < l; i++){
      var hnn = scores.games[i].hnn;
      var hs = scores.games[i].hs;
      var vnn = scores.games[i].vnn;
      var vs = scores.games[i].vs;

       scoreString += "*" + hnn + "*" + ": " + hs + " " + vnn + ": " + vs + "\n";
    }
    console.log(scoreString);
    return scoreString;

  },

  findScoreByTeam: function(scores, team){
    var foundTeam = 0;
    var theTeam = team;
    console.log("helper function called");
    var scoreString = " ";
    for (let i = 0, l = scores.games.length; i < l; i++){

      var home = scores.games[i].hnn;
      var away = scores.games[i].vnn;

      if (away === theTeam || home === theTeam) {
        var hnn = scores.games[i].hnn;
        var hs = scores.games[i].hs;
        var vnn = scores.games[i].vnn;
        var vs = scores.games[i].vs;
        foundTeam = 1;
        scoreString = "*" + hnn + "*" + ": " + hs + " " + vnn + ": " + vs + "\n";
        return {
          foundTeam: foundTeam,
          scoreString: scoreString
        };
      }

    }
  }

};
