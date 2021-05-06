const Discord = require("discord.js");
let prefix = process.env.prefix;

exports.run = async (client, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setTitle("CruzyHost | Kalite")
    .setColor("#91ffbb")
    .addField(`${prefix}minecraft`,`Minecraft Komutlarını Görüsrünüz.`, false)
    .addField(`${prefix}havadurumu`,`Bir Şehirdeki HavaDurumu Detaylı Gösterir.`, false)
    .addField(`${prefix}kitap-ara`,`Yazdıgınız Kitap Hakkında Bilgi Verir.`, false)
    .addField(`${prefix}yazan-kazanır`,`Yazan Kazanır Oyunu Oynarsınız.`, false)
    .addField(`${prefix}atasözü`,`Rastgele AtaSözü Atar.`, false)
    .addField(`${prefix}youtube`,`Youtubede Youtuber Kanalını Gösterir`, false)
  .addField(`${prefix}fortnite`,`Fortnite Hesabınıza Bakarsın.`, false)
  .addField(`${prefix}playstore`,`Google PlayStore Oyun & Uygulama Hakkında Bilgi Verir.`, false)
  .addField(`${prefix}kutuaç`,`Brawl Stars Kutusu Açarsın.`, false)
  return message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "eğlence",
  description: "Taslak",
  usage: "Taslak"
};
