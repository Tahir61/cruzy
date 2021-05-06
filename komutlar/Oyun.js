const Discord = require("discord.js");
var steam = require("steam-provider");
var provider = new steam.SteamProvider();

exports.run = (client, message, args) => {
  let game = args[0];
  if (!game)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#91ffbb")
        .setDescription("Lütfen Bir Oyun Adı Giriniz.")
    );
  provider.search(game).then(result => {
    provider.detail(result[0].id, "turkey", "tr").then(results => {
      const embed = new Discord.MessageEmbed()
        .setTitle(`${result[0].name}`)
        .setColor("#91ffbb")
        .setTitle(result[0].name)
        .addField(`Oyunun ID`, result[0].id, false)
        .setImage(results.otherData.imageUrl)
        .addField("Türleri", results.genres, false)
        .addField(
          "Fiyati",
          `Nolmal Fiyat **${results.priceData.initialPrice}** TL \n İndirimli Fiyat **${results.priceData.finalPrice}** TL`,
          false
        )
        .addField("Platformlar", results.otherData.platforms, false)
        .addField("Geliştiricileri", results.otherData.developer, false);
      message.channel.send(embed);
    });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "oyun",
  description: "Oyun Bilgiler",
  usage: "Steam Oyun"
};
