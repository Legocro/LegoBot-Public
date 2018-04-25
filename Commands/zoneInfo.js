const { value, monsterHp, zoneEmbed, baseHs, monsterGold } = require("../Util/zone2");

exports.cmd = (Client, message, args) => {
	try{
	let zone = value(args);
	let hp = monsterHp(zone);
	let hs = baseHs(zone);
	let gold = monsterGold(zone);
//	let mobs = baseMobs(zone);
//	let tcc = baseTcc(zone);
//	let bHp = bossHp(zone)
	let embed = zoneEmbed(zone, hs, hp, gold);
	message.channel.send({embed});
	}catch(e){
		let r = typeof e === "string" ? e : e.stack
		message.channel.send("**ERROR**" + "\n\`\`\`" + r + "\`\`\`");
	}
}


exports.config = {
	permlevel : 0

}
