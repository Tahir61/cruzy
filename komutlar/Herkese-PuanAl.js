const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
let ana = args[0]
if(!ana)return message.channel.send("Miktar Gir")
  message.guild.members.cache.forEach(x => {
    db.add(`para_${message.guild.id}_${x.id}`, -ana)
  })
  message.channel.send("Alınıyor..")
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4,
  kategori: "puan"
};

exports.help = {
  name: "herkesten-puan-al",
  description: "al",
  usage: "al"
};