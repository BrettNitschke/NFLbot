var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var mlb = require('mlb-scores');
var nflScores = require('nfl_scores');
var bot_token = process.env.SLACK_BOT_TOKEN || '';
var scoreString;
var foundTeam = 0;

var rtm = new RtmClient(bot_token);
rtm.start();

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  if (message.text === "Hello.") {
    var channel = "#general"; //could also be a channel, group, DM, or user ID (C1234), or a username (@don)
    rtm.sendMessage("Hello <@" + message.user + ">!", message.channel);
    console.log("message received: " + message.text);
  }


});

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  //console.log(message.text);
  if (message.text === "all.") {
    var channel = "#general"; //could also be a channel, group, DM, or user ID (C1234), or a username (@don)
    //rtm.sendMessage("Let me get that for you <@" + message.user + ">!", message.channel);
    console.log("message received: " + message.text);

    nflScores.refresh(function(err, scores){
      //console.log(scores.games[0].hnn);
      formatScores(scores);
      rtm.sendMessage("This week's scores: \n " + scoreString, message.channel);
    })
    console.log(scoreString);

  }
});

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  //console.log(message.text);
  if (message.text === "NFL.") {
    var channel = "#general"; //could also be a channel, group, DM, or user ID (C1234), or a username (@don)
    //rtm.sendMessage("Let me get that for you <@" + message.user + ">!", message.channel);
    console.log("message received: " + message.text);
    rtm.sendMessage("Which team's score would you like?\n Type 'all.' for all scores", message.channel);

  }
});

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  console.log("Team = " + message.text);

    var team = message.text;
    var channel = "#general";
    nflScores.refresh(function(err, scores){
      console.log(scores);
      findScoreByTeam(scores, team);
      if (foundTeam == 1){
        rtm.sendMessage("The " + team + " score: \n" + scoreString, message.channel);
      }
      console.log(scoreString);
    })

});

function formatScores(scores){
   scoreString = " ";

  for (let i =0, l = scores.games.length; i < l; i++){
    var hnn = scores.games[i].hnn;
    var hs = scores.games[i].hs;
    var vnn = scores.games[i].vnn;
    var vs = scores.games[i].vs;

    scoreString += "*" + hnn + "*" + ": " + hs + " " + vnn + ": " + vs + "\n";
  }

}

function findScoreByTeam(scores, team){
  foundTeam = 0;
  var theTeam = team;
  console.log(theTeam);
  scoreString = " ";
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
    }

  }
}
