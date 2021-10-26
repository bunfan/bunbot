const Discord = require('discord.js')
const moment = require('moment')
const e621 = require('e621')
const e = new e621("komdog", process.env.E621)
const fetch = require('node-fetch')

exports.profile = async (interaction)=>{

    var user_param = interaction.options.get('user')

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

    **Enabled Features**

    ${interaction.guild.features.join("\n")}

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

exports.top621 = async interaction =>{

    var tag = interaction.options.get('tag').value;

    var query = await e.getPosts([tag, 'order:favcount'],1)
    if (query.length < 1) return interaction.reply({content: `Could not query ${tag}`, ephemeral: true})
    var post = query[0]
    var url = `https://e621.net/posts/${post.id}`

    let embed = new Discord.MessageEmbed()
        .setTitle(`Top post for ${tag}`)
        .setDescription(`
        ID : ${post.id}
        Type : ${post.file.ext}
        Score : ${post.score.total}
        Favcount : ${post.fav_count}
        Rating : ${post.rating}
        `)
        .setThumbnail(post.preview.url)
        .setURL(url)

        interaction.channel.send({embeds: [embed]})
        interaction.reply({content: url})

}

exports.get_server = async (client, message, id)=>{
        var url = `https://discord.gg/${id}`
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
            message.channel.send({embeds: [embed]})
        })
        .catch(err => console.log(err))

}




