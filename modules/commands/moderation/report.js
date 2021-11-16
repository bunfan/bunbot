const Discord = require('discord.js')

module.exports = {

    name: 'report',
    description: 'report a user to the moderators',
    options: [
        {
            name: 'user',
            type: 'USER',
            description: 'User to report',
            required: true,
        },
        {
            name:'report',
            type:'STRING',
            description:'Incedent details',
            required: true,
        },
    ],
    run: async (client, interaction, options) =>{

    let user = options.getUser("user")
    let report = options.getString("report")
    
    let embed = new Discord.MessageEmbed()
    .setAuthor(`Report from ${interaction.user.tag}`, interaction.user.avatarURL([{format:"png"}]))
    .setColor('#00f')
    .setDescription(`
    The user ${user} has been reported for the following reason : 
    ----------------
    ${report}
    `)
    .setFooter(`Reported in #${interaction.channel.name}`)
    .setTimestamp()
   
    let mod_guild = client.guilds.resolve('843703074996486184')
    mod_guild.channels.resolve('852798849087963156').send({ content: "<@&852373611066818560>",embeds: [embed] })
    await interaction.reply({content:`Reported user ${user}. Thanks for submitting!`, ephemeral: true})
    }

}
