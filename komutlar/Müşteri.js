const Discord = require("discord.js");
let prefix = process.env.prefix;

exports.run = async (client, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setTitle("CruzyHost | Kalite")
    .setColor("#91ffbb")
    .addField(`${prefix}dc-reklam`,`Müşteri Rölü Olan DC Reklam Yapabilir`, false)
    .addField(`${prefix}mc-reklam`,`Müşteri Rölü Olan Minecraft Sunucu Reklam Yapabilir`, false)
    .addField(`${prefix}mta-reklam`,`Müşteri Rölü Olan Mta Sunucu Reklam Yapabilir.`, false)
  return message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["help"],
  permLevel: 0
};

exports.help = {
  name: "müşteri",
  description: "Taslak",
  usage: "Taslak"
};
