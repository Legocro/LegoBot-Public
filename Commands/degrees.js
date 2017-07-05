convert = function(d1 , d2 , num ) {
	let poss = ["k" , "f" , "c"];
	if (!poss.includes(d1.toLowerCase())) return "Possible units are C, F and K.";
	if (!poss.includes(d2.toLowerCase())) return "Possible units are C, F and K.";
	if (!typeof num == "number") return "Degrees must be a number.";
	d1 = d1.toUpperCase();
	d2 = d2.toUpperCase();
	return Number(table[`${d1}2${d2}`](num)); 
}

let table = {
	C2F : x => {return x * 1.8 + 32},
	F2C : x => {return (x - 32) * 5/9},
	K2C : x => {return x - 273},
	C2K : x => {return x + 273},
	K2F : x => {return this.c2f(x-273)},
	F2K : x => {return this.f2c(x) + 273}
}

exports.cmd = (Client , m , args) => {
	try{
	let usage = "Proper usage is \`m~degrees <degrees> <unit_1> in <unit_2>";
	if (args.length < 4 || typeof convert(args[1] , args[3] , args[0]) != "number") return m.channel.send(usage || usage + "\n" + convert(args[1] , args[3] , args[0]));
	m.channel.send(`${args[0]}${args[1].toUpperCase()} is equal to ${convert(args[1] , args[3] , args[0]).toPrecision(4)}${args[3].toUpperCase()}`);
}catch(e){
	console.log(e.stack);
}}

exports.config = {
	permlevel : 0
}
