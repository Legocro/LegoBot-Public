const ajax = require("superagent");
const Discord = require("discord.js");
exports.cmd = (Client , m , args) => {
	try{
	let id = args[0];
	let callback = (e,r) => {
		if (e || !r.ok){
			m.channel.send("Something went wrong");
			console.log(e.stack);
			console.log(r);
		}else{
			let comic = r.body;
			let yes = new Discord.RichEmbed()
			.setAuthor(`xkcd #${comic.num}`, null , `https://xkcd.com/${comic.num}`)
			.setImage(comic.img)
			.addField("**Title**" , comic.title , true)
			.addField("**Mouseover text**" , comic.alt , true)
			.setTimestamp();
			m.channel.send({embed : yes});
		}
	}

	ajax
	.get(`http://xkcd.com/${id}/info.0.json`)
	.end(callback);
}catch(e){
	console.log(e.stack);
}



}

exports.config = {
	permlevel : 0
}