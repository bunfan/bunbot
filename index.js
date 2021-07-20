require('dotenv').config()
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database/users.db');

const Discord = require('discord.js');
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

const commands = require('./commands/command_data')

const cmd = require("./modules/commands")
const util = require("./modules/util")
const games = require("./modules/games")
const bank = require("./modules/bank")
const roles = require("./modules/roles")

client.on('ready', async ()=>{
    console.log(`${client.user.tag} is online.`) 
    db.run(`PRAGMA journal_mode=WAL;`)

    commands.load(client)
})

client.on('messageCreate', async message =>{

    if (message.author.id != 125687298485518336) return

    let cmd_array = message.content.split(" ")
    let cmd = cmd_array[0].toLowerCase()

    if (cmd == "$ping") return message.channel.send(`Pong! (${client.ws.ping}ms)`)
    if (cmd == "$changename") return bank.change_db_name(db, message, cmd_array[1], cmd_array[2])
    if (cmd == "$setmoney") return bank.set(db, message, cmd_array[1], cmd_array[2])
    if (cmd == "$dropuser") return bank.drop(db, message, cmd_array[1])
    if (cmd == "$list") return bank.list(db, message)


})


client.on('interactionCreate', async interaction =>{

    // var exempt = ['125687298485518336', '438059208961949706']
    // if (!exempt.includes(interaction.user.id)) return interaction.reply({content: 'Bot currently under maintenance', ephemeral: true})

    // Select Menu
    if(interaction.isSelectMenu()){

        if(interaction.customId == 'add_role') return roles.getRole(interaction, 'add_role')
        if(interaction.customId == 'remove_role') return roles.getRole(interaction, 'remove_role')

    }

    // Buttons
    if(interaction.isMessageComponent()){

        // Bank Button Commands
        if(interaction.customId == 'account') return bank.viewAccount(interaction, db)
        if(interaction.customId == 'open') return bank.openAccount(interaction, db)
        if(interaction.customId == 'leaderboard') return bank.leaderboard(interaction, db)

        // Games
        if(interaction.customId == 'quiz') return games.quiz(interaction, db)

    }


    // Slash Commands
    if(interaction.isCommand()){

        

        // General Commands
        // if(interaction.channel.id != "820093352862416926" && interaction.user.id != "125687298485518336") return interaction.reply({content:`Bot command don't work in the channel. Please go to <#820093352862416926>`, ephemeral: true});
        // if(interaction.commandName == 'beatbanger') return cmd.beatBanger(client, interaction)
        
        if(interaction.commandName == 'report') return cmd.report(client, interaction)

        // Utility
        if(interaction.commandName == 'info') 
        {   
            var sub_command = interaction.options.map(option => {return option.name})[0]
            if(sub_command == 'server') return util.serverInfo(interaction)
            if(sub_command == 'user') return util.profile(interaction)
        }

        if (interaction.commandName == 'role') 
        {
            var sub_command = interaction.options.map(option => {return option.name})[0]
            if (sub_command == 'add') return roles.createMenu(interaction, 'add_role')
            if (sub_command == 'remove') return roles.createMenu(interaction, 'remove_role')
        }
        
        
        // Game Commands
        if(interaction.commandName == 'quiz') return games.quiz(interaction, db)
        if(interaction.commandName == 'roll') return games.roll(interaction)
        if(interaction.commandName == 'guessnumber') return games.guessNumber(interaction, db)
        if(interaction.commandName == 'coinflip') return games.coinflip(interaction)

        // Bank Commands
        if(interaction.commandName == 'bank') return bank.bank(interaction, db)
        if(interaction.commandName == 'pay') return bank.pay(interaction, db)
    }

    

})
 
client.login(process.env.TOKEN)
