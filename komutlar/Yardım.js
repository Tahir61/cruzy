const Discord = require("discord.js");
let prefix = process.env.prefix;

exports.run = async (client, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setTitle("CruzyHost | Kalite")
    .setColor("#91ffbb")
    .addField(
      `:speech_balloon: Genel`,
      `**${prefix}genel** Yazarak Genel Komutları Görüntüleyebilirsiniz.`,
      true
    )
    .addField(
      `🔍 Yetkili`,
      `**${prefix}yetkili** Yazarak Yetkili Komutlarını Görüntüleyebilirsiniz.`,
      true
    )
    .addField(
      `🔰 Güvenlik`,
      `**${prefix}güvenlik** Yazarak Güvenlik Komutlarını Görüntüleyebilirsiniz.`,
      true
    )
    .addField(
      `🍁 Gold / Puan`,
      `**${prefix}gold-puan** Yazarak GoldÜye Ve Puan Komutlarını Görüntüleyebilirsiniz.`,
      true
    )
    .addField(
      `👥 Müşteri`,
      `**${prefix}müşteri** Yazarak Müşteri Hakkındaki Komutları Görüntüleyebilirsiniz.`,
      true
    )
    .addField(
      `🐺 Evcil Hayvan`,
      `**${prefix}evcil-hayvan** Yazarak Evcil Hayvan Komutlarını Görüntüleyebilirsiniz.`,
      true
    )
    .addField(`🎓 Eğlence`, `**${prefix}eğlence** Yazarak Eğlence Heycan Komutlarını Görüntüleyebilirsiniz.`, true)
    .addField(
      `💼 Ekonomi`,
      `**${prefix}ekonomi** Yazarak Evcil Hayvan Komutlarını Görüntüleyebilirsiniz.`,
      true
    )
    .addField(`** **`, `** **`, true)
    .addField(
      `** **`,
      `🌍 [Sunucuna Ekle](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)`,
      true
    )
    .addField(`** **`, `🏆 [Resim Sunucu](https://discord.gg/bnTwXJ9uuv)`, true)
    .addField(`** **`, `👥 [Web Site](https://cruzyhost.com/)`, true)
    .setImage(
      "https://media.discordapp.net/attachments/831260788575830016/837736434521079857/Cruzy.png?width=480&height=184"
    );
  return message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["help"],
  permLevel: 0
};

exports.help = {
  name: "yardım",
  description: "Taslak",
  usage: "Taslak"
};
