const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const jdb = new qdb.table("cezalar");
const kdb = new qdb.table("kullanici");

exports.run = async (client, message, args) => {
  if (
    !message.member.roles.cache.has("KULLANACAK YETKİLİ ROL İD") &&
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
  let uye =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);
  let sebep = args.splice(1).join(" ");
  if (!uye || !sebep)
    return message.channel
      .send(
        new MessageEmbed()
          .setColor("RANDOM")
          .setAuthor(
            message.member.displayName,
            message.author.avatarURL({ dynamic: true })
          )
          .setDescription(
            `Lütfen Uyarılacak Bir Üye ve Bir Uyarı Sebebi Belirtin`
          )
          .setFooter(`Shadow Sicil`)
      )
      .then(x => x.delete({ timeout: 5000 }));
  kdb.add(`kullanici.${message.author.id}.uyari`, 1);
  kdb.push(`kullanici.${uye.id}.sicil`, {
    Yetkili: message.author.id,
    Sebep: sebep,
    Ceza: "Uyarı",
    Zaman: Date.now()
  });
  message.channel
    .send(
      new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(
          message.member.displayName,
          message.author.avatarURL({ dynamic: true })
        )
        .setDescription(
          `<@!${uye.id}> İsimli Kullanıcı, <@!${message.author.id}> Tarafından **${sebep}** Sebebiyle Uyarıldı`
        )
    )
    .then(x => x.delete({ timeout: 5000 }));
  client.channels.cache.get("838657215484264478").send(
    new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(
        message.member.displayName,
        message.author.avatarURL({ dynamic: true })
      )
      .setDescription(
        `<@!${uye.id}> İsimli Kullanıcı, <@!${message.author.id}> Tarafından **${sebep}** Sebebiyle Uyarıldı`
      )
  );
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "uyarı",
  description: "Taslak",
  usage: "Taslak"
};
