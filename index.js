const Discord = require('discord.js');
const request = require('request');
client = new Discord.Client();

client.on('ready', () => {
  checkhttps();
  setInterval(checkhttps, 60000);
});

lateststream = false;
function checkhttps() {
  console.log("Checking HTTPS APIs")
  request.get({
    url: 'https://api.twitch.tv/kraken/streams/xxmeep3rgirlxx?client_id=' + secret_token
  }, function(error, response, body) {
  data = JSON.parse(body)
  if (data.stream !== null) {
    if (!lateststream == data.stream["_id"]) announce("Caia is LIVE on Twitch! Grab some popcorn :popcorn: and start watching at <https://twitch.tv/xxmeep3rgirlxx>!")
    lateststream = data.stream["_id"];
  } else {
    lateststream = false;
  }
  date = new Date();
  if (date.getDay() == 2 || date.getDay() == 6) {
  if (date.getHours() == 21) {
    if (date.getMinutes() == 0) {
      announce("It's time for a new Gourmet Hound WEBTOOOOoOOOOoON!")
    }
  }
}
});
}

function announce(msg) {
guilds = client.guilds.array();
for (i = 0; i < guilds.length; i++) {
  if (guilds[i].systemChannelID !== null) { client.channels.get(guilds[i].systemChannelID).send(msg) }
}
}
