const Discord = require('discord.js')
const triggers = require('./triggers.json')

class ResponseHandler{

    constructor(){}

    async check(client, message){

        let keywords = message.content.toLowerCase().replace("?","").split(" ")
    
        // Check if keywords has words in bb trigger arrays
        if (triggers.bb.mods[0].some(item => keywords.includes(item)) && triggers.bb.mods[1].some(item => keywords.includes(item))) return this.helpMods(message)
        if (triggers.bb.mobile[0].some(item => keywords.includes(item)) && triggers.bb.mobile[1].some(item => keywords.includes(item))) return this.helpMobile(message)
        
        // Check if keywords has words in bb trigger arrays
        if (triggers.moderation.nono.some(item => keywords.includes(item))) return this.alertMods(client, message)
    }

    async helpMods(message){

        let embed = new Discord.MessageEmbed()
        .setAuthor("The #BB-Modding Channel")
        .setDescription("Discussion about modding Beat Banger")
        .setURL("https://discord.com/channels/789252395015733248/834042106955169823")
        .addFields(
            { 
                name: 'Links:', 
                value: `
                [Fan Made Mods Folder](https://mega.nz/folder/Vk0CVSIQ#KHCffROl-7_3d71QxBNoTQ)
                [Modding Channel](https://discord.com/channels/789252395015733248/834042106955169823)
                [Download the Modding Tool](https://github.com/bunfan/beat-banger-modding-tool/releases)
                [How To Mod](https://github.com/bunfan/beat-banger-modding-tool/wiki/Using-Beat-Banger-Modding-Tool-v1.22)
                `
            },
        )
        .setImage("https://bunfan.com/content/images/size/w2000/2021/06/x21_by_9-1.png.pagespeed.ic.JpGv2nCuvP.webp")
        .setTimestamp()
        message.reply({ embeds: [embed] })
    }
    
    async helpMobile(message){
        message.reply({ content: "There's a pledge milestone on patreon regarding the creation Beat Banger mobile https://www.patreon.com/komdog/membership" })
    }

    async alertMods(client, message){

        // Send message to user
        let embed = new Discord.MessageEmbed()
        .setAuthor(`Moderation Notice`)
        .setColor('#00f')
        .setDescription(`${message.author.username} \`${message.author.id}\` has been flagged`)
        .addFields(
            {
                name: "Channel",
                value: `${message.channel}`
            },
            {
                name: "Message",
                value: `${message.content}`
            }
        )
        .setThumbnail(message.author.avatarURL())
        .setTimestamp()

        let mod_guild = client.guilds.resolve('843703074996486184')
        mod_guild.channels.resolve('911802000281321543').send({embeds: [embed]})
    }
    
}

module.exports = ResponseHandler




