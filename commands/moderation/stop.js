const { MessageEmbed, Permissions }                  = require('discord.js');
const { ArgConsts }                                  = require('../../lib');
const { ModerationCommand, ModerationCommandResult } = require('../../modules/moderation');

module.exports = class extends ModerationCommand {
	constructor(client) {
		super(client, {
			actionName:        'stop',
			aliases:           ['stop'],
			description:       {
				content:  'Denies Send Message permissions for @everyone in specified channels.',
				usage:    '[#channel]',
				examples: ['stop', 'stop #channel'],
			},
			userPermissions:   [Permissions.FLAGS.MANAGE_ROLES],
			clientPermissions: [Permissions.FLAGS.MANAGE_ROLES],
			args:              [
				{
					id:       'channels',
					type:     ArgConsts.CHANNELS,
					optional: true,
					default:  m => [m.channel]
				},
				{
					id:       'toggle',
					type:     ArgConsts.WORD,
					optional: true,
					default:  () => 'on'
				},
				{
					id:       'reason',
					type:     ArgConsts.REASON,
					optional: true,
					default:  () => null
				}
			],
			guildOnly:         true,
			ownerOnly:         false,
		});
	}

	async run(message, { channels, toggle: _toggle, reason }) {
		const toggle = _toggle !== 'on';
		const result = new ModerationCommandResult(reason, _toggle);

		await Promise.all(channels.map(async c => {
			try {
				await c.updateOverwrite(message.guild.id, { SEND_MESSAGES: toggle });
			} catch (err) {
				return result.addFailed(c, err.message || 'Unknown error');
			}

			result.addPassed(c);
		}));

		return result;
	}

	async ship(message, result) {
		const embed = new MessageEmbed()
		.setColor(result.getColor());

		if (result.passed.length) {
			embed.addField(`${ result.aux !== 'on' ? 'Allowed' : 'Denied' } message sending permissions in`,
				result.passed.map(r => `<#${ r.id }>`).join(' '));
		}

		if (result.failed.length) {
			embed.addField('Failed', result.failed.map(r => `<#${ r.id }> - ${ r.reason }`).join(' '));
		}

		return message.channel.send(embed);
	}
};
