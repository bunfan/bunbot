// get .env config 
require('dotenv').config()

// Gets the discord client
const { Client, Intents } = require('discord.js');
const loader = require('./loader.js')


// Get the proper intents for the bot
const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MEMBERS, 
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

// var cmd_array = loader.load_commands()

client.on("ready", async () => {
    console.log(`${client.user.tag} is online.`) 
    // console.log(cmd_array)

    // console.log("--- Loading Commands ---");
    // exports.data.map(command => console.log(`Loading command : ${command.name.toUpperCase()}`))
    // client.guilds.cache
    //     .get('789252395015733248')
    //     .commands.set(exports.data)

});



// const commands = require('./commands/command_data')

// const cmds = require("./modules/slash/commands")
// const util = require("./modules/slash/util")
// const games = require("./modules/slash/games")
// const roles = require("./modules/slash/roles")
// const responses = require("./modules/responses/responses")


// // Update member count
// function updateCount() {
//      // Sets channel to show total server member count
//      var bunfan_server = client.guilds.resolve('789252395015733248')
//      var member_channel = bunfan_server.channels.resolve('872999670488629270')
//      member_channel.setName(`👫 Member Count : ${bunfan_server.memberCount}`)
//      console.log(`Channel updated to ${bunfan_server.memberCount}`)
// }

// // When the bot starts up
// client.on('ready', async ()=>{


    

//     // Set database journal mode
//     // db.run(`PRAGMA journal_mode=WAL;`)

//     // Load all commands from JSON file
//     commands.load(client)

//     // Update
//     updateCount()
    
// })

// client.on('guildMemberAdd', async member =>{
//     updateCount()
// })

// client.on('guildMemberRemove', async member =>{
//     updateCount()
// })


// client.on('messageCreate', async message =>{

//     if (message.author.bot) return;

//     responses.check(message)

//     if (message.author.id != 125687298485518336) return

//     let cmd_array = message.content.split(" ")
//     let cmd = cmd_array[0].toLowerCase()

//     if (cmd == "$ping") return message.channel.send(`Pong! (${client.ws.ping}ms)`)
//     if (cmd == "$getserver") return util.get_server(client, message, cmd_array[1])
//     if (cmd == "$todo") return cmds.todo(message)
//     if (cmd == "$sayhello") return console.log("hello world! :D")
//     if (cmd == "$kompic") return message.reply("https://static1.e621.net/data/sample/7e/12/7e12a8cc18a75149277a2baa426a6668.jpg")

// })


client.on('interactionCreate', async interaction =>{
    interaction.reply({content: 'Bot currently under maintenance', ephemeral: true})
});

// Login
client.login(process.env.TOKEN)

//     // Select Menu
//     if(interaction.isSelectMenu()){

//         if(interaction.customId == 'add_role') return roles.getRole(interaction, 'add_role')
//         if(interaction.customId == 'remove_role') return roles.getRole(interaction, 'remove_role')

//     }

//     if(interaction.isContextMenu()){
//         if (interaction.commandName == 'Give Hud') return
//     }

//     // Slash Commands
//     if(interaction.isCommand()){

        

//         // General Commands
//         // if(interaction.channel.id != "820093352862416926" && interaction.user.id != "125687298485518336") return interaction.reply({content:`Bot command don't work in the channel. Please go to <#820093352862416926>`, ephemeral: true});
//         // if(interaction.commandName == 'beatbanger') return cmd.beatBanger(client, interaction)
        
//         if(interaction.commandName == 'report') return cmds.report(client, interaction)

//         // Utility
//         if(interaction.commandName == 'info') return util.info(interaction)

//         if(interaction.commandName == 'top621') return util.top621(interaction)

//         // Assigns user roles
//         if (interaction.commandName == 'role') 
//         {
//             if (interaction.options.getSubcommand() == 'add') return roles.createMenu(interaction, 'add_role')
//             if (interaction.options.getSubcommand() == 'remove') return roles.createMenu(interaction, 'remove_role')
//         }

//         if (interaction.commandName == 'bb') return util.bb(interaction)
        
        
//         // Game Commands
//         if(interaction.commandName == 'roll') return games.roll(interaction)
//         if(interaction.commandName == 'coinflip') return games.coinflip(interaction)

//     }

    

// })

