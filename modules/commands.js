const Discord = require('discord.js')
const Func = require('./functions')
const axios = require('axios').default;
const moment = require('moment')

const JSONdb = require('simple-json-db');
const db = new JSONdb('./ach.json');

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
    .setFooter(`requested by #${interaction.user.tag}`)
    .setTimestamp()
    await interaction.reply(embed)

}

exports.giveachievement = async (client, interaction)=>{

    var user = interaction.options.get('user').user
    var ach = interaction.options.get('achievement').value

    let ach_arr = db.get(`${user.id}`) ?? []
    ach_arr.push(`${ach}`)

    db.set(`${user.id}`, ach_arr);
    db.sync();

    let embed = new Discord.MessageEmbed()
    .setAuthor(`Achievement Get!`, user.avatarURL())
    .setDescription(`${user} got the ✨ **${ach}** ✨ achievement!`)
    .setTimestamp()

    await interaction.reply(embed)

}

exports.achievements = async (client, interaction)=>{

    var user_param = interaction.options.get('user')

    user = user_param != null ? user_param.user : interaction.user
    member = user_param != null ? user_param.member : interaction.member

    let achievement_array = db.get(`${user.id}`) ?? ["Achievementless"]

    let embed = new Discord.MessageEmbed()
    .setAuthor(`${user.username}'s Achievements`, user.avatarURL())
    .setDescription(`${achievement_array.map(ach => `✨ **${ach}** ✨`).join("\n")}`)
    .setTimestamp()
    .setFooter(`requested by #${interaction.user.tag}`)
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

exports.report = async (client, interaction) =>{

    let report_array = interaction.options.map(o => o.value)
   
    let title = `Report from ${interaction.user.tag}`
    let color = '#00f'
    let description = report_array[1]
    let footer = `reported in #${interaction.channel.name}`
    
    let embed = new Discord.MessageEmbed()
    .setTitle(title)
    .setColor(color)
    .addField('**Reported User**', `<@${report_array[0]}>`)
    .addField('**Reason:**', description)
    .setFooter(footer)
   
    let mod_guild = client.guilds.resolve('843703074996486184')
    mod_guild.channels.resolve('852798849087963156').send(embed)
    await interaction.reply(`Reported user <@${report_array[0]}>. Thanks for submitting!`, {ephemeral: true})

}

exports.quiz = async (client, interaction)=>{

    var head = {headers:{'User-Agent': 'BunBot/1.0 (by Komdog on e621)'}}

    let max_images = 50
    let tags = [
        'order:favcount',
        'type:png'
    ]
    axios.get(`https://e621.net/posts.json?limit=${max_images}&tags=${tags.join(" ")}`,head)
    .then(res=>{
        let e621 = res.data.posts[Math.floor(Math.random()*max_images)]
        let answer = e621.tags.artist

        if (answer.includes('conditional_dnp')){
            answer.splice(answer.indexOf('conditional_dnp'), 1)
        }

        if (answer.includes('sound_warning')){
            answer.splice(answer.indexOf('sound_warning'), 1)
        }
        
        if (answer.includes('avoid_posting')){
            answer.splice(answer.indexOf('avoid_posting'), 1)
        }
        

        console.log(`The artist is ${answer}`)
        let embed = new Discord.MessageEmbed()
        .setTitle('e621 Artist Quiz')
        .setDescription('Who drew this picture? You have 10 seconds 🕐')
        .setImage(e621.sample.url)
        interaction.reply(embed)
        let filter = message => {return message.content.toLowerCase() == e621.tags.artist}    
        interaction.channel.awaitMessages(filter, {max:1, time:10000, errors:['time']})
        .then(collected =>{
            let array = collected.map(items => {return items})
            interaction.channel.send(`✨${array[0].author} Got it first! The answer was ${answer}✨`)
            console.log("You answered correctly")
        })
        .catch(err =>{
            interaction.channel.send(`Times Up! The artists was **${answer}**`)
        })
    })

}

exports.beatBanger = async (client, interaction)=>{

    interaction.options.map(async choice =>{

        if(choice.value == "version")
        {
            axios.get('https://firestore.googleapis.com/v1/projects/bunfan-db/databases/(default)/documents/beat-banger/info')
            .then(async res =>{
                let version = res.data.fields.version.stringValue
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


