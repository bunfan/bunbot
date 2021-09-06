const Discord = require('discord.js')
const axios = require('axios').default;
const moment = require('moment')


exports.report = async (client, interaction) =>{

    let user = interaction.options.get('user').value
    let report = interaction.options.get('report').value
    
    let embed = new Discord.MessageEmbed()
    .setAuthor(`Report from ${interaction.user.tag}`, interaction.user.avatarURL([{format:"png"}]))
    .setColor('#00f')
    // .setThumbnail(user.avatarURL([{format:"png"}]))
    .setDescription(`
    The user <@${user}> has been reported for the following reason : 
    ----------------
    ${report}
    `)
    .setFooter(`Reported in #${interaction.channel.name}`)
    .setTimestamp()
   
    let mod_guild = client.guilds.resolve('843703074996486184')
    mod_guild.channels.resolve('852798849087963156').send({ content: "<@&852373611066818560>",embeds: [embed] })
    await interaction.reply({content:`Reported user <@${user}>. Thanks for submitting!`, ephemeral: true})

}

exports.links = async (client, interaction)=>{

    let embed = new Discord.MessageEmbed()
    .setTitle("Helpful Links!")
    .setDescription("Helpful link directory")

    const row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
            .setLabel('Download Beat Banger')
            .setEmoji('🎮')
            .setStyle('LINK')
            .setURL('https://bunfan-games.itch.io/beat-banger'),
        new Discord.MessageButton()
            .setLabel('Wiki')
            .setEmoji('🔖')
            .setStyle('LINK')
            .setURL('https://github.com/bunfan/beat-banger-public/wiki')
    );

    await interaction.reply({ embeds:[embed], components: [row] })

}


exports.beatBanger = async (client, interaction)=>{

    interaction.options.map(async choice =>{

        if(choice.value == "help") return help()
        if(choice.value == "version") return version()

    });

    async function version() {
    
        axios.get('https://firestore.googleapis.com/v1/projects/bunfan-db/databases/(default)/documents/beat-banger/info')
        .then(async res =>{
            let version = res.data.fields.version.stringValue
            let embed = new Discord.MessageEmbed()
            .setDescription(`Beat Banger is currently on version \`${version}\``)
            await interaction.reply({ embeds: [embed] })
        })

    }

    async function help(){

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
                    [Roadmap](https://github.com/bunfan/beat-banger-public/projects/3)
                    `
                },
            )
            .setImage("https://bunfan.com/content/images/size/w2000/2021/06/x21_by_9-1.png.pagespeed.ic.JpGv2nCuvP.webp")
            .setTimestamp()
            .setFooter(`requested by #${interaction.user.tag}`, interaction.user.avatarURL([{format:"png"}]))
            await interaction.reply({ embeds: [embed] })
        }

}


