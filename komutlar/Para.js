const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  let user = message.mentions.users.first() || message.author;

  var cüzdan = db.fetch(`para_${user.id}`);
  var banka = db.fetch(`bankapara_${user.id}`);
  var toplam = cüzdan + banka;
  message.channel.send(
    new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setAuthor(user.tag, user.avatarURL({ dynamic: true }))
      .addField("Cüzdan", `${cüzdan ? cüzdan + "" : "0"}`, false)
      .addField("Banka", `${banka ? banka + "" : "0"}`, false)
      .addField("Toplam", `${toplam ? toplam + "" : "0"}`, false)
  );
};

exports.conf = {
  enabled: true,
  aliases: ["money"]
};
exports.help = {
  name: "para"
};
