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
					const targets = message.mentions.members;
					await targets.tap(async member => member.addRole(SPANK_ROLE_ID));
					const flag = Math.random() * 100 < 15;
					return message.send(`${targets
						.map(member => member.toString())
						.join(' ')}
						${targets.size === 1 ? '' : ' all '} got spanked by ${message.member.toString()}
						${flag ? SPANK_EMOTE : ''}
					`);
			   }
		   } else {
			   return message.reply('Are you trying to spank thin air?')
		   }
	   } else {
		   await message.member.addRole(SPANK_ROLE_ID);
		   return message.reply('Nice try. You got yourself spanked.');
	   }
	}
};
