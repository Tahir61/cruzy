const db = require("quick.db");
const ms = require("parse-ms");
const Discord = require("discord.js");
exports.run = async (client, msg, args) => {
  var id = msg.author.id;
  let times = await db.fetch(`mamatime_${msg.author.id}`);
  let day = 86400000 / 5;
  if (times !== null && day - (Date.now() - times) > 0) {
    let time = ms(day - (Date.now() - times));
    msg.channel.send(
      new Discord.MessageEmbed()
           .setColor("#91ffbb")
        .setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true }))
        .setDescription(
          `⏱ Kedini beslemek için ${time.hours ? time.hours + " saat" : ""} ${
            time.minutes ? time.minutes + " dakika," : ""
          } ${
            time.seconds
              ? time.seconds + " saniye beklemelisin!"
              : "komutu tekrar gir!"
          }`
        )
    );
    return;
  }

  var xp = await db.fetch(`kedixp_${id}`);

  var lvl = await db.fetch(`kedilvl_${id}`);
  const sınır = lvl * 100;
  var verilecek = 30;
  var ödül = lvl * 3000;

  if (msg.author.bot === true) return;

  if (!lvl) {
    db.set(`kedixp_${id}`, 5);

    db.set(`kedilvl_${id}`, 1);
  }

  msg.channel.send(
    new Discord.MessageEmbed()
      .setTitle("Kedin artık tok")
       .setColor("#91ffbb")
      .setDescription("Kedini besledin")
  );

  let veri1 = [];

  veri1 = verilecek;
  db.set(`mamatime_${msg.author.id}`, Date.now());
  db.add(`kedixp_${id}`, veri1);

  let veri2 = [];

  veri2 = sınır;

  if ((await db.fetch(`kedixp_${id}`)) > veri2) {
    msg.channel.send(
      new Discord.MessageEmbed()
        .setTitle("KEDİN ARTIK TOK")
        .setDescription(
          `Tebrik ederim <@${msg.author.id}>! Seviye atladı ve **${lvl +
            1}** seviye oldu:tada:
Ödül olarak da **${ödül}** para kazandın`
        )

           .setColor("#91ffbb")
    );

    db.add(`para_${msg.author.id}`, ödül);

    db.add(`kedilvl_${id}`, 1);

    db.delete(`kedixp_${id}`);
  }
};
exports.conf = {
  enabled: true,
  aliases: []
};
exports.help = {
  name: "mama-ver"
};
