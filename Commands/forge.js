const Forge = require("../Arcane/func.js");
const Discord = require("discord.js");


exports.cmd = (Client , m , args) => {
	let item;
	if (args.length == 1) item = args[0];
	if (args.length > 1) item = args.join(" ");
	let baseLink = "http://zombidle.wikia.com/wiki/"
	try{
	let result = Forge.find(item);
	console.log(Forge.find("Ectoplasm") + "2")
	console.log(result + "1");
	let recipe = new Discord.RichEmbed()
	.setTimestamp()
	.setAuthor(result.name , m.author.avatarURL ,`http://zombidle.wikia.com/wiki/${result.name.split(" ").join("_")}`);
	if (typeof result.recipe == "object"){
	recipe
	.addField("**Ingredient #1**" , "\`\`\`"+result.recipe[0]+"\`\`\`", true)
	.addField("**Ingredient #2**" , "\`\`\`"+result.recipe[1]+"\`\`\`" , true)
	.addField("**Ingredient #3**" , "\`\`\`"+result.recipe[2]+"\`\`\`" , true)
	}else{
	recipe.addField("**Obtaining**" , "\`\`\`"+result.recipe+"\`\`\`");
	}
	recipe
	.addField("**Effect**" , "\`\`\`"+result.effect+"\`\`\`" , true)
	.addField("**Craft Duration**" , "\`\`\`"+result.time+"\`\`\`" , true);
	m.channel.send({embed : recipe})
}catch(e) {
	console.log(e.stack);
}



}

exports.config = {
	permlevel : 0
}