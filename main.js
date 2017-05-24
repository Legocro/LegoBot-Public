const Discord = require("discord.js");
const Client = { 
      bot : Discord.Client(),
      settings : require("../settings.json")}
Client.bot.login(Client.settings.token);
