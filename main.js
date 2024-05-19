const { GatewayIntentBits, Collection } = require('discord.js');
const Discord = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const bot = new Discord.Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

bot.login(process.env.BOT_TOKEN)
bot.on("ready", async() => {
    console.log(`${bot.user.username} est bien en ligne.`)
})

bot.commands = new Collection();
const commandFiles = fs.readdirSync(path.join(__dirname, 'src', 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./src/commands/${file}`);
    bot.commands.set(command.name, command);
}

bot.on('guildMemberAdd', async (member) => {
    const roleId = process.env.ROLE_ID; 
    try {
        await member.roles.add(roleId);
    } catch (error) {
        console.error(`Erreur lors de l'assignation du rôle à ${member.user.tag}:`, error);
    }
});

bot.on('messageCreate', async (message) => {
    if (message.author.bot) return; // Ignore les messages des bots

    const prefix = '!';
    if (!message.content.startsWith(prefix)) return; // Vérifie si le message commence par le préfixe !

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase(); // Extrait le nom de la commande

    if (!bot.commands.has(commandName)) return; // Vérifie si la commande existe

    const command = bot.commands.get(commandName); // Obtient la commande

    try {
        await command.execute(message, args); // Exécute la commande
    } catch (error) {
        console.error(error);
        message.reply('Il y a eu une erreur en exécutant cette commande.');
    }
});
