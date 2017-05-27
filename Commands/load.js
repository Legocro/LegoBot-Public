exports.cmd = (Client , m , args) => {
	console.log(args[0], args);
	if (!(args[0] in Client.commands)){
		Client.commands[args[0]] = require(`./${args[0]}.js`);
		m.channel.send(`Successfully loaded command \`${args[0]}\``)
	} else {
		m.channel.send(`Command \`${args[0]}\` is already loaded, please use \`reload\` instead.`);
	}
}

exports.config = {
	permlevel : 2
}