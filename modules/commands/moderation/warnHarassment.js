const Discord = require('discord.js')

module.exports = {

    name: 'Warn Message',
    type: 'MESSAGE',
    defaultPermission: true,
    run: async (client, interaction, options) =>{

        let message = options.getMessage("message")
        let user = message.author

        var attachment = ""
        if (message.attachments.first() != null){
            attachment = message.attachments.first().url
        }
        
        // Send message to user
        let embed2 = new Discord.MessageEmbed()
        .setAuthor(`Moderation Team`)
        .setColor('#00f')
        .setDescription(`You have been warned by the moderation team for posting \`${message.content}\``)
        .setImage(attachment)
        .setTimestamp()
        user.send({embeds: [embed2]})

        // Send embed to moderation discord
        let embed = new Discord.MessageEmbed()
        .setAuthor(`Warned from ${interaction.user.tag}`, interaction.user.avatarURL([{format:"png"}]))
        .setColor('#00f')
        .setDescription(`${user.username} has been warned for posting \`${message.content}\``)
        .setFooter(`Warned in #${interaction.channel.name}`)
        .setImage(attachment)
        .setTimestamp()
    
        let mod_guild = client.guilds.resolve('843703074996486184')
        mod_guild.channels.resolve('907268958745411614').send({embeds: [embed]})

        // Interaction Response
        await interaction.reply({content:`user ${user}'s message has been flagged`, ephemeral: true})

    }

}
