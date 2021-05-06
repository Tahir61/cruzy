const Discord = require("discord.js");
const moment = require("moment")
let prefix = process.env.prefix;

let region = {
  "us-central": "Amerika :flag_us:",
  "us-east": "Doğu Amerika :flag_us:",
  "us-south": "Güney Amerika :flag_us:",
  "us-west": "Batı Amerika :flag_us:",
  "eu-west": "Batı Avrupa :flag_eu:",
  "eu-central": "Avrupa :flag_eu:",
  singapore: "Singapur :flag_sg:",
  london: "Londra :flag_gb:",
  japan: "Japonya :flag_jp:",
  russia: "Rusya :flag_ru:",
  hongkong: "Hong Kong :flag_hk:",
  brazil: "Brezilya :flag_br:",
  singapore: "Singapur :flag_sg:",
  sydney: "Sidney :flag_au:",
  southafrica: "Güney Afrika :flag_za:",
  amsterdam: "Hollanda :flag_nl:",
  europe: "Avrupa :flag_eu:"
};

let guard = {
  NONE: "Yok",
  LOW: "Düşük",
  MEDIUM: "Orta",
  HIGH: "Yüksek",
  VERY_HIGH: "Çok Yüksek"
};

let kur = {
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
    }

function checkDays(date) {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  return days + (days == 1 ? " gün" : " gün") + " önce";
}

exports.run = async (client, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setColor("#91ffbb")
    .setFooter(`CruzyHost ● Birlikte Daha İleriye!`, client.user.avatarURL())
    .addField(
      `<:sunucu:837781196443484181> Sunucu Adı`,
      `${message.guild.name}`,
      true
    )
    .addField(
      `:earth_americas: Sunucu Bölgesi`,
      `${region[message.guild.region]}`,
      true
    )
    .addField(`:crown: Sunucu Sahibi`, `${message.guild.owner}`, true)
    .addField(`:id: Sunucu ID`, `${message.guild.id}`, true)
    .addField(
      `🔰 Güvenlik Durumu`,
      `${guard[message.guild.verificationLevel]}`,
      true
    )
    .addField(
      `📅 Oluşturma Tarihi`,
      `${checkDays(message.guild.createdAt)}`,
      true
    )
    .addField(
      `💤 AFK Bilgi`,
      `${message.guild.afkChannel} AFK Kanal \n \`${message.guild.afkTimeout}\` AFK Zaman \n \`${moment(message.guild.createdAt).format('DD')} ${kur[moment(message.guild.createdAt).format('MM')]} ${moment(message.guild.createdAt).format('YYYY h:mm:ss')}\` Oluşturma`,
      true
    )
    .addField(
      `👥 Kullanıcılar`,
      `<:discord:837783880597372958> ${message.guild.memberCount} Üye \n 🚀 ${
        message.guild.members.cache.filter(
          m => m.user.presence.status !== "offline"
        ).size
      } Çevrimİçi Üye\n :robot: ${
        message.guild.members.cache.filter(m => m.user.bot).size
      } Bot`,
      true
    )
    .addField(
      `💼 Kanallar`,
      `${
        message.guild.channels.cache.filter(chan => chan.type === "voice").size
      } Sesli Kanalı \n  ${
        message.guild.channels.cache.filter(chan => chan.type === "text").size
      } Metin Kanalı \n ${
        message.guild.channels.cache.filter(c => c.type === "category").size
      } Kategöri`,
      true
    )
    .addField(
      `🔍 Emojiler`,
      `${message.guild.emojis.cache.map(role => role).join(" ")}`,
      false
    );
  return message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sunucu-bilgi"],
  permLevel: 0
};

exports.help = {
  name: "sunucu-bilgi",
  description: "Taslak",
  usage: "Taslak"
};
