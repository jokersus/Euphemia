const pattern = /\[{2}([\w!""#$%&'()*+,\-./:;<=>?@[\]^`{|}~\ ]+?)\]{2}/g;
const index = 'https://warframe.wikia.com/wiki/';

module.exports = message => {
    if (message.channel.id === '467432887474454538') {
        const body = [];
        let match;
        while ((match = pattern.exec(message.content)) !== null) {
            body.push(match[1]);
        }
        if (body.length) {
            message.reply(body.map(m => `\n${index}${normalize(m)}`));
        }
    }
};

function normalize(string) {
    const temp = string.toLowerCase().split(' ');
    return temp.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join('_');
};
