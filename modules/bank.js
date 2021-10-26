// const Discord = require('discord.js');

// exports.create_db = (db)=> {
//     db.run("CREATE TABLE Users (id TEXT, name TEXT, money INTEGER)")
// }

// exports.hard_reset = (db)=>{
//     db.each(`SELECT * FROM Users`, (err, row)=>{
//         console.log(row)
//         db.run(`UPDATE Users SET money=? WHERE id=?`, [100, row.id]);
//     })
// }

// exports.change_db_name = (db, message, id, name) =>{

//     message.delete()

//     if (!id) return message.channel.send("Missing arguments")
//     if (!name) return message.channel.send("Missing arguments")

//     db.run(`UPDATE Users SET name=? WHERE id=?`, [name, id]);

//     let embed = new Discord.MessageEmbed()
//     .setDescription(`Changed entry ${id}'s name to ${name}`)
    
//     return message.channel.send({embeds: [embed]})


// }

// exports.drop = (db, message, id)=> {
//     db.run("DELETE from Users WHERE id=?", [id])

//     let embed = new Discord.MessageEmbed()
//     .setDescription(`Removed user ${id} from database`)
//     return message.channel.send({embeds: [embed]})
// }

// exports.set = (db, message, id, amount)=> {

//     message.delete()

//     if (!id) return message.channel.send("Missing arguments")
//     if (!amount) return message.channel.send("Missing arguments")

//     db.run(`UPDATE Users SET money=? WHERE id=?`, [amount, id]);

//     let embed = new Discord.MessageEmbed()
//     .setDescription(`Changed entry ${id}'s money amount to ${amount}`)
    
//     return message.channel.send({embeds: [embed]})

// }

// exports.list = (db, message)=> {

//     message.delete()

//     db.each(`SELECT * FROM Users ORDER BY money DESC`, (err, row)=>{
//         console.log(`${row.id} : ${row.name} : ${row.money}`)
//     })

// }

// exports.payout = (user, db, amount)=>{
//     db.get(`SELECT * FROM Users WHERE id='${user.id}'`, (err,row)=>{

//         if (err) return console.error(err);
//         if (!row) return

//         recieverBalance = row.money
//         db.run(`UPDATE Users SET money=? WHERE id=?`, [recieverBalance + amount, user.id]); 
//     });
// }

// exports.pay = async (interaction, db)=>{

//     let recieveingUser = interaction.options.get('user').user
//     let amount = interaction.options.get('amount').value

//     var giverBalance
//     var recieverBalance

//     if (amount < 1) return interaction.reply({content:"Amount must greater than 0", ephemeral: true})
//     if (interaction.user.id == recieveingUser.id) return interaction.reply({ content:"You can't send money to yourself!", ephemeral: true})

//     db.get(`SELECT * FROM Users WHERE id='${interaction.user.id}'`, (err,row)=>{

//         if (err) replyError(interaction);
//         if (!row) return noAccountFound(interaction)

//         giverBalance = row.money

//         if (giverBalance < amount) return interaction.reply({content:"You don't have enough money!", ephemeral: true}) 

//         db.run(`UPDATE Users SET money=? WHERE id=?`, [giverBalance - amount, interaction.user.id]);

//         db.get(`SELECT * FROM Users WHERE id='${recieveingUser.id}'`, (err,row)=>{

//             if (err) replyError(interaction);
    
//             recieverBalance = row.money
    
//             db.run(`UPDATE Users SET money=? WHERE id=?`, [recieverBalance + amount, recieveingUser.id]); 
    
//             let embed = new Discord.MessageEmbed()
//             .setTitle(`Payment Made`)
//             .setDescription(`${interaction.user} Gave ${recieveingUser} ${amount} BunBucks`)
//             .setTimestamp()

//             return interaction.reply({ embeds: [embed] })
//         });
  
//     });
 
// }

// exports.bank = async (interaction, db)=>{

