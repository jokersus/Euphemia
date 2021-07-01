const Argument = require('./Argument');
const ArgumentInt = require('./Argument/Interaction');
const Provider = require('./Provider');

module.exports = {
	ArgConsts:			Argument.ArgumentTypeConstants,
	ArgConstsInt:		ArgumentInt.ArgumentTypeConstants,
	ArgumentType:		Argument.ArgumentType,
	Provider:			Provider.Provider,
	SQLiteProvider:		Provider.SQLiteProvider,
	EClient:			require('./EClient'),
	ECommand:			require('./ECommand'),
	ECommandHandler:	require('./ECommandHandler'),
	EmbedLimits:		require('./EmbedLimits'),
	StringDoctor:		require('./util/StringDoctor')
};
