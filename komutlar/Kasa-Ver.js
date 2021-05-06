const Discord = require("discord.js"),
  db = require("quick.db");

exports.run = async (client, message, args) => {
  let s = message.mentions.users.first()
  let args1 = args[1]
  let args2 = args[2]
    if (!s) {
    const embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`Kasa Gir l1 l2 l3`);
    message.channel.send(embed);
    return;
  }
  if (!args[1]) {
    const embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`Kasa Gir l1 l2 l3`);
    message.channel.send(embed);
    return;
  }
  if (!args[2]) {
    const embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`Sayı`);
    message.channel.send(embed);
    return;
  }
  if (args1 == "l1") {
    db.add(`l1_${s.id}`, +args2);

    message.channel.send("Oluyor...");
  } else if (args1 == "l2") {
    db.add(`l2_${s.id}`, +args2);
    message.channel.send("Oluyor..");
  } else if (args1 == "l3") {
    db.add(`l3_${s.id}`, +args2);
    message.channel.send("Oluyor.");
  } else return;
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: "kasa-ver",
  description: "kasa-ver",
  usage: "kasa-ver"
};