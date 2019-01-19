const { Command } 	= require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const SPANK_ROLE_ID = '422621940868579338'				// Geassed members
const SPANK_EMOTE 	= '<a:LULuche:487228139206868993>'

module.exports = class extends Command {
	constructor(client) {
		super(client, {
			name: 'spank',
			group: 'moderation',
			memberName: 'spank',
			description: 'Spanks naughty people',
			clientPermissions: ['MANAGE_ROLES'],
			guildOnly: true
		});
	}

   async run(message) {
	   if (message.member.hasPermission('MANAGE_ROLES')) {
		   if (message.mentions.members.size) {
			   if (message.member.hasPermission('MANAGE_ROLES')) {
					const targetMember = message.mentions.members.first();
					await targetMember.addRole(SPANK_ROLE_ID);
					const flag = Math.random() * 100 < 15;
					setUnmuteTimeout(this.client, targetMember);
					let messageBody = `${targetMember.toString()} has been spanked by ${message.member.toString()}`;
					if (flag) {	// 20% chance
						messageBody += ' ' + SPANK_EMOTE;
					}
					return message.channel.send(messageBody);
			   }
		   } else {
			   return message.reply('Are you trying to spank thin air?')
		   }
	   } else {
			await message.member.addRole(SPANK_ROLE_ID);
			setUnmuteTimeout(this.client, message.member);
			return message.reply('Nice try. You got yourself spanked.');
	   }
   }
};

function setUnmuteTimeout(client, member) {
	client.setTimeout((member, role) => member.removeRole(role),
		1 * 60000, member, SPANK_ROLE_ID
	);
}
