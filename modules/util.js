const Discord = require('discord.js')
const moment = require('moment')

exports.profile = async (interaction)=>{

    var user_param = interaction.options.get('user').options.get('user')

    user = user_param != null ? user_param.user : interaction.user
    member = user_param != null ? user_param.member : interaction.member

    let embed = new Discord.MessageEmbed()
    .setAuthor(`${user.username} User Information`, user.avatarURL())
    .setDescription(`
        User ID : **${user.id}**
        Username : **${user.tag}**
        Highest Role : **${member.roles.highest}**
        Date Joined : **${moment(member.joinedAt).fromNow()} (${moment(member.joinedAt).format('MMMM Do YYYY')})**
        Account Created : **${moment(user.createdAt).fromNow()} (${moment(user.createdAt).format('MMMM Do YYYY')})**
    `)
    .setColor(member.displayHexColor)
    .setThumbnail(user.avatarURL())
    .setFooter(`requested by #${interaction.user.tag}`)
    .setTimestamp()
    await interaction.reply({ embeds: [embed] })

}

// SERVER INFO
exports.serverInfo = async (interaction)=>{

    let embed = new Discord.MessageEmbed()
    .setAuthor(`Server Information : ${interaction.guild.name}`, interaction.guild.iconURL())
    .setDescription(`

    **General Information**

    - Server Name : ${interaction.guild.name}
    - Server ID : ${interaction.guild.id}
    - Server Owner : <@${interaction.guild.ownerId}>
    - Vanity URL : https://discord.gg/${interaction.guild.vanityURLCode} 

    **Member Information**

    - Total Members : ${interaction.guild.memberCount}
    - Total Boosts : ${interaction.guild.premiumSubscriptionCount}
    - Boost Tier : ${interaction.guild.premiumTier}

    **Emojis**
    ${interaction.guild.emojis.cache.map(e => e).join(" ")}

    **Other information**

    - Partner Status : ${interaction.guild.partnered ? "Parterned" : "Not Partnered"}
    - Preferred Locale : ${interaction.guild.preferredLocale}
    - NSFW Level : ${interaction.guild.nsfwLevel}

    `)
    .setTimestamp()
    .setFooter(`requested by #${interaction.user.tag}`, interaction.user.avatarURL([{format:"png"}]))
    await interaction.reply({ embeds: [embed] })

}