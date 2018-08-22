const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'accept',
            group: 'moderation',
            memberName: 'accept',
            description: 'Grants nsfw access to specified users',
            examples: [`${client.commandPrefix}accept <@member1> [@member2] [@member3]`],
            userPermissions: ['MANAGE_GUILD'],
            guildOnly: true
        });
    };

    async run(message) {

        let mentions = message.mentions.members.array();

        if (!mentions) {
            return message.embed(new RichEmbed()
                .setColor('RED')
                .setTitle(`Please mention members. See ${this.client.commandPrefix}help accept for help.`)
            );
        } else {
            mentions.forEach(member => {
                if (member.roles.has('473428000147505152')) {
                    return message.embed(new RichEmbed()
                        .setColor('ORANGE')
                        .setDescription(`**Member ${member.toString()} already has NSFW access**`)
                    );
                } else {
                    member.addRole('473428000147505152').then(() => {
                        member.send(new RichEmbed()
                            .setColor('GREEN')
                            .setTitle('You have been granted nsfw access in /r/CodeGeass')
                        );
                        return message.guild.channels.get('293432840538947584').send(new RichEmbed()
                            .setColor('GREEN')
                            .setDescription(`**Granted NSFW access to ${message.member.toString()}**`)
                        );
                    })
                }
            });
        }
    }
}