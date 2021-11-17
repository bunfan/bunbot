const client = require("../index");
const ResponseHandler = require("../modules/responses/responses")
const responseHandler = new ResponseHandler()

client.on("messageCreate", async (message) => {
    if (message.author.bot) return
    responseHandler.check(message)
});