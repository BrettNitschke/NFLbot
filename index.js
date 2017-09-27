var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

var helpers = require('./helpers');
var nflScores = require('nfl_scores');
var bot_token = process.env.SLACK_BOT_TOKEN || '';
//var scoreString;
//var foundTeam = 0;

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
  if (message.text === "NFL.") {
    var channel = "#general";
    console.log("message received: " + message.text);
    rtm.sendMessage("Which team's score would you like?\n Type 'all.' for all scores", message.channel);

  }
});

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  if (message.text === "all.") {
    var channel = "#general";
    nflScores.refresh(function(err, scores){
      scoreString = helpers.formatScores(scores);
      rtm.sendMessage("This week's scores: \n " + scoreString, message.channel);
    })
    console.log(scoreString);

  }
});


rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
    console.log("Team = " + message.text);
    var team = message.text;
    var channel = "#general";
    nflScores.refresh(function(err, scores){
      var results = helpers.findScoreByTeam(scores, team);
      if (results.foundTeam == 1){
        rtm.sendMessage("The " + team + " score: \n" + results.scoreString, message.channel);
      }
    })

});
