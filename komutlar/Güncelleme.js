const Discord = require("discord.js");
let prefix = process.env.prefix;

exports.run = async (client, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setAuthor("Güncelleme CruzyHost Bot | v1.5 Sürüm", client.user.avatarURL())
    .setColor("#91ffbb")
    .addField(
      `Eğlence & Giriş-Çıkış / Mta`,
      `► Botta Artık Eğlence Sistemi Eklendi Tüm Komutlar İçin \`${prefix}eğlence\`. \n ► Canvaslı Giriş Çıkış Eklendi Ayarlamak İçin \`${prefix}giriş-çıkış\`. \n  ► Müşteriler Artık Kendi Mta Sunucularını Reklamını Yapabilir \`${prefix}mta-reklam\`.`,
      false
    );
  return message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: "güncelleme",
  description: "Taslak",
  usage: "Taslak"
};
