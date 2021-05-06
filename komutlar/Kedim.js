const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  let user = message.mentions.users.first() || message.author;
  var isim = db.fetch(`kediisim_${user.id}`);
  var seviye = db.fetch(`kedilvl_${message.author.id}`);
  var cins = db.fetch(`kedicins_${message.author.id}`);
  if (cins === "tekir") {
    var resim =
      "https://media.discordapp.net/attachments/816288308131790870/830482351611183144/tekir.png?width=246&height=348";
  }
  if (cins === "siyam") {
    var resim =
      "https://media.discordapp.net/attachments/816288308131790870/830490538104586240/siyam.jpg";
  }
  if (cins === "scottish") {
    var resim =
      "https://media.discordapp.net/attachments/816288308131790870/830495208687796272/skatis.jpg";
  }
  if (cins === "van") {
    var resim =
      "https://media.discordapp.net/attachments/816288308131790870/830495941064654918/vankdi.jpg";
  }
  if (cins === "bengal") {
    var resim =
      "https://media.discordapp.net/attachments/816288308131790870/830496776150712439/bngal.jpg";
  }
  message.channel.send(
    new Discord.MessageEmbed()
       .setColor("#91ffbb")
      .addField(`İsim`,`${isim}`, false)
      .addField(`Evcil Hayvan Seviye`,`${seviye}`, false)
      .addField(`Cinsiyeti`,`${cins}`, false)
      .setThumbnail(resim)
  );
};

exports.conf = {
  enabled: true,
  aliases: []
};
exports.help = {
  name: "kedim"
};
