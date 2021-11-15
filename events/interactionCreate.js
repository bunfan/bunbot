const client = require("../index");

client.on("interactionCreate", async interaction => {
    // interaction.reply({content: 'Bot currently under maintenance Check2', ephemeral: true})
    if (interaction.isCommand()){
        const cmd = client.commands.get(interaction.commandName)
        cmd.run(client, interaction, interaction.options)
    }
});