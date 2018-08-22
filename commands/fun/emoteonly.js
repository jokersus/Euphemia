const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'emoteonly',
            group: 'fun',
            memberName: 'emoteonly',
            description: 'Deletes messages that contain non-emote content.',
            userPermissions: ['MANAGE_GUILD'],
            guildOnly: true
        });
    }

   async run(message) {
        const current = this.client.provider.get(message.channel.id, 'emoteonly', false);
        if (current) {
            this.client.provider.remove(message.channel.id, 'emoteonly');
            await this.client.removeListener('message', current);
            return message.channel.send(new RichEmbed()
                .setColor('GREEN')
                .setDescription('👌 Disabled')
            );
        } else {
            const id = message.channel.id;
            const callback = (message, channelID = id) => {
                if (message.channel.id === channelID) {
                    const args = message.content.match(/\S+/g);
                    if (!args) {
                        return message.delete();
                    } else {
                        if (args.find(x => !/<a:[A-Za-z0-9]+:\d{18}>|<:[A-Za-z0-9]+:\d{18}>/.test(x))) {
                            if (args.find(x=> !/[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug.test(x))) {
                                message.delete();
                            }
                        }
                    }
                }
            };
            await message.channel.send(new RichEmbed()
                .setColor('GREEN')
                .setDescription('👌 Enabled')
            );
            this.client.on('message', callback);
            this.client.provider.set(message.channel.id, 'emoteonly', callback);
        }
    }
};