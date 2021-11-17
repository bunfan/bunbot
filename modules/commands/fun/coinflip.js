const Discord = require('discord.js')

module.exports = {
    name: 'coinflip',
    description: 'Flips a coin.',
    run: async (client, interaction, options) =>{
        let rng = (Math.random() < 0.5)
        let side = rng ? 'Heads' : 'Tails'
    
        let embed = new Discord.MessageEmbed()
        .setDescription(`You got **${side}**`)
        interaction.reply({embeds: [embed]})    
    }
}