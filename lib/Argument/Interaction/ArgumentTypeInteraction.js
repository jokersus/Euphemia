const {ApplicationCommandOptionTypes: Types} = require('discord.js');

class ArgumentTypeInteraction {
	constructor(type = Types.STRING, normalizer = _ => _, finder = (context, _) => _, choices = []) {
		this.type = type;
		this.choices = choices;

		this.normalizer = normalizer;
		this.finder = finder;
	}
}

module.exports = {
	ArgumentTypeInteraction
};
