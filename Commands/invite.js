const Discord = require("discord.js");
exports.cmd = (Client , m , args) => {
	m.channel.send("https://discordapp.com/oauth2/authorize?client_id=317728144020733964&scope=bot");
}

exports.config = {
	permlevel : 0
}