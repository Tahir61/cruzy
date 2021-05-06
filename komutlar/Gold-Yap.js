const db = require("quick.db");
const Discord = require("discord.js");
const client = new Discord.Client();

exports.run = (client, message, args) => {
  if (message.author.id != process.env.sahip) {
    return message.channel.send("Bu komut sahibime özdür.");
  }

  let şahıs = message.mentions.users.first();

  if (!şahıs)
    return message.channel.send("Gold Verilecek Kullanıcıyı Etiketle");
  let enis = client.users.cache.get(şahıs.id);
  client.channels.cache
    .get(`838391089588731934`)
    .send(`${enis.tag} **Gold** oldu!`);
  message.channel.send(`\`${şahıs.tag}\` artık **Gold!**`);
  db.push(`goldlar`, şahıs.tag);
  db.set(`gold_${şahıs.id}`, "acik");
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4,
  kategori: "yapımcı"
};
exports.help = {
  name: "goldyap",
  description: "Napcan?",
  usage: "goldyap"
};
