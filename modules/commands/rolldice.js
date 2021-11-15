const Discord = require('discord.js')

module.exports = {

    name: 'roll',
    description: 'Roll the dice',
    options: [
        {
            name: 'maximum',
            type: 'INTEGER',
            description: 'Number of sides on die',
            required: false,
        },
    ],
    run: async (client, interaction, args) =>{

        // Get value from command
        let value = interaction.options.getInteger('maximum')
        let max = (value < 1) ? 6 : value

        // Generates random number using max
        let rng = Math.ceil(Math.random()*max)

        // Sends messages
        let embed = new Discord.MessageEmbed()
        .setDescription(`You rolled a **${rng}** 🎲 (1d${max})`)
        interaction.reply({embeds: [embed]})

    }

    

}