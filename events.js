const { Client, Message } = require("discord.js");
const { player } = require("./server");

/**
 *
 * @param {Client} cli
 * @param {Message} msg
 */

module.exports = async (client, msg) => {
  player.on("trackStart", async (queue, track) => {
    queue.metadata.msgs.reply(`🎵 Playing \`${track.title}\``);
  });

  player.on("trackAdd", async (queue, track) => {
    queue.metadata.msgs.reply(`➕  \`${track.title}\` Added  `);
  });
};
