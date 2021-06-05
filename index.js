require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
const guildId = '789252395015733248'

const fs = require("fs")
const YAML = require('yaml')
const commands = fs.readFileSync('./commands/commands.yaml', 'utf8')

const cmd = require("./modules/commands.js")

client.on('ready', async ()=>{
    console.log(`${client.user.tag} is online.`) 
    init_commands()
})

async function init_commands(){
    if (!client.application?.owner) await client.application?.fetch();''

    const data = YAML.parse(commands) // Get Commands from YAML

    data.map(command => console.log(`Loaded slash command: ${command.name}`))
    const command = await client.guilds.cache.get(guildId)?.commands.set(data);

    const perms = [{
            id: '850653065011003412',
            permissions:[
                {
                    id: '789252395015733248',
                    type: 'ROLE',
                    permission: false
                },
                {
                    id: '125687298485518336',
                    type: 'USER',
                    permission: true
                }
            ],

    }]

    await client.guilds.cache.get(guildId)?.commands.setPermissions(perms);

}



client.on('interaction', async interaction =>{

    if(!interaction.isCommand()) return;
    if(interaction.channel.id != "850630909761421342") return interaction.reply(`Bot command don't work in the channel. Please go to <#850630909761421342>`, {ephemeral: true});
    if(interaction.commandName == 'ask') return cmd.askQuestion(client, interaction, '850631317950562304', "Question Sent")
    if(interaction.commandName == 'achievement') return cmd.achievement(client, interaction)
    if(interaction.commandName == 'beatbanger') return cmd.beatBanger(client, interaction)
    if(interaction.commandName == 'serverinfo') return cmd.serverInfo(client, interaction)
    if(interaction.commandName == 'profile') return cmd.profile(client, interaction)

})
 
client.login(process.env.TOKEN)
