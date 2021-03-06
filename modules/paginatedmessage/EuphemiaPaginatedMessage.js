// Buttons soon
const FORWARD_EMOJI  = '➡';
const BACKWARD_EMOJI = '⬅';

const register = async (message, generator, args) => {
	const current = await args.current;

	const firstEmbed = generator(current)
		.setFooter(`1/${args.length}`);

	const botMessage = await message.channel.send(firstEmbed);

	if (args.length === 1) {
		return;
	}

	botMessage.react(BACKWARD_EMOJI).then(() => {
		botMessage.react(FORWARD_EMOJI);
	});

	// Overriding cached message entry
	botMessage.pagination = { generator, args };
};

module.exports = {
	BACKWARD_EMOJI,
	FORWARD_EMOJI,
	register
};
