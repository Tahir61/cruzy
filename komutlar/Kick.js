const Discord = require("discord.js");
 const moment = require("moment");
require("moment-duration-format");

exports.run = async (client, message, args) => {
 //Tarih Baş
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
         //Tarih Son

         const mentionedPlayer = message.mentions.members.first();
         if(!mentionedPlayer) 
         return message.channel.send(
             new Discord.MessageEmbed()
             .setColor("#91ffbb")
             .setDescription(`Lütfen Bir Kullanıcıyı Etiketleyin`)
         );
        mentionedPlayer.kick()
    .then(() => {
        message.channel.send(
            new Discord.MessageEmbed()
            .setColor("#91ffbb")
            .addField(`🐺 Kicklenen Kişi`,`${mentionedPlayer.displayName}`, true)
            .addField(`📈 Kickleyen Yetkili`,`${message.author.username}`, true)
            .addField(`💼 Tarih / Zaman`,`${tarih} ${moment().format('H:mm:ss')}`, true)
        )
        })
    .catch(() => {
      message.channel.send(
          new Discord.MessageEmbed()
          .setColor("#91ffbb")
          .setDescription(`\`${mentionedPlayer.displayName}\` Adlı Kişinin Yetkisi Benim Yetkimden Daha Büyük Olduğu İçin Bu Kişiyi Kickleyemiyorum!`)
      )
    })
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kick',
  description: '',
  usage: ''
};