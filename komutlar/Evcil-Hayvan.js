const Discord = require("discord.js");
let prefix = process.env.prefix;

exports.run = async (client, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setTitle("CruzyHost | Kalite")
    .setColor("#91ffbb")
    .addField(`${prefix}su-ver`,`Kedinize Su Verirsiniz.`, false)
    .addField(`${prefix}kedi-oynat`,`Kedinizi Mutlu Edersiniz.`, false)
  .addField(`${prefix}mama-ver`,`Kedinize Mama Verirsiniz.`, false)
  .addField(`${prefix}cinsseç`,`Kedinize Cins Seçersiniz.`, false)
  .addField(`${prefix}isimver`,`Kedinize İsim Verirsiniz.`, false)
  .addField(`${prefix}kedim`,`Kedinize Bakarsınız.`, false)
  return message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["help"],
  permLevel: 0
};

exports.help = {
  name: "evcil-hayvan",
  description: "Taslak",
  usage: "Taslak"
};
