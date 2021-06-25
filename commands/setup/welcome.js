const { MessageEmbed, Permissions } = require('discord.js');

const ECommand = require('../../lib/ECommand');
const ArgConsts = require('../../lib/Argument/ArgumentTypeConstants');

module.exports = class extends ECommand {
	constructor(client) {
		super(client, {
			aliases: ['welcome'],
			description: {
				content: 'Sets up welcome channel and message. Send without arguments to disable it',
				// usage: '[channel] [{JSON}]',
				usage: [
					'%MENTION       -> mentions user',
					'%NAME%         -> user tag',
					'$MEMBER_COUNT$ -> guild member count',
					'$AVATAR$       -> avatar URL'
				].join('\n'),
				examples: [
					'welcome',
					'welcome #general',
					'welcome {\n\t"content":"%MENTION% has joined!",\n\t"image":"https://image-link.com"\n}'
				]
			},
			userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
			args: [
				{
					id: 'message',
					type: ArgConsts.JSON,
					optional: true,
					default: () => null
				},
				{
					id: 'channel',
					type: ArgConsts.CHANNEL,
					optional: true,
					default: () => null
				},
			],
			guildOnly: true,
			nsfw: false,
			ownerOnly: false,
			rateLimited: false,
			fetchMembers: false,
			cached: false,
		});
	}

	async run(message, args) {
		const entry = this.client.provider.get(message.guild, 'welcome',
			{channel: null, message: {content: null, embed: null}});

		if (!args.channel && !args.message) {
			entry.channel = null;
			await this.client.provider.set(message.guild, 'welcome', entry);
			return 'Disabled welcome message';
		}

		entry.channel = args.channel.id;
		await this.client.provider.set(message.guild, 'welcome', entry);

		if (!args.message) {
			return `Moved welcome message to ${args.channel.toString()}`;
		}

		const json = JSON.parse(args.message);
		const embed = new MessageEmbed(json);

		entry.message.content = json.content;
		entry.message.embed = embed.toJSON();

		if (!entry.channel) {
			await this.sendNotice(message, 'Enabled welcome message. ' +
				'Warning, welcome channel not set. Run `welcome #channel`');
		} else {
			await this.sendNotice(message, `Enabled welcome message in ${args.channel.toString()}`);
		}

		await this.client.provider.set(message.guild, 'welcome', entry);

		return entry;
	}

	async ship(message, result) {
		if (typeof result === 'string') {
			return message.channel.send(new MessageEmbed()
				.setColor('GREEN')
				.setDescription(result)
			);
		}

		return message.channel.send(result.message.content, new MessageEmbed(result.message.embed));
	}
};
