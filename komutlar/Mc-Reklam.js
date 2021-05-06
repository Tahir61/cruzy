const Discord = require('discord.js');
const Gamedig = require('gamedig');
const fetch = require("node-fetch");
const moment = require("moment");

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

  
    var tarih = "";
  if (moment().format("MM") === "01") {
    var tarih = `${moment().format("DD")}/01/${moment().format("YYYY")} `;
  }
  if (moment().format("MM") === "02") {
    var tarih = `${moment().format("DD")}/02/${moment().format("YYYY")} `;
  }
  if (moment().format("MM") === "03") {
    var tarih = `${moment().format("DD")}/03/${moment().format("YYYY")} `;
  }
  if (moment().format("MM") === "04") {
    var tarih = `${moment().format("DD")}/04/${moment().format("YYYY")} `;
  }
  if (moment().format("MM") === "05") {
    var tarih = `${moment().format("DD")}/05/${moment().format("YYYY")} `;
  }
  if (moment().format("MM") === "06") {
    var tarih = `${moment().format("DD")}/06/${moment().format("YYYY")} `;
  }
  if (moment().format("MM") === "07") {
    var tarih = `${moment().format("DD")}/07/${moment().format("YYYY")} `;
  }
  if (moment().format("MM") === "08") {
    var tarih = `${moment().format("DD")}/08/${moment().format("YYYY")} `;
  }
  if (moment().format("MM") === "09") {
    var tarih = `${moment().format("DD")}/09/${moment().format("YYYY")} `;
  }
  if (moment().format("MM") === "10") {
    var tarih = `${moment().format("DD")}/10/${moment().format("YYYY")} `;
  }
  if (moment().format("MM") === "11") {
    var tarih = `${moment().format("DD")}/11/${moment().format("YYYY")} `;
  }
  if (moment().format("MM") === "12") {
    var tarih = `${moment().format("DD")}/12/${moment().format("YYYY")} `;
  }

    if (!args[0])
    return message.channel.send(
      `${message.author} Sunucu IP adresi yazmalısın.`
    );

  
   const API = await fetch(`http://mcapi.tc/?${args[0]}/json`);
  const Data = await API.json();
Gamedig.query({
type: 'minecraft',
host: args[0]
}).then((state) => {



  

 if (Data.status === "offline") {
 const embed2 = new Discord.MessageEmbed()
    .setColor("#91ffbb")
      .setAuthor(args[0])
      .setDescription(
        `Girmiş olduğun IP adresine bağlı olan sunucu aktif değil.`
      )
      .setFooter(
        `${message.author.username} | Tarafından kontrol ediliyor...`,
        message.author.avatarURL()
      );
    message.channel.send(embed2);
  } else {
    const embed = new Discord.MessageEmbed()
        .setColor("#91ffbb")
      .setTitle(`:cyclone: ${args[0]}`)
      .addField(`:crystal_ball: **IP Adresi**`, `${args[0]}`, true)
      .addField(`:satellite: **Port**`, `25565`, true)
      .addField(
        `:person_juggling: **Çevrimiçi**`,
        `${Data.players}/${Data.max_players}`,
        true
      )
      .addField(`:round_pushpin: **Şifreleme**`, `Yok`, true)
      .addField(`:level_slider: **Protocol**`, `${Data.protocol}`, true)
      .addField(`:small_orange_diamond: Ping`, Data.ping, true)
      .addField(
        `:person_surfing: **Reklamcı**`,
        `${message.author.username}`,
        true
      )

    .addField(`:fries: Discord`, `Bilinmiyor.`, true)
      .addField(`:tea: Tarih`, `${tarih}`, true)
    .addField(`:four_leaf_clover: Bilgi`,`${state.name}`, true)
     .setFooter(
        `${message.author.username} | Tarafından kontrol ediliyor...`,
        message.author.avatarURL()
      )
      .setThumbnail(`https://eu.mc-api.net/v3/server/favicon/${args[0]}`)
      .setImage(
        `http://status.mclive.eu/Sunucu%20Durumu/${args[0]}/25565/banner.png`
      )

  client.channels.cache.get("837408694412640326").send(embed)

   }

}).catch(err => message.channel.send('Sunucu Kapalı veya bu IPde bir sunucu bulunamadı!'))
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "mc-reklam"
};
