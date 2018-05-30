const Discord = require('discord.js');
const request = require('request');
const ontime = require('ontime');

client = new Discord.Client();

process.on('uncaughtException', function(err) {
  console.log(err);
});

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {

  checkhttps();
  setInterval(checkhttps, 60000);

ontime({
    cycle: '2-10T00:00:00'
}, function (ot) {
    announce("IT'S IALONE'S BIRTHDAY!!!! :confetti_ball: :birthday:")
    ot.done()
    return
})
ontime({
    cycle: [ 'tue 21:00:00', 'sat 21:00:00' ]
}, function (ot) {
    announce("9 PM HYPE READ GOURMET HOUND NOW1!1!!1111111!!!1!1!!!!!!")
    ot.done()
    return
})
ontime({
    cycle: '7:30:00'
}, function (ot) {
  request.get({
    url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Burlingame%2C%20CA%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
  }, function(error, response, body) {
  data = JSON.parse(body)
  weather = data["query"]["results"]["channel"]["item"]["forecast"][0]
  announce("Today it looks like it's gonna be " + weather.text.toLowerCase())
  ot.done()
  return
});
})

});
client.on('message', msg => {
  if (msg.content.toLowerCase() === '!is lamps gonna be canon') {
    msg.reply('yes');
  }
  if (msg.content.toLowerCase() === '!is vivi x jinsei gonna be canon') {
    msg.reply('yes');
  }
});

lateststream = false;
function checkhttps() {
  client.user.setStatus('online');
  request.get({
    url: 'https://api.twitch.tv/kraken/streams/xxmeep3rgirlxx?client_id=8t77aeilj8dg3sgby79yrpwde511ol'
  }, function(error, response, body) {
  try { data = JSON.parse(body) } catch(e) { data = {"stream": null}; }
  if (data.stream !== null) {
    if (!lateststream == data.stream["_id"]) announce("Caia is live on Twitch! Check it out at <https://twitch.tv/xxmeep3rgirlxx>!")
    lateststream = data.stream["_id"];
  } else {
    lateststream = false;
  }
});
}

function announce(msg) {
guilds = client.guilds.array();
for (i = 0; i < guilds.length; i++) {
  if (guilds[i].systemChannelID !== null) { client.channels.get(guilds[i].systemChannelID).send(msg) }
}
}
