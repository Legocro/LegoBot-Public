const Discord = require("discord.js");
const Client = { 
      bot : new Discord.Client(),
      settings : require("../settings.json")}
Client.bot.on("ready" , () => {
	Client.bot.channels.get('266770415051997197').send("Wus good");
});
Client.bot.on("error" , (e) => {
console.log(e.stack);
});
Client.bot.login(Client.settings.token);

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.send('Hello World!')
})
