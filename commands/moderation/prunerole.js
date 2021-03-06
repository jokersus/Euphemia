const { MessageEmbed, Permissions }                  = require('discord.js');
const { ArgConsts, ArgumentType }                    = require('../../lib');
const { ModerationCommand, ModerationCommandResult } = require('../../modules/moderation');

const MAX_MEMBERS_SHIP = 5;

module.exports = class extends ModerationCommand {
	constructor(client) {
		super(client, {
			actionName:      'prunerole',
			aliases:         ['prunerole', 'purgerole'],
			description:     {
				content:  'Removes all members in a role',
				usage:    '<role>',
				examples: ['edit https://discord.com/channels/292277485310312448/292277485310312448/850097454262386738 {JSON}']
			},
			userPermissions: [Permissions.FLAGS.ADMINISTRATOR],
			args:            [
				{
					id:       'role',
					type:     new ArgumentType(
						/.*/,
						ArgConsts.flatten,
						({ guild }, roleRes) => {
							return guild.roles.cache.get(roleRes) ||
								guild.roles.cache.find(r => r.name.toLowerCase() === roleRes.toLowerCase()) ||
								guild.roles.cache.find(r => r.name.toLowerCase().startsWith(roleRes.toLowerCase())) ||
								(() => {
									throw 'Role not found';
								})();
						}
					),
					message:  'Please provide message url',
					optional: true,
					default:  m => m.reference ||
						m.channel.messages.cache.find(i => i.author.id === this.client.user.id) ||
						(() => {
							throw 'Please link to a message';
						})()
				},
				{
					id:       'reason',
					type:     ArgConsts.REASON,
					optional: true,
					default:  () => null
				},
			],
			guildOnly:       false,
			ownerOnly:       true,
		});
	}

	async run(message, { reason, role }) {
		const result = new ModerationCommandResult(reason);

		const members = await Promise.all(role.members.map(async m => {
			await m.roles.remove(role);
			return m;
		}));

		result.addPassed(role);
		result.aux = members.length;

		result._ = { role, members };

		return result;
	}

	async ship(message, { _: { role, members } }) {
		const body = (members.length < MAX_MEMBERS_SHIP ? members : members.slice(0, MAX_MEMBERS_SHIP) + '...')
		.map(m => m.toString()).join(' ');

		return message.channel.send(new MessageEmbed()
			.setColor('GREEN')
			.setDescription(`**Pruned ${ members.length } members in ${ role.toString() }:**\n${ body }`)
		);
	}
};
