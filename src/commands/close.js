const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'close',
    description: 'Close command',
    async execute(message, args) {
        const roleId = process.env.COMMAND_ROLE_ID;

        if (message.member.roles.cache.some(role => role.id === roleId || role.comparePositionTo(roleId) > 0)) {
            const imageUrl = 'https://media.discordapp.net/attachments/1241027544279679086/1241027997931274260/Sequence_01_3_test.gif?ex=664b57e3&is=664a0663&hm=e0584a78a54fe43edcbf4ed8a05656886f270b89587e841fdd481558bc913401&=';
            const embed = new EmbedBuilder()
                .setColor('#FFD280')
                .setTitle('Entretien fermé')
                .setDescription('Merci pour votre soutien et votre intérêt.\n' +
                'Les entretiens réouvriront rapidement.\n')
                .setImage(imageUrl)
            try {
                const sentMessage = await message.channel.send({ embeds: [embed] });
                await message.delete();
            } catch (error) {
                console.error('Erreur lors de l\'envoi de l\'embed:', error);
                message.channel.send('Je n\'ai pas pu envoyer l\'embed.');
            }
        } else {
            message.channel.send('Désolé, vous n\'avez pas la permission d\'utiliser cette commande.');
        }
    },
};
