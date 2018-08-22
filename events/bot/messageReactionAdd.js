const { RichEmbed } = require('discord.js');
const settings = require('./messageReactionAdd.json');

module.exports = (reaction, user) => {
    if (settings.hasOwnProperty(reaction.message.id)) {
        let role = reaction.message.guild.roles.get(settings[reaction.message.id][reaction.emoji.name]);
        reaction.message.guild.fetchMember(user).then(member => {
            if (member.roles.has(role.id)) {
                return member.send(new RichEmbed()
                    .setColor('ORANGE')
                    .setTitle(`You already have the ${role.name} role in ${role.guild.name}`)
                );
            } else {
                member.addRole(role).then(member => {
                    return member.send(new RichEmbed()
                        .setColor('GREEN')
                        .setTitle(`Added you the role ${role.name} in ${role.guild.name}`)
                    );
                }).catch(() => {
                    console.error();
                    return member.send(new RichEmbed()
                        .setColor('RED')
                        .setTitle(`Could not add role ${role.name} in ${role.guild.name}. Please contact jokersus#3343`)
                    );
                });
            }
        })
    }
}