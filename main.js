const Discord = require("discord.js");
const fs = require("fs");
const Client = { 
      bot : new Discord.Client(),
      settings : require("./settings.json")}
Client.permlevel = message => {
	if (message.author.id == Client.settings.owner) return 2;
	//if (message.member.has(message.guild.find("name",Client.settings.modrole))) return 1;
	return 0;
}

Client.bot.on("ready" , () => {
	let commandsList = fs.readdirSync('./Commands/'); 
	Client.commands = {}; 
	for (i = 0; i < commandsList.length; i++) {
    	let item = commandsList[i];
   		if (item.match(/\.js$/)) {
        	delete require.cache[require.resolve(`./Commands/${item}`)]; 
        	Client.commands[item.slice(0, -3)] = require(`./Commands/${item}`); 
   		}
	}
	console.log("Ready");
})

Client.bot.on("message", (m) => {
	let message = m;
	let msg = m;
	if (!m.content.startsWith(Client.settings.prefix)) return;
	if (m.author.bot) return;
	let args = m.content.slice(Client.settings.prefix.length).split(" ");
	if (args[0] in Client.commands){
		if(Client.commands[args[0]].config.permlevel > Client.permlevel(m)) return m.channel.send(`You don't have permission to run command \`${args[0]}\`.`);
		Client.commands[args[0]].cmd(Client , m , args.slice(1));
	} else {
		m.channel.send(`Couldn't find command \`${args[0]}\`.`);
	}
})


Client.bot.on('error', (e) => console.error(e));
Client.bot.on('warn', (e) => console.warn(e));

//Client.bot.on('debug', (e) => console.info(e));
Client.bot.login(Client.settings.token);
