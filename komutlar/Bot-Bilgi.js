const Discord = require("discord.js");
const moment = require("moment");
const os = require("os");
require("moment-duration-format");
let prefix = process.env.prefix;
let sahibi = "𝓗𝔂𝓫𝓻𝓲𝓼#2277";
let geliş = "Karadeniz Çocuğu#7869";

exports.run = async (client, message, args, bot) => {
  const ping = (message.createdTimestamp = message.createdTimestamp);

  const duration = moment
    .duration(bot.uptime)
    .format("D [Gün], H [Saat], m [Dakika], s [Saniye]");
  var osBit = await os.arch();

  if (osBit === "x64") osBit = "64 Bit";
  else if (osBit === "x82") osBit = "32 Bit";
  else osBit = os.arch();

  var osType = await os.type();

  if (osType === "Darwin") osType = "macOS";
  else if (osType === "Windows") osType = "Windows";
  else osType = os.type();

  const embed = new Discord.MessageEmbed()
    .setAuthor(
      `${client.user.username}#${client.user.discriminator}`,
      client.user.avatarURL()
    )
    .setColor("#91ffbb")
    .addField(
      `📈 Sunucu Oyuncu / Kanal`,
      ` \`${
        client.guilds.cache.size
      }\` Toplam Sunucu \n \`${client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString()}\` Toplam Üye\n \`${
        client.channels.cache.size
      }\` Toplam Kanal`,
      true
    )
    .addField(
      `📥 Bilgi`,
      `\`Discord.JS\` Kütüphane \n \`${Discord.version}\` Discord.JS Sürüm \n \`${process.version}\` Node.JS Sürüm`,
      true
    )
    .addField(
      `👑 Yapımcılar`,
      `\`${sahibi}\` Bot Sahibi \n \`${geliş}\` Bot Geliştirici`,
      true
    )
    .addField(
      `📌 Bot Verileri`,
      `\`${duration}\` Çalışma Süre \n \`${osType} ${osBit}\` İşletim \n \`${Math.round(
        process.memoryUsage().heapUsed / 1024 / 1024
      ).toLocaleString()}\` MB Bellek`,
      true
    )
    .addField(`** **`, `** **`, true)
    .addField(
      `🔰 Geçikme`,
      `\`${message.client.ws.ping}\` Mesaj Geçikme \n \`${ping}\` Bot MS \n \`${client.ws.ping}\` Bot Ping`,
      true
    );
  return message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["help"],
  permLevel: 0
};

exports.help = {
  name: "bot-bilgi",
  description: "Taslak",
  usage: "Taslak"
};
