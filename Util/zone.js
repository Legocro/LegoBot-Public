const Decimal = require("decimal.js");
const { RichEmbed } = require("discord.js");
const max = Math.max;
const min = Math.min;
const ceil = Math.ceil;
const floor = Math.floor;
const pow = Math.pow;
const util = { };

util.value = args => {
	let string = args[0];
 	let rx = /(\d+e\d+|\d+\.\d+|\d+[^\d\s]|^$|\D+)/;
	if (rx.test(string) || args[0] === undefined){
		throw "Please enter a valid positive integer value."; 
	}
	console.log(string);
	return parseInt(string);
}

util.monsterHp = zone => {
	 return zone <= 140 ? util.hpZone140(zone) : zone <= 500 ? util.hpZone500(zone) : zone <= 200000 ? util.newHp(zone) : util.hpPastZone200k(zone);
}

util.monsterGold = zone => {
	let ten = new Decimal(10);
	let base1 = new Decimal(1.6);
	let base2 = new Decimal(1.15);
	let times = floor(zone/500);
	return ten
	.times(base1
		.pow(min(zone, 140) + min(zone, 140) - 1)
		.times(base2
			.pow(max(zone-140, 0)) 
			) 
		).times(zone > 500 ? 1+0.4*(times-1) : 1).toPrecision(4);
}
util.baseHs = zone => {
	return {
		base : floor( pow((zone - 80)/25,1.3 ) ),
		tp : 20
	}
}

util.zoneEmbed = (zone, hs, hp, gold) => {
	let time = util.instakill(zone);
	const embed = new RichEmbed()
	.setTitle("**Zone information**")
	.addBlankField()
	.addField("Zone" , `**\`${zone}\`**`)
	.addField("Health" , `**\`${hp}\`**`, true)
	.addField("Gold" , `**\`${gold}\`**`, true)
	.addField("Hero Souls" , `**\`${hs.base} + 20\`**`)
	.addField("Time to instakill up to it at 2 mobs per zone", `**\`${time}\`**`);

	return embed;

}
util.hpZone140 = zone => {
	console.log(1);
	let isBoss = zone%10 == 0 ? 1 : 10;
	hp = floor(10*(zone-1 + pow(1.55, (zone-1)) )* isBoss);
	return hp.toPrecision(4);
}

util.hpZone500 = zone => {
	console.log(2);
	let isBoss = zone%10 == 0 ? 1 : 10;
	let hp = floor(10 * (139 + pow(1.55, 139) * pow(1.145, zone - 140)) * isBoss);
	return hp.toPrecision(4);
}

util.newHp = zone => {
	let isBoss = zone%10 == 0 ? 1 : 10;
	let baseScale = 1.145;
	let baseHp = new Decimal(pow(1.55, 139) * pow(1.145, 360));
	//console.log("[BASE HP]",baseHp.toPrecision(4))
	let times = floor(zone/500);
	let finalScale = 1.145 + 0.001*times;
	let finalScaleHp = new Decimal(finalScale).pow(zone-500*times).times(isBoss);
	console.log("[FINAL SCALE HP]" , finalScaleHp.toPrecision(4))
	let hp = finalScaleHp.times(baseHp);
	for (let i = 1; i < times; i++){
		hp = new Decimal(baseScale+i*0.001).pow(500).times(hp);
		console.log("HP" , i , hp.toPrecision(4))
	}
	hp = hp.times((times - 1) * 0.4 + 10);
	return hp.toPrecision(4);

}

util.hpPastZone200k = zone => {
	console.log(3);
	let isBoss = zone%10 == 0 ? 1 : 10;
	let hp200k = new Decimal("1.24e25409")
	let hp = new Decimal(1.545).pow(zone-200001).times(hp200k);
	return hp.toPrecision(4);
}
util.instakill = (zones) => {
	let kumaEffect = 8;
	let seconds = (kumaEffect - Math.floor(kumaEffect)) * (1 * Math.floor(zones / 5) + (zones - Math.floor(zones / 5)) * (15 * (-1 + 10 - Math.ceil(kumaEffect)) + 1 * 1)) / 30 + (1 * Math.floor(zones / 5) + (zones - Math.floor(zones / 5)) * (15 * (-1 + 10 - Math.floor(kumaEffect)) + 1 * 1)) * (-kumaEffect + Math.floor(kumaEffect) + 1.0) / 30;
	return util.formatTime(seconds);
}

util.formatTime = (s) => {
	let h = floor(s/3600);
	let m = floor((s - h*3600)/60)
	let sf = floor(s - (h*3600 + m*60));
	h = util.toTwo(h);
	m = util.toTwo(m);
	sf = util.toTwo(sf);
	return `${h}:${m}:${sf}`;
}

util.toTwo = (x) => {
	return x.toString().length > 1 ? x : "0"+ x;
}
module.exports = util;
