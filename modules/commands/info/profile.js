const Discord = require('discord.js')
const moment = require('moment')

module.exports = {

    name: 'profile',
    description: "Get server info",
    options: [
        {
            name: 'user',
            description: 'User to get',
            type: 'USER',
            required: true
        }
    ],
    run: async (client, interaction, options) =>{

        // Get user from options
        var user = options.getUser('user')

        // Get get guild member from user
        var member = {}
        await interaction.guild.members.fetch(user.id).then(m => member = m)



        let embed = new Discord.MessageEmbed()
        .setAuthor(`${user.username} User Information`, user.avatarURL())
        .setDescription(`
            User ID : **${user.id}**
            Username : **${user.tag}**
            Highest Role : **${member.roles.highest}**
            Date Joined : **${moment(member.joinedAt).fromNow()} (${moment(member.joinedAt).format('MMMM Do YYYY')})**
            Account Created : **${moment(user.createdAt).fromNow()} (${moment(user.createdAt).format('MMMM Do YYYY')})**
        `)
        // .setColor(member.displayHexColor)
        .setThumbnail(user.avatarURL())
        .setFooter(`requested by #${interaction.user.tag}`)
        .setTimestamp()
        await interaction.reply({ embeds: [embed] })
    }

}

