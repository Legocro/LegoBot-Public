const Discord = require("discord.js");
const fs = require("fs");
const Client = { 
      bot : new Discord.Client(),
      settings : require("./settings.json")}
Client.permlevel = message => {
	if (Client.settings.owner.includes(message.author.id)) return 2;
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
	Client.bot.user.setGame("m~help");
	console.log("Ready");
})

Client.bot.on("message", (m) => {
	let message = m;
	let msg = m;
	if (!m.content.startsWith(Client.settings.prefix)) return;
	if (m.author.bot) return;
	let args = m.content.slice(Client.settings.prefix.length).split(" ");
	if (args[0] in Client.commands){
		if(Client.commands[args[0]].config.permlevel > Client.permlevel(m)){
			let yo = new Discord.RichEmbed();
			yo.setAuthor(m.author.tag)
			.addField("**Code**" , `\`\`\`${args.slice(1).join(" ")}\`\`\``)
			.setColor([255,0,0]);
			if (args[0] == "eval") Client.bot.guilds.get("266770415051997197").channels.get("348140377972146177").send({embed : yo});
			m.channel.send(`You don't have permission to run command \`${args[0]}\`.`);
			return
		}
		Client.commands[args[0]].cmd(Client , m , args.slice(1));
	} else {
		//m.channel.send(`Couldn't find command \`${args[0]}\`.`);
	}
});

Client.bot.on("guildMemberAdd" , m => {
	if(m.guild.id === "331413046998204417") return m.guild.channels.get("331413514822483972").send(`Welcome ${m.user.toString()} to the server!`).then(m.addRole("338255744208076801").catch(e => Client.bot.users.get(Client.settings.owner).send(e.stack)));
});
//Client.bot.on("guildMemberRemove" , m => {
//	if(m.guild.id === "331413046998204417") return m.guild.channels.get("331413514822483972").send(`Goodbye \*\*${m.user.tag}\*\*, sorry to see you go!`);
//});

Client.bot.on('error', (e) => console.error(e));
Client.bot.on('warn', (e) => console.warn(e));

//Client.bot.on('debug', (e) => console.info(e));
Client.bot.login(Client.settings.token);
