const Discord = require('discord.js')
const triggers = require('./triggers.json')

exports.check = async (message) => {

    let keywords = message.content.toLowerCase().replace("?","").split(" ")

    // Check if keywords has words in mod trigger arrays
    if (triggers.mods[0].some(item => keywords.includes(item)) && triggers.mods[1].some(item => keywords.includes(item))) return help_mods(message)
    if (triggers.mobile[0].some(item => keywords.includes(item)) && triggers.mobile[1].some(item => keywords.includes(item))) return help_mobile(message)
}


async function help_mods(message){

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
            [How To Mod](https://github.com/bunfan/beat-banger-modding-tool/wiki/Using-the-Modding-Tool)
            `
        },
    )
    .setImage("https://bunfan.com/content/images/size/w2000/2021/06/x21_by_9-1.png.pagespeed.ic.JpGv2nCuvP.webp")
    .setTimestamp()
    await message.reply({ embeds: [embed] })
}

async function help_mobile(message){
    await message.reply({ content: "There's a pledge milestone on patreon regarding the creation Beat Banger mobile https://www.patreon.com/komdog/membership" })
}
