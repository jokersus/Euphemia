const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'request',
            group: 'server',
            memberName: 'request',
            description: 'Request nsfw access',
            examples: [`${client.commandPrefix}request`],
            guildOnly: true
        });
    };

    async run(message) {
        if (message.guild.id !== '292277485310312448') {
            return;
        }

        if (message.member.roles.has('473428000147505152')) {
            message.author.send(new RichEmbed()
                .setColor('RED')
                .setTitle('You already have nsfw access in /r/CodeGeass')
            ).then(reply => message.delete())
        } else {
            return message.guild.channels.get('293432840538947584').send(new RichEmbed()
                .setColor('PURPLE')
                .setTitle('New NSFW access request')
                .addField(`Member`, `${message.member.toString()} \`${message.member.id}\``)).then(notice => {
                    notice.react('✅');
                    const filter = (reaction, user) => true;
                    notice.awaitReactions(filter, {limit: 100000000, maxUsers: 2}).then(messageReactions => {
                        message.member.addRole(message.guild.roles.get('473428000147505152')).then(() => {
                            message.member.send(new RichEmbed()
                                .setColor('GREEN')
                                .setTitle('You have been granted nsfw access in /r/CodeGeass')
                            );
                            message.guild.channels.get('293432840538947584').send(new RichEmbed()
                                .setColor('GREEN')
                                .setDescription(`**Granted NSFW access to ${message.member.toString()}**`)
                            );
                            notice.clearReactions().catch(console.error);
                        })
                    })
                }).then(() => {
                message.member.send(new RichEmbed()
                    .setColor('ORANGE')
                    .setTitle('Your request has been recorded')
                ).then(() => message.delete())
            }).catch(() => {
                message.member.send(new RichEmbed()
                    .setColor('DARK_RED')
                    .setTitle(`An error occured. PLease contact ${message.client.owners[0].tag}`)
                );
            })
        }
    }
}