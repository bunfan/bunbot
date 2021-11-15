const Discord = require('discord.js')

module.exports = {

    name: 'bb',
    description: 'All Beat Banger Related Commands',
    options: [
        {
            name: 'mods',
            description: "Download some sexy mods",
            type: 'SUB_COMMAND'
        },
        {
            name: 'faq',
            description: "For info about all things Beat Banger",
            type: 'SUB_COMMAND'
        }
    ],
    run: async (client, interaction, args) =>{

        if (interaction.options.getSubcommand() == 'mods')
        {
            let embed = new Discord.MessageEmbed()
            .setTitle("✨ Click here to view all fan-made mods! ✨")
            .setURL("https://mega.nz/folder/Vk0CVSIQ#KHCffROl-7_3d71QxBNoTQ")
            return interaction.reply({embeds: [embed], ephemeral: true})
        } 
        
        if (interaction.options.getSubcommand() == 'faq') {
            return interaction.reply('https://github.com/bunfan/beat-banger-public/wiki/FAQ')
        }
    

    }

    

}