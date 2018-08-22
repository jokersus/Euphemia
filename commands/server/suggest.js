const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'suggest',
            group: 'server',
            memberName: 'suggest',
            description: 'Forwards a public suggestion message to the moderators',
            examples: [`${client.commandPrefix}suggest Change the server icon to something pinker`, `${client.commandPrefix}suggest --set #channel`],
            guildOnly: true
        });
    };

    async run(message) {
        let args = message.content.split(' ');
        if (args[1] === '--set') {
            if (message.member.hasPermission('MANAGE_GUILD')) {
                let mention = message.mentions.channels.array()[0];
                if (!mention) {
                    return message.channel.send(new RichEmbed()
                        .setColor('ORANGE')
                        .setTitle('Please mention a channel')
                    );
                } else {
                    this.client.provider.set(message.guild, 'suggest', mention.id)
                    return message.channel.send(new RichEmbed()
                        .setColor('GREEN')
                        .setDescription(`**Suggest channel set to ${mention.toString()}**`)
                    );
                }
            } else {
                return message.channel.send(new RichEmbed()
                    .setColor('RED')
                    .setTitle('You need Manage Guild permissions to use this command')
                );
            }
        } else {
            let entry = this.client.provider.get(message.guild, 'suggest', false);
            if (!entry) {
                return message.delete().then(message => {
                    message.channel.send(new RichEmbed()
                        .setColor('ORANGE')
                        .setTitle('No suggest channel set. Please contact the moderators')
                    );
                }).catch();
            } else {
                return message.guild.channels.get(entry).send(new RichEmbed()
                    .setTitle(`💡 ${message.author.tag} has made a suggestion`)
                    .setColor(message.member.displayColor)
                    .setThumbnail(message.author.avatarURL)
                    .setDescription(message.content.substring(9, message.content.length))
                ).then(() => {
                    message.channel.send(new RichEmbed()
                        .setTitle(`💡 ${message.author.tag} has made a suggestion`)
                        .setColor(message.member.displayColor)
                        .setThumbnail(message.author.avatarURL)
                        .setDescription(message.content.substring(9, message.content.length))
                    ).then(() => message.delete());
                })
            }
        }
    }
}