//     if (interaction.channel.id != '865489232444653578') return interaction.reply({content:"Wrong channel! Go to <#865489232444653578>", ephemeral: true})

//     let embed = new Discord.MessageEmbed()
//         .setTitle("Welcome to the BunFan Bank!")
//         .setDescription("What would you like to do?")

//     const row = new Discord.MessageActionRow()
//     .addComponents(
//         new Discord.MessageButton()
//             .setCustomId('account')
//             .setLabel('View Balance')
//             .setEmoji('💰')
//             .setStyle('PRIMARY'),
//         new Discord.MessageButton()
//             .setCustomId('open')
//             .setLabel('Create Account')
//             .setEmoji('📖')
//             .setStyle('PRIMARY'),
//         new Discord.MessageButton()
//             .setCustomId('leaderboard')
//             .setLabel('View Leaderboard')
//             .setEmoji('📋')
//             .setStyle('PRIMARY'),
//     );

//     await interaction.reply({embeds:[embed], components: [row] })
 
// }

// exports.openAccount = (interaction, db) =>{
//     db.get(`SELECT * FROM Users WHERE id='${interaction.user.id}'`, (err,row)=>{

//         if (err) return replyError(interaction)
//         if (row) return interaction.reply({ content:`You already have an account!`, ephemeral: true});

//         // Create Account
//         db.run(`INSERT INTO Users VALUES (?,?,?)`, [interaction.user.id,interaction.user.username,100]);

//         let embed = new Discord.MessageEmbed()
//         .setDescription(`Congratz ${interaction.user}! You're now got a BunFan Bank Account!`)
//         return interaction.reply({ embeds: [embed] });

//     });
// }

// exports.checkAccount = (interaction, db) =>{
//     db.get(`SELECT * FROM Users WHERE id='${interaction.user.id}'`, (err,row)=>{

//         if (err) return replyError(interaction)
//         if (row) return 

//         // Create Account
//         db.run(`INSERT INTO Users VALUES (?,?,?)`, [interaction.user.id,interaction.user.username,100]);

//         let embed = new Discord.MessageEmbed()
//         .setDescription(`Congratz ${interaction.user}! You're now got a BunFan Bank Account!`)
//         .setFooter("Go to #bank and type /bank to view your balance")
//         return interaction.channel.send({ embeds: [embed] });

//     });
// }

// exports.viewAccount = (interaction, db) =>{
//     db.get(`SELECT * FROM Users WHERE id='${interaction.user.id}'`, (err,row)=>{

//         if (err) return replyError(interaction)
//         if (!row) return noAccountFound(interaction)

//         let embed = new Discord.MessageEmbed()
//         .setAuthor(`${interaction.user.username}'s BunFan Bank Account`, interaction.user.avatarURL())
//         .setDescription(`
//         BunBucks 💰 : ${row.money}
//         `)
//         .setTimestamp()

//         return interaction.reply({ embeds: [embed] })

//     })  
// }

// exports.leaderboard = (interaction, db) =>{

//     var arr = []
//     var i = 1
//     db.each(`SELECT * FROM Users ORDER BY money DESC`, (err,row)=>{

        
//         if (arr.length >= 20) return
//         // if (row.id != '125687298485518336'){
//         arr.push(`\`${i}\` : ${row.name} : ${row.money}`)
//         i++
//         // }
        

//     }, ()=>{

//         let embed = new Discord.MessageEmbed()
//         .setTitle(`👑  Rich People  👑`)
//         .setDescription(arr.join("\n"))
//         .setThumbnail(interaction.guild.iconURL())
//         .setTimestamp()

//         interaction.reply({ embeds: [embed] })
//         return 
//     })

    
// }


// function replyError(interaction) {
//     interaction.reply(`Something went wrong!`)
// }


// function noAccountFound(interaction) {
//     let embed = new Discord.MessageEmbed()
//     .setDescription(`**No account found for ${interaction.user.username}**`)
//     return interaction.reply({ embeds: [embed] });
// }