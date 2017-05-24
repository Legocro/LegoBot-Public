const Discord = require("discord.js");
const Client = { 
      bot : Discord.Client(),
      settings : require("../settings.json")}
Client.bot.on("ready" , () => {
	Client.bot.channels.get('266770415051997197').send("Wus good");
});
Client.bot.on("error" , (e) => {
console.log(e.stack);
});
Client.bot.login(Client.settings.token);
