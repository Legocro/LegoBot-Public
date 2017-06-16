const Discord = require("discord.js");
clean = (text) => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}


exports.cmd = (Client , m , args) => {
	try{
	let code;
	if (typeof(args) == "string"){
		code = args;
	}else{
		code = args.join(" ");
	}
	console.log(code);
    let evaled = eval(code);
    console.log(typeof evaled);
    if (typeof evaled !== "string"){
    	console.log("kappa");
    	evaled = JSON.stringify(evaled);
      	m.channel.send(`\*\*INPUT:\*\* \n \`\`\`${code}\`\`\` \n \*\*OUTPUT:\*\* \n \`\`\`${clean(evaled)}\`\`\``);
    }else{
    	m.channel.send(`\*\*INPUT:\*\* \n \`\`\`${code}\`\`\` \n \*\*OUTPUT:\*\* \n \`\`\`${clean(evaled)}\`\`\``);
    }
}
    	catch (err) {
      m.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err.stack)}\n\`\`\``);
    } 
}

exports.config = {
	permlevel : 2
}
