require("dotenv").config({ path: "./configs.env" });
const token = process.env.token;
const voice = require("@discordjs/voice");
const { Client, Intents } = require("discord.js");

const { Player } = require("discord-player");
const cli = new Client({
  shards: "auto",
  restTimeOffset: 10000,
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
  partials: ["CHANNEL", "MESSAGE", "REACTION", "USER"],
});

const symbol = "-";
const player = new Player(cli);
module.exports = { cli, player };
require("./events")(cli);
cli.on("messageCreate", (msg) => {
  if (!msg.content.startsWith(symbol)) return;
  let args = msg.content.slice(symbol.length).trim().split(/ +/);
  let cmd = args.shift().toLocaleLowerCase();
  const commands = require("./commands");
  commands(cli, msg, args, cmd);
});

cli.login(token);

cli.on("ready", () => {
  console.log("Logged In ");
});
