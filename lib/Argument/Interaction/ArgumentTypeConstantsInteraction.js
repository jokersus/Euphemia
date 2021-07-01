// const {ApplicationCommandOptionTypes: Types} = require('discord.js');
//
// const {ArgumentTypeInteraction: ArgumentType} = require('./ArgumentTypeInteraction');
//
// const moment = require('moment');
//
// const flatten = ids => ids[0].trim();
//
// // const idExtract = ids => {
// // 	return ids.map(i => /\d+/g.exec(i)[0].trim());
// // };
//
// // const idExtractFlatten = ids => {
// // 	return idExtract(ids)[0].trim();
// // };
//
// module.exports = {
// 	MEMBER: new ArgumentType(Types.USER),
//
// 	CHANNEL: new ArgumentType(Types.CHANNEL),
//
// 	// ID: new ArgumentType(Types.STRING,
// 	// 	s => {
// 	// 		if (!/<?@?!?\d{5,}>?/.test(s)) {
// 	// 			throw 'Malformed ID';
// 	// 		}
// 	//
// 	//
// 	// 	}, idExtractFlatten),	// Not my proudest regex
//
// 	// IDS: new ArgumentType(/<?@?!?\d{5,}>?/g, idExtract),
//
// 	NUMBER: new ArgumentType(/\d+/, flatten, (_, n) => Number(n)),
//
// 	TEXT: new ArgumentType(Types.STRING),
//
// 	WORD: new ArgumentType(Types.STRING, s => s.split(' ')[0]),
//
// 	JSON: new ArgumentType(Types.STRING, s => {
// 		if (!/{.*}/.test(s)) {
// 			throw 'Malformed JSON';
// 		}
//
// 		return s;
// 	}),
//
// 	MESSAGE_URL: new ArgumentType(Types.STRING, s => {
// 		if (!/https:\/\/(\w+\.)?discord\.com\/channels\/\d+\/\d+\/\d+/.test(s)) {
// 			throw 'Malformed URL';
// 		}
//
// 		return s;
// 	}),
//
// 	DURATION: new ArgumentType(
// 		Types.STRING,
// 		s => {
// 			if (!/(\d+s)?(\d+m)?(\d+w)?(\d+y)?/i.test(s)) {
// 				throw 'Malformed Duration';
// 			}
//
// 			return s;
// 		},
// 		(_, d) => {
// 			const try1 = moment.duration('P' + d.toUpperCase());
//
// 			if (try1.toISOString() !== 'P0D') {
// 				return try1;
// 			}
//
// 			return moment.duration('PT' + (s => {
// 				if (s.substr(-1) === 'M') {
// 					return s;
// 				}
//
// 				return s + 'M';
// 			})(d.toUpperCase()));
// 		}
// 	)
// };
//
// module.exports.flatten = flatten;
