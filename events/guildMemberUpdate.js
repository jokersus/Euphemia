const { RichEmbed } = require('discord.js');
const CG_LEVELED_ROLES = [
	// '424582117012406272', '424582023085293569',
	// '424581929635938305', '424581772014256138',
	// 	'424581634243690509', '424581537250672640',
	// 	'424581432304730112', '424581237559263242'
	// ];
	// [
		"424581237559263242", "424581432304730112",
		"424581537250672640", "424581634243690509",
		"424581772014256138", "424581929635938305",
		"424582023085293569", "424582117012406272"
	];

const CG_LEVELED_ROLES_NOTIF_CHANNEL = '292279509900853248';

module.exports = async (oldMember, newMember, Client) => {
    const entry = Client.provider.get(newMember.guild, 'guildMemberUpdate', false);
    if (entry && entry.log) {
        if (oldMember.nickname !== newMember.nickname) {
            const body = newMember.nickname? `**${newMember.user.tag}** has changed their nickname` + (oldMember.nickname? ` from **${oldMember.nickname}**` : ``) + ` to **${newMember.nickname}**`
                : `**${newMember.user.tag}** has removed their nickname, **${oldMember.nickname}**`;
            newMember.guild.channels.find(val => val.id === entry.log).send(new RichEmbed()
                .setColor('GREEN')
                .setThumbnail(newMember.user.avatarURL)
                .setTitle('Nickname change')
                .setDescription(body)
                .setTimestamp((new Date()).toISOString())
            );
        }

        if (oldMember.user.tag !== newMember.user.tag) {
            newMember.guild.channels.find(val => val.id === entry.log).end(new RichEmbed()
                .setColor('GREEN')
                .setThumbnail(newMember.user.avatarURL)
                .setTitle('Username change')
                .setDescription(`**${oldMember.user.tag}** has changed their username to **${newMember.user.tag}**`)
                .setTimestamp((new Date()).toISOString())
            );
        }
    }


	// CG stuff
	// Apologies in advance

	if (newMember.guild.id !== '292277485310312448' || Client.users.get(newMember.id).LEVELED_ROLE_LOCK) {
		return;
	} else {
		Client.users.get(newMember.id).LEVELED_ROLE_LOCK = true;

		const leveledRoles = newMember.roles.filter(role => CG_LEVELED_ROLES.includes(role.id));
		const sortedRoles = leveledRoles.sort((a, b) => a.position - b.position).map(role => role.id);


		// Maybe another day

		// const leveledRoles = newMember.roles
		// 	.filter(role => CG_LEVELED_ROLES.includes(role.id))
		// 	.sort((a, b) => a.position - b.position)
		// 	.map(role => role.id)

		await newMember.removeRoles(sortedRoles.slice(0, -1));

		if (sortedRoles.length) {
			newMember.guild.channels
				.get(CG_LEVELED_ROLES_NOTIF_CHANNEL)
				.send(`🆙  |  ${newMember.toString()} is now ${newMember.guild.roles.get(sortedRoles[sortedRoles.length - 1]).name}!`);
		}

		Client.users.get(newMember.id).LEVELED_ROLE_LOCK = false
	}

















};
