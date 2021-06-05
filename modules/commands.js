const Discord = require('discord.js')
const Func = require('./functions')
const axios = require('axios').default;

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
                    [How To Mod](https://github.com/bunfan/beat-banger-public/wiki/How-To-Mod)
                    `
                },
                { 
                    name: 'Github:', 
                    value: `
                    [Report A Bug](https://github.com/bunfan/beat-banger-public/issues/new/choose)
                    `
                },
            )
            .setTimestamp()
            .setFooter(`requested by #${interaction.user.tag}`, interaction.user.avatarURL([{format:"png"}]))
            await interaction.reply(embed)
        }
        
    })
   
}


