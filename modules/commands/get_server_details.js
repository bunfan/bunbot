const Discord = require('discord.js')

module.exports = {

    name: 'getserver',
    description: "Grab general details from any server",
    options: [
        {
            name: 'id',
            description: 'id of the specific server',
            type: 'STRING',
            required: true
        }
    ],
    run: async (client, interaction, options) =>{

        var url = `https://discord.gg/${options.getString("id")}`

        client.fetchInvite(url)
        .then(invite => {
            let embed = new Discord.MessageEmbed()
            .setTitle(`Server info for ${invite.guild.name}`)
            .addFields(
                {name: "Total Member Count : ", value: `${invite.memberCount}`},
                {name: "Online Member Count : ", value: `${invite.presenceCount}`},
                {name: "NSFW LEVEL : ", value: `${invite.guild.nsfwLevel}`},
                {name: "Features : ", value: `${invite.guild.features.join("\n")}`},
            )
            .setImage(invite.guild.bannerURL())
            .setThumbnail(invite.guild.iconURL())
            interaction.reply({embeds: [embed]})
        })
        .catch(err => {
            interaction.reply({content: `There is no server with the invite ${options.getString("id")}`, ephemeral: true})
        })
    }

}