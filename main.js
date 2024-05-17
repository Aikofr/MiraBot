const { GatewayIntentBits } = require('discord.js');
const Discord = require("discord.js")
require('dotenv').config();
const bot = new Discord.Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

bot.login(process.env.BOT_TOKEN)
bot.on("ready", async() => {
    console.log(`${bot.user.username} est bien en ligne.`)
})

bot.on('guildMemberAdd', async (member) => {
    const roleId = process.env.ROLE_ID; 
    try {
        await member.roles.add(roleId);
    } catch (error) {
        console.error(`Erreur lors de l'assignation du rôle à ${member.user.tag}:`, error);
    }
});