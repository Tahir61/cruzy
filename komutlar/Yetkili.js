const Discord = require("discord.js");
let prefix = process.env.prefix;

exports.run = async (client, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setTitle("Genel Komutlar")
    .setColor("#91ffbb")
    .addField(`${prefix}kick`, `Bir Kullanıcıyı Sunucudan Atar.`, false)
    .addField(`${prefix}ban`, `Bir Kullanıcıyı Sunucudan Yasaklar.`, false)
    .addField(
      `${prefix}log`,
      `Sunucunuzda Moderasyon Logları Sistemini Kurar.`,
      false
    )
    .addField(
      `${prefix}uyarı`,
      `Bir Kullanıcının Siciline Uyarı Verirsin.`,
      false
    )
    .addField(`${prefix}eval`,`Bot Geliştirici Hataları Düzenlemek İçin Kullanır`, false)
  .addField(`${prefix}giriş-çıkış`,`Giden Gelen Kanalını Ayarlar.`, false)
  return message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: "yetkili",
  description: "Sayfalı Yardım Menüsü -ArdaDemr",
  usage: "Sayfalı Yardım Menüsü"
};
