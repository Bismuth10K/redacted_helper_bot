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

const commandsPath = path.join(__dirname, 'commands');
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

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);
