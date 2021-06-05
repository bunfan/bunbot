const Discord = require('discord.js')
const Func = require('./functions')
const axios = require('axios').default;
const moment = require('moment')

exports.profile = async (client, interaction)=>{

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
    .setTimestamp()
    await interaction.reply(embed)

    

}

exports.achievement = async (client, interaction)=>{

    console.log(interaction.options)

    var user = interaction.options.get('user').user
    var ach = interaction.options.get('achievement').value

    let embed = new Discord.MessageEmbed()
    .setAuthor(`${interaction.guild.name} Server Information`, interaction.guild.iconURL())
    .setDescription(`Gave ${user} the ✨ **${ach}** ✨ achievement!`)
    .setTimestamp()
    await interaction.reply(embed)
}

exports.serverInfo = async (client, interaction)=>{

    let embed = new Discord.MessageEmbed()
    .setAuthor(`${interaction.guild.name} Server Information`, interaction.guild.iconURL())
    .setDescription(`
        Server ID : **${interaction.guild.id}**
        Server Name : **${interaction.guild.name}**
        Total Member Count : **${interaction.guild.memberCount} Members Total**
        Language : **${interaction.guild.preferredLocale}**
        Boost Tier : **Tier ${interaction.guild.premiumTier}**
    `)
    .setTimestamp()
    .setFooter(`requested by #${interaction.user.tag}`, interaction.user.avatarURL([{format:"png"}]))
    await interaction.reply(embed)

}

// Asks a question to a specified channel
exports.askQuestion = async (client, interaction, channelID, reply)=>{

    let question = interaction.options.map(o => o.value)
   
    let title = `Question from ${interaction.user.tag}`
    let color = interaction.member.displayHexColor
    let thumb = interaction.user.avatarURL([{format:"png"}])
    let description = question[0]
    let footer = `Asked in #${interaction.channel.name}`
    
    let embed = Func.generateEmbed(client, title, color, thumb, description, footer)
   
    client.channels.resolve(channelID).send(embed)
    await interaction.reply(reply, {ephemeral: true})

}

exports.beatBanger = async (client, interaction)=>{

    interaction.options.map(async choice =>{

        if(choice.value == "version")
        {
            axios.get('https://pastebin.com/raw/FdQg2yfM')
            .then(async res =>{
                let version = (res.data.version)
                let embed = new Discord.MessageEmbed()
                .setDescription(`Beat Banger is currently on version \`${version}\``)
                await interaction.reply(embed)
            })
        }

        if(choice.value == "help")
        {
            let embed = new Discord.MessageEmbed()
            .setAuthor("Beat Banger Help", "https://img.itch.zone/aW1nLzYwODc3MjAucG5n/x150/wWDx%2BC.png")
            .setDescription("For all your Beat Banger needs")
            .addFields(
                { 
                    name: 'Downloads:', 
                    value: `
                    [Download the Game](https://bunfan-games.itch.io/beat-banger)
                    [Download the Modding Tool](https://github.com/bunfan/beat-banger-modding-tool/releases)
                    `
                },
                { 
                    name: 'Resources:', 
                    value: `
                    [Change Log](https://github.com/bunfan/beat-banger-public/wiki/ChangeLog)
                    [Console Commands](https://github.com/bunfan/beat-banger-public/wiki/Console-Commands)
                    [How To Mod](https://github.com/bunfan/beat-banger-modding-tool/wiki/Using-the-Modding-Tool)
                    `
                },
                { 
                    name: 'Github:', 
                    value: `
                    [Report A Bug](https://github.com/bunfan/beat-banger-public/issues/new/choose)
                    `
                },
            )
            .setImage("https://bunfan.com/content/images/size/w2000/2021/06/x21_by_9-1.png.pagespeed.ic.JpGv2nCuvP.webp")
            .setTimestamp()
            .setFooter(`requested by #${interaction.user.tag}`, interaction.user.avatarURL([{format:"png"}]))
            await interaction.reply(embed)
        }
        
    })
   
}


