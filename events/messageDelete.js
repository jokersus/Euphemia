const { RichEmbed } = require('discord.js');
const moment = require('moment');

const BOT_CHANNEL = '292279509900853248';

module.exports = message => {

	if (message.channel.id === BOT_CHANNEL) {
		return;
	}

    const entry = message.client.provider.get(message.guild, 'messageDelete', false);
    if (entry && entry.log) {

        if (message.content) {

            if (message.content.length >= 1020) {
                message.content = message.content.substring(0, 1020) + '...';
            }

            return message.guild.channels.get(entry.log).send(new RichEmbed()
                .setColor('DARK_PURPLE')
                .setTitle(`🗑 Message deleted in #${message.channel.name}`)
                .setDescription(`${message.member? message.member.toString() : message.author.tag} \`${message.author.id}\``)
                .addField('Content', message.content, false)
                .addField('ID', message.id, false)
                .setTimestamp(moment().toISOString())
            );
        }
    }
};
