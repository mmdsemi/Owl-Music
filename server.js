require("dotenv").config({ path: "./configs.env" });
const token = process.env.token;
const { Client, Intents } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

const { Player } = require("discord-player");
const cli = new Client({
  shards: "auto",
  restTimeOffset: 0,
  intents: 641,
  partials: ["CHANNEL", "MESSAGE", "REACTION", "USER"],
});
cli.login(token);
cli.on("ready", () => {
  console.log("Logged In ");
});

const symbol = "-";
const player = new Player(cli);
module.exports = {cli , player}
cli.on("messageCreate", (msg) => {
  if (msg.content.startsWith(symbol)) {
    let chnnlId = msg.member.voice.channelId;
    if (chnnlId) {
      const channl = cli.channels.cache.get(chnnlId);
      const connection = joinVoiceChannel({
        channelId: channl.id,
        guildId: channl.guild.id,
        adapterCreator: channl.guild.voiceAdapterCreator,
      });

      let args = msg.content.slice(symbol.length).trim().split(/ +/);
      let cmd = args.shift().toLocaleLowerCase();
      const commands = require("./commands");
      commands(cli, msg, args, cmd);
    }
  }
});
