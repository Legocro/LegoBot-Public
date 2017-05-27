exports.cmd = (Client, m , args) => {
	try{
	if (args[0] in Client.commands){
		delete require.cache[require.resolve(`./${args[0]}.js`)]; 
		Client.commands[args[0]] = require(`./${args[0]}.js`);
		m.channel.send(`Succesfully reloaded command \`${args[0]}\``);
	}else{
		m.channel.send(`Command \`${args[0]}\` not loaded yet`);
	}
}catch(e){
	m.channel.send(`Error: \`\`\`${e.stack}\`\`\``)
}
}


exports.config = {
	permlevel : 2
}