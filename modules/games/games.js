require('dotenv').config()

const Discord = require('discord.js')
const axios = require('axios').default;
const e621 = require('e621')
const e = new e621("komdog", process.env.E621)

const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

// const bank = require('./bank.js')

var category = ''
var canQuiz = true
exports.quiz = async (interaction, db)=>{
    if (interaction.channel.id != '865481999882649640') return interaction.reply({content:"Wrong channel! Go to <#865481999882649640>", ephemeral: true})

    // Check if running
    if (canQuiz == false) return interaction.reply({content:"Quiz is already running!", ephemeral: true})
    

    let prize = 50

    if(interaction.options)
    {
        category = interaction.options.get('category').value
    }
    
    // Init Vars
    var tags = [
        category, 
        'order:random',
        'score:>400',
        '-type:swf',
        '-type:webm',
        '-feral',
        '-young',
        '-mlp'
    ]

    // Fetch Post

    var post
    var answer

    try {
        post = await e.getPosts(tags, 1)
    } catch (e) {
        console.error(e)
        return interaction.reply({content:"e621 is currently down!", ephemeral:true})
    }
    
    try {
        answer = post[0].tags.artist.map(a => a.split("_").join(" ").replace(" (artist)", ""))
    } catch (e) {   
        console.error(e)
        return interaction.reply({content:"Failed to query e621", ephemeral: true})
    }

    // Remove unwanted tags
    if (answer.includes('conditional dnp')){answer.splice(answer.indexOf('conditional dnp'), 1)}
    if (answer.includes('sound warning')){answer.splice(answer.indexOf('sound warning'), 1)}
    if (answer.includes('avoid posting')){answer.splice(answer.indexOf('avoid posting'), 1)}

    let category_text = (category == '' ? 'All' : category)

    // Post Embed
    let embed = new Discord.MessageEmbed()
    .setTitle(`e621 Artist Quiz : \`${category_text}\``)
    .setDescription(`
    Who drew this picture? You have 10 seconds 🕐
    - Prize money : \`${prize}\` BunBucks 💰
    `)
    .setImage(post[0].sample.url)
    interaction.reply({ embeds: [embed] })

    canQuiz = false

    // Await Answer
    let filter = response => answer.includes(response.content.toLowerCase().split("_").join(" "))
    let collector = interaction.channel.createMessageCollector({filter: filter, time: 10000});

    // On Answer Events
    collector.on('collect', message => {
        interaction.channel.send(`✨${message.author} Got it first!✨ +${prize} BunBucks💰`)
        bank.checkAccount(interaction, db)
        bank.payout(message.author, db, prize)
        collector.stop()
    });
    collector.on('end', collected => {

        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setCustomId('quiz')
                .setLabel('Quiz Again')
                .setEmoji('❓')
                .setStyle('PRIMARY'),
        );

        let embed = new Discord.MessageEmbed()
        .setTitle(`The answer was : **${answer.join(" or ")}**`)
        .setDescription(`[Click here to view full image](https://e621.net/posts/${post[0].id})`)
        .setFooter("Quiz Ended... type `/quiz` to start a new one!")
        .setThumbnail(post[0].preview.url)
        interaction.channel.send({embeds: [embed], components: [row]})
        canQuiz = true
    });

}

exports.roll = async (interaction)=>{

    // Get value from command
    let value = interaction.options.getInteger('maximum')
    let max = (value < 1) ? 6 : value

    // Generates random number using max
    let rng = Math.ceil(Math.random()*max)

    // Sends messages
    let embed = new Discord.MessageEmbed()
    .setDescription(`You rolled a **${rng}** 🎲 (1d${max})`)
    interaction.reply({embeds: [embed]})

}

exports.coinflip = async (interaction)=>{

    let rng = (Math.random() < 0.5)
    let side = rng ? 'Heads' : 'Tails'

    let embed = new Discord.MessageEmbed()
    .setDescription(`You got **${side}**`)
    interaction.reply({embeds: [embed]})

}

var canGuess = true
exports.guessNumber = async (interaction, db) =>{

    if (interaction.channel.id != '865482021950455839') return interaction.reply({content:"Wrong channel! Go to <#865482021950455839>", ephemeral: true})

    // Check if running
    if (canGuess == false) return interaction.reply({content:"Another game is already running!", ephemeral: true})
    canGuess = false

    // Get Value
    var max = (interaction.options.size >= 1 ? interaction.options.get('prizeamount').value : 100)
    if (max > 999999999999) return interaction.reply({content:"That's too big of a number!", ephemeral: true})
    if (max < 0) return interaction.reply({content:"You can't do negative numbers!", ephemeral: true})

    let answer = Math.floor(Math.random() * max) + 1

    // Post Embed
    let embed = new Discord.MessageEmbed()
    .setTitle('Guess my number')
    .setDescription(`
    I'm thinking of a number 1 - ${max}. What is it? You have 10 seconds 🕐
    - Prize money : \`${max}\` BunBucks 💰
    `)

    interaction.reply({ embeds: [embed] })

    // Await Answer
    let filter = response => parseInt(response) == answer
    let collector = interaction.channel.createMessageCollector({filter: filter, time: 10000});

    // On Answer Events
    collector.on('collect', message => {
        interaction.channel.send(`✨${message.author} Got it first!✨ +${max} BunBucks💰`)
        bank.checkAccount(interaction, db)
        bank.payout(message.author, db, max)
        collector.stop()
    });
    collector.on('end', collected => {
        let embed = new Discord.MessageEmbed()
        .setDescription(`The number was \`${answer}\`!`)
        .setFooter("Game Ended... type `/guessnumber` to start a new one!")
        interaction.channel.send({embeds: [embed]})
        canGuess = true
    });
    


}
