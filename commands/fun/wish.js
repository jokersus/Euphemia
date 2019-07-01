const packageJSON = require('../../package.json');

const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

const TANABATA_COLOR = '#FFCBE2'
const TANABATA_CHANNEL = '595362733382303757';

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'wish',
			group: 'fun',
			memberName: 'wish',
			description: 'Records your Tanabata wishes.',
			clientPermissions: ['MANAGE_MESSAGES'],
			aliases: ['tanabata'],
			examples: [
				`wish [Sends you your wishes, if recorded]`,
				`wish First Wish | Second Wish`
			]
		});
	}

	async run(message) {
		// Delete message after two seconds
		this.client.setTimeout(message => {
			if (!message.deleted) {
				message.delete();
			}
		}, 2000, message);

		// If there are no wishes
		if (!message.argString) {
			return message.channel.send(new RichEmbed()
				.setColor('RED')
				.addField('Please enter your wishes', `Syntax: \`${message.guild.commandPrefix}${this.examples[0]}\``)
			);
		}

		const tanabataChannel = message.guild.channels.get(TANABATA_CHANNEL);

		if (!tanabataChannel) {
			return message.channek.send(new RichEmbed()
				.setColor('RED')
				.setTitle('I do not have access to the Tanabata channel. Please contact the moderators')
			);
		}

		const wishes = message.argString.split('|').map(wish => wish.trim());

		// If there are fewer than two wishes
		if (wishes.length < 2 || !wishes[1]) {
			return message.channel.send(new RichEmbed()
				.setColor('RED')
				.addField('Please enter two wishes', `Syntax: \`${message.guild.commandPrefix}${this.examples[0]}\``)
			);
		}

		const reply = await message.channel.send(new RichEmbed()
			.setColor('GREEN')
			.setTitle('Encrypting...')
		);

		const cryptoHash = require('crypto').createHash('sha256');
		const hash = cryptoHash.update(message.author.id).digest('base64');

		if (!hash) {
			return message.channel.send(new RichEmbed()
				.setColor('RED')
				.addField('An error occured while encrypting your ID', `Please contact ${packageJSON.author}`)
			);
		}

		const db = this.client.sqlite;

		const oldWishMessageId = (result => {
			return result ? (result.message_id || null) : null;
		})(await db.get('SELECT message_id FROM Wishes WHERE id = (?) LIMIT 1', hash));

		// If new wish
		if (!oldWishMessageId) {
			const newWishMessage = await tanabataChannel.send(new RichEmbed()
				.setColor(TANABATA_COLOR)
				.setTitle('🌸 Someone has made a wish')
				.addField('Wish 1', wishes[0])
				.addField('Wish 2', wishes[1])
			);

			await db.run(`INSERT INTO Wishes(id, wish_1, wish_2, message_id) Values((?), (?), (?), (?))`, hash, wishes[0], wishes[1], newWishMessage.id);

			return reply.edit('', new RichEmbed()
				.setColor('GREEN')
				.addField('Recorded your wish. Thanks for participating.', 'You can edit your wish by running the command again.')
			);
		}

		console.log(oldWishMessageId);

		const wishMessage = await (async id => {
			try {
				const message = await tanabataChannel.fetchMessage(oldWishMessageId);
				return message;
			} catch (e) {
				return await tanabataChannel.send('~');
			}
		})(oldWishMessageId);

		wishMessage.edit('', new RichEmbed()
			.setColor(TANABATA_COLOR)
			.setTitle('🌸 Someone has made a wish')
			.addField('Wish 1', wishes[0])
			.addField('Wish 2', wishes[1])
		);

		await db.run('UPDATE Wishes SET wish_1 = (?), wish_2 = (?), message_id = (?) WHERE id = (?)', wishes[0], wishes[1], hash, wishMessage.id);

		return reply.edit('', new RichEmbed()
			.setColor('GREEN')
			.setTitle('Updated your wish')
		);
	}
};
