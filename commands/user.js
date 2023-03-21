const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provide information about the user.'),
    async execute(interaction){
        // interaction.user is the object representing the user who ran this command
        // interaction.member is the guildmember object, which represents the user in the specific guild
        await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
    },
};