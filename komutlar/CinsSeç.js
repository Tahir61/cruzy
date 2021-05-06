const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
exports.run = async (client, message, args) => {
  let times = await db.fetch(`cinstime_${message.author.id}`);
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
          `⏱ Kedinin cinsini değiştirmek için ${
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
  var cins = args[0];
  var kedi = await db.fetch(`kedicins_${message.author.id}`);
  if (!cins)
    return message.channel.send(
      "Dostum kedine cins vermek için bir cins seçmelisin **CİNSLER**: tekir, siyam, scottish, van, bengal"
    );
  ////
  if (cins === "tekir") {
    if (kedi === "tekir")
      return message.channel.send("Senin kedin zaten tekir");
    message.channel.send("Kedin artık tekir kedisi oldu");
    db.set(`kedicins_${message.author.id}`, "tekir");
    db.set(`cinstime_${message.author.id}`, Date.now());
  }
  ////
  ////
  if (cins === "siyam") {
    if (kedi === "siyam")
      return message.channel.send("Senin kedin zaten siyam");
    message.channel.send("Kedin artık siyam kedisi oldu");
    db.set(`kedicins_${message.author.id}`, "siyam");
    db.set(`cinstime_${message.author.id}`, Date.now());
  }
  ////
  ////
  if (cins === "scottish") {
    if (kedi === "scottish")
      return message.channel.send("Senin kedin zaten scottish");
    message.channel.send("Kedin artık scottish kedisi oldu");
    db.set(`kedicins_${message.author.id}`, "scottish");
    db.set(`cinstime_${message.author.id}`, Date.now());
  }
  ////
  ////
  if (cins === "van") {
    if (kedi === "van")
      return message.channel.send("Senin kedin zaten van kedisi");
    message.channel.send("Kedin artık van kedisi oldu");
    db.set(`kedicins_${message.author.id}`, "van");
    db.set(`cinstime_${message.author.id}`, Date.now());
  }
  ////
  ////
  if (cins === "bengal") {
    if (kedi === "bengal")
      return message.channel.send("Senin kedin zaten bengal kedisi");
    message.channel.send("Kedin artık bengal kedisi oldu");
    db.set(`kedicins_${message.author.id}`, "bengal");
    db.set(`cinstime_${message.author.id}`, Date.now());
  }
  ////
};

exports.conf = {
  enabled: true,
  aliases: []
};
exports.help = {
  name: "cinsseç"
};
