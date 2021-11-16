const Discord = require('discord.js')

module.exports = {

    name: 'High Five',
    type: 'USER',
    run: async (client, interaction, options) => {

        var target = options.getUser("user")

        let embed = new Discord.MessageEmbed()
        .setDescription(`👏 ${interaction.member} **High Fived** ${target} 👏`)
        interaction.reply({embeds: [embed]})
    }

    

}


