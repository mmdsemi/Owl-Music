require("dotenv").config({ path: "./configs.env" });
const token = process.env.token;
const { Client } = require("discord.js");

const { Player } = require("discord-player");
const cli = new Client({
    shards: "auto",
    restTimeOffset: 0,
    intents: 641,
    partials: ["CHANNEL", "MESSAGE", "REACTION", "USER"],
});

const symbol = "-";
const player = new Player(cli);

cli.on("messageCreate", (msg) => {
    if (msg.content.startsWith(symbol)) {
        let chnnlId = msg.member.voice.channelId;
        if (chnnlId) {
            let args = msg.content.slice(symbol.length).trim().split(/ +/);
            let cmd = args.shift().toLocaleLowerCase();
            const commands = require("./commands");
            commands(cli, msg, args, cmd);
        }
    }
});

cli.login(token);

cli.on("ready", () => {
    console.log("Logged In ");
});

module.exports = { cli, player };
