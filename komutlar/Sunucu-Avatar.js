const Discord = require("discord.js");

exports.run = async (client, message) => {
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
      .setColor("#91ffbb")
      .addField("Uyarı", "Bu Komutu Dm De Kullanamasın !");

    return message.author.send(ozelmesajuyari);
  }
  const swico = new Discord.MessageEmbed()
    .setColor("#91ffbb")
    .setTitle(`${message.guild.name}`)
    .setDescription(
      `☍ [Tarayıcıda Açmak İçin Tıkla](${message.guild.iconURL({
        dynamic: false,
        size: 1024,
        format: "png"
      })})`
    )
    .setImage(
      `${message.guild.iconURL({
        dynamic: false,
        size: 1024,
        format: "png"
      })}`
    );
  message.channel.send(swico);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sunucu-avatar"],
  permLevel: 0
};

exports.help = {
  name: "sunucu-avatar",
  description: "sunucu",
  usage: "sunucu-avatar"
};
