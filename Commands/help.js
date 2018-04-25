const Discord = require("discord.js")
exports.cmd = (Client , m , args) => {
try{
	let help = new Discord.RichEmbed();
	help.addField("**Prefix**" , Client.settings.prefix);
	help.addField("**Commands**" , Object.keys(Client.commands).join(", "));
	help.addField("**Owner**" , "<@204372456339800065>");
	m.author.send({embed : help});
}catch(e){
	m.channel.send(`Error: \`\`\`${e.stack}\`\`\``);
}
}
exports.config = {
	permlevel : 0
}
