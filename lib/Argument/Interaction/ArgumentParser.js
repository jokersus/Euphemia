class ArgumentParser {
	constructor(args) {
		this.args = args;
		this.parser = null;
	}

	parseInteractionOptions() {
		return this.args.map(arg => ({
			type: arg.type.type,
			name: arg.id,
			description: arg.description,
			required: !arg.optional,
			choices: arg.choices
		}));
	}

	async parse(interaction, options) {
		const ship = {};

		this.args.forEach(arg => {
			const option = options.get(arg.id);
			if (option) {
				ship[arg.id] = arg.type.slashNormalizer(option);
				return;
			}

			ship[arg.id] = arg.default(interaction);
		});

		return ship;
	}
}

module.exports = ArgumentParser;
