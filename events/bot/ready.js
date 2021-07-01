module.exports = async client => {
	console.log(`Logged in as ${client.user.tag}!`);

	// const command = await client.guilds.resolve('344556222755766283').commands.create({
	// 	name: 'ping',
	// 	description: 'Pings you idfk',
	// 	options: [
	// 		{
	// 			type: 'STRING',
	// 			name: 'option1',
	// 			description: 'ok1',
	// 			required: true,
	// 		},
	// 		{
	// 			type: 'USER',
	// 			name: 'someuser',
	// 			description: 'You gotta select a user ok',
	// 			required: true,
	// 			// choices: [
	// 			// 	{
	// 			// 		name: 'Number of whatever',
	// 			// 		value: 123
	// 			// 	},
	// 			// 	{
	// 			// 		name: 'Second of whatever',
	// 			// 		value: 234
	// 			// 	}
	// 			// ]
	// 		},
	// 		{
	// 			type: 'BOOLEAN',
	// 			name: 'option3',
	// 			description: 'ok3',
	// 			required: false
	// 		}
	// 	]
	// });
	//
	// console.log(command);

	// client.on('interaction', async interaction => {
	// 	if (!interaction.isCommand()) {
	// 		return;
	// 	}
	//
	// 	if (interaction.commandName === 'ping') {
	// 		await interaction.reply('Pong');
	// 	}
	// });
};
