const recipes = require("../Arcane/craftArcane.json");
module.exports.find = (name) => {
	try{
	let theOne;
	for (let s in recipes) {
		if(s.toLowerCase() == name.toLowerCase()) {
			theOne = recipes[s];
			theOne.name = s;
			console.log(theOne);
		}
	}
	if(theOne.recipe.length == 1) theOne.recipe = theOne.recipe[0];
	console.log(theOne);
	return theOne;
}catch(e){
	console.log(e.stack);
}
}