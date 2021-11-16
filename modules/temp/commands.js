const Discord = require('discord.js')
const axios = require('axios').default;
const { request } = require("@octokit/core");





//Lists all Beat Banger Github issues.
exports.todo = async message => {

    let res = await request('GET /orgs/{org}/projects', {
        org: 'bunfan',
        mediaType: {
          previews: [
            'inertia'
          ]
        }
      })

    console.log(res.data);

}


