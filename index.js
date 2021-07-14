require('dotenv').config()
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database/users.db');

const Discord = require('discord.js');
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

const commands = require('./commands/command_data')

const cmd = require("./modules/commands.js")
const util = require("./modules/util.js")
const games = require("./modules/games.js")
const bank = require("./modules/bank.js")

client.on('ready', async ()=>{
    console.log(`${client.user.tag} is online.`) 
    commands.load(client)
    db.run(`PRAGMA journal_mode=WAL;`)
})

client.on('messageCreate', async message =>{

    if (message.author.id != 125687298485518336) return

    let cmd_array = message.content.split(" ")
    let cmd = cmd_array[0].toLowerCase()

    if (cmd == "$ping") return message.channel.send(`Pong! (${client.ws.ping}ms)`)
    if (cmd == "$changename") return bank.change_db_name(db, message, cmd_array[1], cmd_array[2])
    if (cmd == "$setmoney") return bank.set(db, message, cmd_array[1], cmd_array[2])
    if (cmd == "$list") return bank.list(db, message)

})


client.on('interactionCreate', async interaction =>{


    // if (interaction.user.id != 125687298485518336) return interaction.reply("Bot currently under maintenance")


    // Buttons
    if(interaction.isMessageComponent()){

        // Bank Button Commands
        if(interaction.customId == 'account') return bank.bank(interaction, db, 'account')
        if(interaction.customId == 'open') return bank.bank(interaction, db, 'open')
        if(interaction.customId == 'leaderboard') return bank.bank(interaction, db, 'leaderboard')

    }


    // Slash Commands
    if(interaction.isCommand()){

        

        // General Commands
        if(interaction.channel.id != "820093352862416926" && interaction.user.id != "125687298485518336") return interaction.reply({content:`Bot command don't work in the channel. Please go to <#820093352862416926>`, ephemeral: true});
        // if(interaction.commandName == 'beatbanger') return cmd.beatBanger(client, interaction)
        
        if(interaction.commandName == 'report') return cmd.report(client, interaction)

        // Utility
        if(interaction.commandName == 'info') 
        {   
            var sub_command = interaction.options.map(option => {return option.name})[0]
            if(sub_command == 'server') return util.serverInfo(interaction)
            if(sub_command == 'user') return util.profile(interaction)
        }
        
        // Game Commands
        if(interaction.commandName == 'quiz') return games.quiz(interaction, db)
        if(interaction.commandName == 'roll') return games.roll(interaction)
        if(interaction.commandName == 'coinflip') return games.coinflip(interaction)

        // Bank Commands
        if(interaction.commandName == 'bank') return bank.bank(interaction, db, 'init')
        if(interaction.commandName == 'pay') return bank.pay(interaction, db)
    }

    

})
 
client.login(process.env.TOKEN)
