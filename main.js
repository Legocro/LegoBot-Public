const Discord = require("discord.js");
const Client = { 
      bot : new Discord.Client(),
      settings : require("./settings.json")}
Client.bot.on("ready" , () => {
	//Client.bot.channels.get('266770415051997197').send("Wus good");
});
Client.bot.on("error" , (e) => {
console.log(e.stack);
});
Client.bot.login(Client.settings.token);
http = require 'http'
handle = (req, res) -> res.end "hit"

server = http.createServer handle

server.listen process.env.PORT || 5000
