
const glob = require("glob")

/**
 * 
 * @returns Returns an array of files
 */
exports.load_commands = async ()=>{
    await glob('./modules/slash/**/*.js', {}, (err, files) =>{
        return files
    })
}