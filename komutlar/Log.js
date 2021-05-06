const Discord = require("discord.js");
const db = require("quick.db");
let prefix = process.env.prefix;

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      ` Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`
    );

  let logk = message.mentions.channels.first();
  let logkanal = await db.fetch(`log_${message.guild.id}`);

  if (args[0] === "sıfırla" || args[0] === "kapat") {
    if (!logkanal)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("#91ffbb")
          .setDescription(`ModLog Kanalı Zaten Ayarlı Degil.`)
      );
    db.delete(`log_${message.guild.id}`);
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#91ffbb")
        .setDescription(`Log kanalı başarıyla sıfırlandı.`)
    );
    return;
  }

  if (!logk)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#91ffbb")
        .setDescription(
          `Yanlış Kullanım \n Doğru Kullanım: ${prefix}log #kanal`
        )
    );

  db.set(`log_${message.guild.id}`, logk.id);

  message.channel.send(
    new Discord.MessageEmbed()
      .setColor("#91ffbb")
      .setDescription(`Log kanalı başarıyla ${logk} olarak ayarlandı.`)
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["log-ayarlama"],
  permLevel: 3,
  kategori: "moderasyon"
};

exports.help = {
  name: "log",
  description: "Mod-Log kanalını belirler.",
  usage: "mod-log <#kanal>"
};
