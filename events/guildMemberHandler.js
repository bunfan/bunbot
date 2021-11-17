const client = require("../index");

// Get utility commands
const Util = require('../util')
const util = new Util()

client.on("guildMemberAdd", async (member) => {
    
    util.updateUserCount(client)
    
});

client.on("guildMemberRemove", async (member) => {
    
    util.updateUserCount(client)
    
});