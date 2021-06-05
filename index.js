require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
const guildId = '843703074996486184'

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

    data.map(command => console.log(`Loaded slash command: '${command.name}'`))
    const command = await client.guilds.cache.get(guildId)?.commands.set(data);
}



client.on('interaction', async interaction =>{
    if(!interaction.isCommand()) return;
    if(interaction.commandName == 'ask') return cmd.askQuestion(client, interaction, '849927326878924860', "Question Sent")
    if(interaction.commandName == 'bb') return cmd.beatBanger(client, interaction)


})

client.login(process.env.TOKEN)
