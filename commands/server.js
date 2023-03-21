const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Provide information about the server.'),
    async execute(interaction){
        // interaction.guild is the object representing the guild in which the command was run
        await interaction.reply(`This command was run by ${interaction.guild.name}, who joined on ${interaction.guild.memberCount} members.`);
    },
};