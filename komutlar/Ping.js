const Discord = require("discord.js");
let prefix = process.env.prefix;

exports.run = async (client, message, args) => {
 const discordPing = message.client.ws.ping;
  message.channel.send(
      new Discord.MessageEmbed() 
      .setColor("RANDOM")
      .setDescription("📊 Ping Hesaplanıyor..."))
      .then(message => {
     const ping = message.createdTimestamp = message.createdTimestamp;
     message.edit( 
     new Discord.MessageEmbed() 
     .setColor("RANDOM") 
     .setDescription(`**:mag: Discord Geçikmesi:** \`${discordPing}\` ms \n **:alarm_clock: Bot Geçikmesi** \`${ping}\` ms`)
     ) 
  })
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ping"],
  permLevel: 0
};

exports.help = {
  name: "ping",
  description: "Taslak",
  usage: "Taslak"
};
