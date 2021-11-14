const {Client, CommandInteraction} = require('discord.js')

exports.coinflip = {
    name: 'flip',
    description: 'Flip a coin.',
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args
     */
    run: async (client, interaction, args) =>{
        let rng = (Math.random() < 0.5)
        let side = rng ? 'Heads' : 'Tails'
    
        let embed = new Discord.MessageEmbed()
        .setDescription(`You got **${side}**`)
        interaction.reply({embeds: [embed]})    
    }
}