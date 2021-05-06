const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
exports.run = async (client, message, args) => {
  let times = await db.fetch(`isimtime_${message.author.id}`);
  let day = 86400000;
  if (times !== null && day - (Date.now() - times) > 0) {
    let time = ms(day - (Date.now() - times));
    message.channel.send(
      new Discord.MessageEmbed()
          .setColor("#91ffbb")
        .setAuthor(
          message.author.tag,
          message.author.avatarURL({ dynamic: true })
        )
        .setDescription(
          `⏱ Kedinin adını bir daha değiştirmek için ${
            time.hours ? time.hours + " saat" : ""
          } ${time.minutes ? time.minutes + " dakika," : ""} ${
            time.seconds
              ? time.seconds + " saniye beklemelisin!"
              : "komutu tekrar gir!"
          }`
        )
    );
    return;
  }
  var isim = args[0];
  if (!isim) return message.channel.send("Bir İsim Yazmalısın");
  db.set(`kediisim_${message.author.id}`, isim);
  message.channel.send(
    new Discord.MessageEmbed()
      .setTitle("İŞLEM BAŞARILI")
        .setColor("#91ffbb")
      .setDescription("Kedinin adı artık " + isim + " oldu")
  );
  db.set(`isimtime_${message.author.id}`, Date.now());
};

exports.conf = {
  enabled: true,
  aliases: []
};
exports.help = {
  name: "isimver"
};
