const Discord = require("discord.js");
const moment = require("moment");
const db = require("quick.db");
const kdb = new db.table("kullanici");

exports.run = async (client, message, args) => {
  
  let rozetler = false;
if(message.author.flags.toArray().length <= 0) {
rozetler = false;
} else {
rozetler = true;
};

let mentionFlags = message.author.flags.toArray().join(' | ')
.replace('HOUSE_BRAVERY', 'Bravery')  
.replace('HOUSE_BRILLIANCE', 'Brilliance')
.replace('HOUSE_BALANCE', 'Balance')
.replace('VERIFIED_DEVELOPER', '1. Dönemde Doğrulanmış Bot Geliştiricisi')
.replace('DISCORD_EMPLOYEE', 'Discord Çalışanı')
.replace('PARTNERED_SERVER_OWNER', 'Discord Partner')
.replace('HYPESQUAD_EVENTS', 'HypeSquad Events')
.replace('BUGHUNTER_LEVEL_1', 'Bug Avcısı 1. Lvl')
.replace('EARLY_SUPPORTER', 'Erken Destekçi')
.replace('TEAM_USER', 'Takım Üyesi')
.replace('SYSTEM', 'Sistem')
.replace('BUGHUNTER_LEVEL_2', 'Bug Avcısı 2. Lvl')
.replace('VERIFIED_BOT', 'Onaylı Bot');
  
   const kurulus = new Date().getTime() - message.author.createdAt.getTime();
    var kontrol;    const gün = moment.duration(kurulus).format("D")   
     if (kurulus > 2629800000) kontrol = "Güvenli"
    if (kurulus < 2629800000) kontrol = "Güvenilir Değil"
  

  let sicil = kdb.get(`kullanici.${message.author.id}.sicil`) || [];
  sicil = sicil.reverse();
  let sicilPanel =
    sicil.length > 0
      ? sicil
          .map(
            (value, index) =>
              `\`${index + 1}.\` Ceza Bilgisi \n Ceza Türü: **[${
                value.Ceza
              }]** \n Ceza Tarihi: ${new Date(
                value.Zaman
              ).toTurkishFormatDate()} \n Ceza Sebebi: **${
                value.Sebep
              }** \n Yetkili: ${
                message.guild.members.cache.has(value.Yetkili)
                  ? message.guild.members.cache.get(value.Yetkili)
                  : value.Yetkili
              }`
          )
          .join("\n\n")
      : "Bu Kullanıcının Sicili Temiz!";
  
  let i = await db.fetch(`para_${message.guild.id}_${message.member.id}`);
  
  var cüzdan = db.fetch(`para_${message.member.id}`);
  var banka = db.fetch(`bankapara_${message.member.id}`);
  var toplam = cüzdan + banka;

  var aylar = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  };

  const embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username}`, message.author.avatarURL())
    .setColor("#91ffbb")
    .setThumbnail(message.author.avatarURL())
    .setDescription(
      `**Kullanıcı İsim:** \`${
        message.author.username
      }\` \n **Tag:** \`${message.author.username}#${
        message.author.discriminator
      }\` \n **ID:** \`${
        message.author.id
      }\`\n**Oluşturulduğu Tarih:** \`${`${moment(
        message.author.createdAt
      ).format("DD")} ${
        aylar[moment(message.author.createdAt).format("MM")]
      } ${moment(message.author.createdAt).format(
        "YYYY HH:mm:ss"
      )}`}\` \n **Güvenlik Seviye:** \`${kontrol}\` \n**Durumu:** \`${message.author.presence.status
        .replace("dnd", "Rahatsız Etmeyin")
        .replace("idle", "Boşta")
        .replace("offline", "Çevrimdışı")
        .replace("online", "Çevrimiçi")}\` \n  **Oynuyor Bölümü** \`${
        message.author.presence.activites
          ? message.author.presence.activites.name
          : "Boş."
      }\` \n **Son Mesaj:** \`${message.author.lastMessage}\` \n **Son MesajID:** \`${message.author.lastMessageID}\`\n **Puan:**  \`${i ||
        0}\``
    )
  .addField(`Bakiye & Ekonomi`,`**Cüzdan:** \`${cüzdan ? cüzdan + "" : "0"}\` \n **Banka:** \`${banka ? banka + "" : "0"}\` \n **Toplam:** \`${toplam ? toplam + "" : "0"}\``, true)
  .addField(`Sicil & Uyarılar`,`\`${sicilPanel}\``, false)
  .addField(`Rozetler`,`${rozetler ? mentionFlags : 'Hiç yok.'}`, false)
  .addField(`Roller`,`${message.guild.members.cache
        .get(message.author.id)
        .roles.cache.filter(r => r.name !== "@everyone")
        .map(r => r)
        .join("  ")}`, false)

  return message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "profil",
  description: "Taslak",
  usage: "Taslak"
};
