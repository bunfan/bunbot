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

    await console.log('-- Loading Commands')
    data.map(command => console.log(`Loaded slash command: ${command.name}`))
    const command = await client.guilds.cache.get(guildId)?.commands.set(data);

    const perms = [{
            id: '850662019559981076',
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

    await console.log('-- Setting Command Permission')
    await client.guilds.cache.get(guildId)?.commands.setPermissions(perms);

}



client.on('interaction', async interaction =>{

    // console.log(interaction.commandID)

    if(!interaction.isCommand()) return;
    if(interaction.channel.id != "820093352862416926" && interaction.user.id != "125687298485518336") return interaction.reply(`Bot command don't work in the channel. Please go to <#820093352862416926>`, {ephemeral: true});
    if(interaction.commandName == 'ask') return cmd.askQuestion(client, interaction, '850631317950562304', "Question Sent")
    if(interaction.commandName == 'achievements') return cmd.achievements(client, interaction)
    if(interaction.commandName == 'giveachievement') return cmd.giveachievement(client, interaction)
    if(interaction.commandName == 'beatbanger') return cmd.beatBanger(client, interaction)
    if(interaction.commandName == 'serverinfo') return cmd.serverInfo(client, interaction)
    if(interaction.commandName == 'profile') return cmd.profile(client, interaction)
    if(interaction.commandName == 'report') return cmd.report(client, interaction)
    if(interaction.commandName == 'quiz') return cmd.quiz(client, interaction)

    

})
 
client.login(process.env.TOKEN)
