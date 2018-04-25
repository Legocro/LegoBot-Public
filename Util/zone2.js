const Decimal = require("decimal.js");
const { RichEmbed } = require("discord.js");
const max = Math.max;
const min = Math.min;
const ceil = Math.ceil;
const floor = Math.floor;
const pow = Math.pow;
const util = { };
const levelWhereScaleChanges = new Decimal(1.55).pow(139).times(10);
const monsterLifeAtFiveHundred = new Decimal(4.2274769566067055354e48);
const healthAt200k = new Decimal("1.240e25409");


util.value = args => {
	let string = args[0];
 	let rx = /(\d+e\d+|\d+\.\d+|\d+[^\d\s]|^$|\D+)/;
	if (rx.test(string) || args[0] === undefined){
		throw "Please enter a valid positive integer value."; 
	}
	console.log(string);
	return parseInt(string);
}
//WRONG!!!
util.monsterGold = zone => {
	let ten = new Decimal(10);
	let base1 = new Decimal(1.6);
	let base2 = new Decimal(1.15);
	return ten
	.times(base1
		.pow(min(zone, 140) + min(zone, 140) - 1)
		.times(base2
			.pow(max(zone-140, 0)) 
			) 
		).toPrecision(4);
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
util.monsterByFiveHun = (zone) => {
    let health = monsterLifeAtFiveHundred;

    let multi = Math.floor(zone / 500);
    let multiplier = 1.146;
    for (let i = 0; i < multi - 1; i++) {
      health = new Decimal(multiplier).pow(500).times(health);
      multiplier += 0.001;
    }
    return health;

  }

util.monsterHp = (zone) => {
    let health = new Decimal(1);

    if (zone <= 140) {
      health = new Decimal(1.55).pow(zone - 1).times(10);

    } else if (zone <= 500) {

      health = new Decimal(1.145).pow(zone - 140).times(levelWhereScaleChanges);

    } else if (zone > 200000) {
      health = new Decimal(1.545).pow(zone - 200001).times(healthAt200k);
    } else {

      let zoneF = Math.floor(zone / 500);
      let zoneFM = zoneF * 500;
      let zoneS = zone - zoneFM;
      let zoneM = 1.145 + zoneF * 0.001;
      let zoneH = util.monsterByFiveHun(zoneFM);

      health = new Decimal(zoneM).pow(zoneS).times(zoneH);
    }

    health = health.add((zone - 1) * 10);

    if (zone % 5 == 0) {
      health = health.times(util.bossHPMulti(zone));
    }
    return Decimal.ceil(health).toPrecision(4);
  }

util.bossHPMulti = (zone) => {
    let hp = 1 + Math.floor(zone / 500) * 0.04;
    return Math.max(hp * 10, 5);
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
	return `${h}h : ${m}m : ${sf}s`;
}

util.toTwo = (x) => {
	return x.toString().length > 1 ? x : "0"+ x;
}
module.exports = util;
