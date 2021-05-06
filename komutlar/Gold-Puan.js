const Discord = require("discord.js");
let prefix = process.env.prefix;

exports.run = async (client, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setTitle("CruzyHost | Kalite")
    .setColor("#91ffbb")
    .addField(`${prefix}günlük`,`Günlük Gold Puanı Alırsınız`, false)
    .addField(`${prefix}market`,` Gold Marketimizden Ürün Satın Alabilirsiniz`, false)
    .addField(`${prefix}puan`,`Gold Puanınıza Bakabilirsiniz`, false)
    .addField(`${prefix}kasa`,`Kasa sistemine erişim sağlarsınız.`, false)
    .addField(`${prefix}kasa al`,`Kasa satın alırsınız.`, false)
   .addField(`${prefix}kasa aç`,`Kasa açarsınız.`, false)
   .addField(`${prefix}kasalarım`,`Kasalarınıza bakarsınız.`, false)
  .addField(`Yapımcı`,`**${prefix}goldyap** GoldÜye Yapar. \n **${prefix}gold-çıkar** GoldÜyelikten Çıkarılır \n **${prefix}günlük-sıfırla** Günlük Hediyeni Sıfırlar.`,false)

  return message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["help"],
  permLevel: 0
};

exports.help = {
  name: "gold-puan",
  description: "Taslak",
  usage: "Taslak"
};
