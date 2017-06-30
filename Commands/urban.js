const ajax = require("superagent");
const Discord = require("discord.js");
exports.cmd = (Client, m , args) => {
try{
	let title;	
	if(args.length > 1){
		title = args.join(" ");
		args = args.join("+");
	}else{
		title = args[0];
		args = args[0];
	}
	let query = {term : args}
	let callback = (e,r) => {
		if (e || !r.ok){
			m.channel.send("Something went wrong");
			console.log(e.stack);
			console.log(r);
		}else{
			if(r.body.list[0] == undefined) return m.channel.send(`Couldn't find entry for \`${title}\``);
			let meme = new Discord.RichEmbed();
			meme.setAuthor(title);
			meme.addField("**Definiton**" , `\`\`\`${r.body.list[0].definition}\`\`\``);
			meme.addField("**Example**" , `\`\`\`${r.body.list[0].example}\`\`\``);
			meme.setTimestamp();
			m.channel.send({embed : meme});
		}
	}
	ajax
	.get(`http://api.urbandictionary.com/v0/define?term=${args}`)
	.end(callback);
}catch(e){
	console.error(e.stack);
}
}

exports.config = {
	permlevel : 0
}
