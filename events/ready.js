const client = require("../index");

// Get utility commands
const Util = require('../util')
const util = new Util()


client.on("ready", () => {
    console.log(`${client.user.tag} is online.`) 
    util.updateUserCount(client)
});


