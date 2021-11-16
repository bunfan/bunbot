const Discord = require('discord.js')

module.exports = {

    name: 'Twerk',
    type: 'USER',
    run: async (client, interaction, options) => {

        

        var sticker = await client.fetchSticker('888796297660891176')
        interaction.reply({
            stickers: [sticker.fist()]
        })
        console.log(sticker)


    }

    

}