const Discord = require('discord.js')
const axios = require('axios').default;
const { request } = require("@octokit/core");




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

    });

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

//Lists all Beat Banger Github issues.
exports.todo = async message => {

    let res = await request('GET /orgs/{org}/projects', {
        org: 'bunfan',
        mediaType: {
          previews: [
            'inertia'
          ]
        }
      })

    console.log(res.data);

}


