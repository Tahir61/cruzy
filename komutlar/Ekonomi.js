const Discord = require("discord.js");
let prefix = process.env.prefix;

exports.run = async (client, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setTitle("CruzyHost | Kalite")
    .setColor("#91ffbb")
    .addField(`${prefix}yatır`,`Bankaya Para Yatırırsın.`, false)
  .addField(`${prefix}çek`,`Bankadan Para Çekersin.`, false)
  .addField(`${prefix}çalış`,`Çalışarak Para KazanaBilirsin.`, false)
  .addField(`${prefix}çal`,`Birisinden Para Çalabilirsiniz.`, false)
  .addField(`${prefix}para`,`Ne Kadar Paranız Var Onu Gösterir.`, false)
  .addField(`${prefix}kasa-bilgi`,`Kasalar Hakkında Bilgi Alırsın.`, false)
  .addField(`${prefix}kasalar`,`Kasalar Listesini Gösterir.`, false)
  .addField(`${prefix}kasa-aç`,`Kasanız Varsa Kasa Açarsınız.`, false)
  .addField(`${prefix}bahis`,`Birisiyle Bahis Girersiniz.`, false)
  .addField(`${prefix}adamasmaca`,`Oyun Oynarak Paranın Katını Alabilirsiniz.`, false)
  return message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "ekonomi",
  description: "Taslak",
  usage: "Taslak"
};
