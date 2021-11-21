const Discord = require('discord.js')

module.exports = {

    name: 'Warn : Spamming',
    type: 'USER',
    defaultPermission: false,
    run: async (client, interaction, options) =>{

    let user = options.getUser("user")
    
    let embed = new Discord.MessageEmbed()
    .setAuthor(`Warned from ${interaction.user.tag}`, interaction.user.avatarURL([{format:"png"}]))
    .setColor('#00f')
    .setDescription(`
    The user ${user} has been warned by ${interaction.member} for **Spamming**`)
    .setFooter(`Warned in #${interaction.channel.name}`)
    .setTimestamp()

    // Send message to user
    let embed2 = new Discord.MessageEmbed()
    .setAuthor(`Moderation Team`)
    .setColor('#00f')
    .setDescription(`You have been warned by the moderation team for **Spamming**`)
    .setTimestamp()
    user.send({embeds: [embed2]})
   
    let mod_guild = client.guilds.resolve('843703074996486184')
    mod_guild.channels.resolve('907268958745411614').send({embeds: [embed]})
    await interaction.reply({content:`Warned user ${user} for **Spamming**.`, ephemeral: true})
    }

}
