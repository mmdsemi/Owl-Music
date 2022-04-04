const { Client, Message, Intents } = require("discord.js");
const { player } = require("./server");

/**
 *
 * @param {Client} cli
 * @param {Message} msg
 * @param {String[]} args
 */

module.exports = async (cli, msg, args, cmd) => {
  if (cmd === "ping") {
    msg.reply(`Your Ping : ${cli.ws.ping}`);
  }
  if (cmd === "play") {
    if (!msg.member?.voice?.channelId)
      return msg.reply("Please join a voice channel");
    let query = args.join(" ");
    if (!query) return msg.reply("Please Give Me A Link Or Name :)");
    let queue = player.createQueue(msg.guild.id, {
      metadata: {
        msgs : msg,
        channel: msg.channel,
      },
    });

    try {
      if (!queue.connection) await queue.connect(msg.member.voice.channel);
    } catch {
      queue.destroy();
      return await msg.reply({
        content: "Could not join your voice channel!",
        ephemeral: true,
      });
    }

    const track = await player
      .search(query, {
        requestedBy: msg.author,
      })
      .then((x) => x.tracks[0]);

        if(!track) return msg.reply("Oops..! I Cant Find Your Music :(")

    queue.play(track);
    msg.reply({ content: `⏱️ | Loading track **${track.title}**!` });
  }
  if(cmd === "skip"){
    let queue = player.getQueue(msg.guild.id)
    queue.skip()
  }

  if(cmd === "stop"){
    let queue = player.getQueue(msg.guild.id);
    queue.stop()
    return msg.reply("Song Stoped..!")
  }

  if(cmd === "resume"){
    let queue = player.getQueue(msg.guild.id);
    queue.setPaused(false);
  }

};
