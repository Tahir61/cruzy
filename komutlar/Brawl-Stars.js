const Discord = require('discord.js');
const moment = require("moment")
exports.run = async (client, message) => {
  var karakterler = [
    "Colt",
    "Nita",
    "Bull",
    "Jessie",
    "Mortis",
    "Gale",
    "Leon",
    "Spike",
    "Sandy",
    "Crow",
    "MR.P",
    "Max",
    "Sprout",
    "Tara",
    "Gene",
    "Surge",
    "Brock",
    "Dynamike",
    "Frank",
    "Piper",
    "Carl",
    "Penny",
    "Darrly",
    "Rico",
    "Rosa",
    "Poco",
    "Barley",
    "El Primo",
    "8-Bit",
    "Tick",
    "Bibi",
    "Bo",
    "Shelly",
    "Pam",
    "Bea",
    "Emz",
    "Jacky",
    "Nani",
    "Shelly"
   
    ]  
  var karakterler = karakterler[Math.floor(Math.random(1) * karakterler.length)]
  const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setAuthor(`${message.author.username} ın Kutusu;`, message.author.avatarURL())
    .setImage('https://media0.giphy.com/media/JOdQKwcV985Ip2ezWh/giphy.gif')
    .addField(`Kutu Açan`,`${message.author.username}`, true)
    .addField(`Kutu Çıkan Karakterler`,`${karakterler}`, true)
    .addField(`Tarih / Zaman`,`${moment().format('DD/MM/YYYY | H:mm:ss')}`, true)
    .addField(`Not`,`Bu Bir Sumilator Asla Gerçek Hesabına Gelmez.`, false)
    message.channel.send(embed);
  }
 
 
exports.conf = {
  aliases: ['jsal']
}
exports.help = {
  name: "kutuaç"
}