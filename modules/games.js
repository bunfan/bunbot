require('dotenv').config()

const Discord = require('discord.js')
const axios = require('axios').default;
const e621 = require('e621')
const e = new e621("komdog", process.env.E621)

const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

const bank = require('./bank.js')

var canQuiz = true
exports.quiz = async (interaction, db)=>{

    // Check if running
    if (canQuiz == false) return interaction.reply({content:"Quiz already running!", ephemeral: true})
    canQuiz = false
    
    // Init Vars
    var post = []
    var tags = [
        'order:random',
        'score:>200',
        '-type:swf',
        'type:gif',
        '-feral',
        '-young',
        '-mlp'
    ]

    // Fetch Post
    await e.getPosts(tags, 1).then(p => post = p[0])

    let answer = post.tags.artist

    // Remove unwanted tags
    if (answer.includes('conditional_dnp')){answer.splice(answer.indexOf('conditional_dnp'), 1)}
    if (answer.includes('sound_warning')){answer.splice(answer.indexOf('sound_warning'), 1)}
    if (answer.includes('avoid_posting')){answer.splice(answer.indexOf('avoid_posting'), 1)}

    // Post Embed
    let embed = new Discord.MessageEmbed()
    .setTitle('e621 Artist Quiz')
    .setDescription('Who drew this picture? You have 20 seconds 🕐')
    .setImage(post.sample.url)
    interaction.reply({ embeds: [embed] })

    // Await Answer
    let filter = response => answer.includes(response.content.toLowerCase()) 
    let collector = interaction.channel.createMessageCollector({filter: filter, time: 20000});

    // On Answer Events
    collector.on('collect', message => {
        interaction.channel.send(`✨${message.author} Got it first!✨ +10 BunBucks💰`)
        bank.payout(message.author, db, 10)
        collector.stop()
    });
    collector.on('end', collected => {
        let embed = new Discord.MessageEmbed()
        .setTitle(`The answer was : **${answer.join(" or ")}**`)
        .setDescription(`[Click here to view full image](https://e621.net/posts/${post.id})`)
        .setFooter("Quiz Ended... type `/quiz` to start a new one!")
        .setThumbnail(post.preview.url)
        interaction.channel.send({embeds: [embed]})
        canQuiz = true
    });

}

exports.roll = async (interaction)=>{

    let option = interaction.options.map(option => {return option})
    let max = option.length > 0 ? option[0].value : 6
    let rng = Math.ceil(Math.random()*max)

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
