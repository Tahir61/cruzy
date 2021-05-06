const Discord = require("discord.js");
let prefix = process.env.prefix;

exports.run = async (client, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setTitle("Genel Komutlar")
    .setColor("#91ffbb")
    .addField(`${prefix}seviye`, `Sunucudaki Seviyenizi Gösterir.`, false)
    .addField(
      `${prefix}oyun`,
      `Girdiğiniz Oyunu Steam'de Arayarak Oyun Hakkındaki Birçok Bilgiyi Gönderir.`,
      false
    )
    .addField(
      `${prefix}ping`,
      `Botun Ve Discord'un Gecikmesini Gönderir.`,
      false
    )
    .addField(`${prefix}profil`, `Sunucudaki Profilini Gösterir.`, false)
    .addField(
      `${prefix}sunucu-bilgi`,
      `Sunucu Hakkındaki Birçok Bilgiyi Gönderir.`,
      false
    )
    .addField(`${prefix}sunucu-avatar`, `Sunucunun Avatarını Gönderir.`, false)
    .addField(
      `${prefix}bot-bilgi`,
      `Bot Hakkındaki Birçok Bilgiyi Gösterir.`,
      false
    )
    .addField(`${prefix}sicil`, `Sunucudaki Sicilini Gösterir.`, false)
    .addField(
      `${prefix}rolbilgi`,
      `Sunucudaki Etiketledigin Rolün Bilgilerini Alırsın.`,
      false
    )
    .addField(`${prefix}kanalbilgi`, `Kanal Hakkında Bilgi Verir.`, false);
  return message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: "genel",
  description: "Sayfalı Yardım Menüsü -ArdaDemr",
  usage: "Sayfalı Yardım Menüsü"
};
