// fs is used to read the commands directory and identify our command files
const fs = require('node:fs');
// path helps construct paths to access files and directories.
const path = require('node:path');
// Require the necessary discord.js classes
const {Client, Collection, Events, GatewayIntentBits} = require('discord.js');
const {token} = require('./config.json');

// Create a new client instance
const client = new Client({intents: [GatewayIntentBits.Guild]});

// Collection is used to store and efficiently retrieve commands for execution.
client.commands = new Collection();

// path.join() helps to construct a path to the commands directory
const commandsPath = path.join(__dirname, 'commands');
//  fs.readdirSync() method then reads the path to the directory and returns an array of all the file names it contains
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles){
	const filePath = path.join(commandsPath, file)
	const command = require(filePath)
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command){
		client.commands.set(command.data.name, command);
	} else {
		console.log('[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.')
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName)

	if (!command){
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try{
		await command.execute(interaction);
	} catch(error){
		console.error(error);
		if (interaction.replied || interaction.deferred){
			await interaction.followUp({content: 'There was an error while executing this command!', ephemeral: true});
		} else {
			await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
		}
	}
});

// Log in to Discord with your client's token
client.login(token);
