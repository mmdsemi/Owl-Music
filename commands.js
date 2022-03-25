const { Client, Message } = require("discord.js");
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
        let query = args.join(" ");
        if (!query) return msg.reply("Please Give Me A Link Or Name :)");
        let queue = player.createQueue(msg.guild.id, {
            metadata: {
                channel: msg.channel,
            },
        });

        try {
            if (!queue.connection)
                await queue.connect(msg.member.voice.channel);
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
        console.log(track);

        queue.play(track);
    }
};
