const Discord = require("discord.js");

exports.run = function(client, message, args) {
   if (
    !message.member.roles.cache.has("830437220212932633") &&
    !message.member.hasPermission("ADMINISTRATOR")
  )
    return message.channel
      .send(
        new Discord.MessageEmbed()
          .setAuthor(
            message.member.displayName,
            message.author.avatarURL({ dynamic: true })
          )
          .addField(
            "Yetersiz Yetki",
            `Bu Komutu Kullanabilmeniz için Yeterli Yetkiniz Yok`
          )
          .setColor("RANDOM")
      )
  let type = args.slice(0).join(" ");
  if (type.length < 1)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(
          "Discord Reklam Nasıl Yapılır! \n !dc-reklam discord.gg/cruzyhost Gelmeyi Unutmayın!"
        )
    );
  const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription("Discord Reklamı Gönderildi");
  message.channel.send(embed);
  const embed2 = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(
      `**${message.author.tag}** Adlı Kullanıcı Discord Reklamında Bulundu`
    )
    .addField(`Reklamcı`,`<@${message.author.id}>`, true)
    .addField(`** **`, `${type}`);
  client.channels.cache.get("837408771575775293").send(embed2); // Kanal ID
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "dc-reklam"
};
