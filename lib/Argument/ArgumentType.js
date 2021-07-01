class ArgumentType {
	constructor(regex, normalizer = _ => _, finder = (context, _) => _, type = 'STRING', slashNormalizer = e => e.value) {
		this.regex = regex;
		this.normalizer = normalizer;
		this.finder = finder;
		this.type = type;
		this.slashNormalizer = slashNormalizer;
	}
}

module.exports = ArgumentType;
