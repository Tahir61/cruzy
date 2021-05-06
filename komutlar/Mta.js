const Discord = require("discord.js");
const Gamedig = require('gamedig');

exports.run = async (client, message, args) => {
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
      .then(m => m.delete({ timeout: 7000 }));
  
  const embed = new Discord.MessageEmbed()
  if(!args[0]) return message.channel.send('Bir IP girmelisin!') ;
Gamedig.query({
type: 'mtasa',
host: args[0]
}).then((state) => {
const CodAre = new Discord.MessageEmbed()
        .setColor("#91ffbb")
.setTitle(`${args[0]} Mta Sunucu`)
.addField(`SunucuHost / IP`,`${args[0]}`, true)
.addField(`Aktif Oyuncu`,`${state.raw.numplayers}/${state.maxplayers}`, true)
.addField(`Reklamcı`,`${message.author.username}`, true)
.addField(`Sunucu AD`,`${state.name}`, true)
message.channel.send(CodAre)
}).catch(err => message.channel.send('Sunucu Kapalı veya bu IPde bir sunucu bulunamadı!'))
  client.channels.cache.get("839807443155681311").send(embed)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "mta-reklam",
  description: "Taslak",
  usage: "Taslak"
};
