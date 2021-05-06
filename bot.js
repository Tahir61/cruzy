const Discord = require("discord.js");
const client = new Discord.Client();
const chalk = require("chalk");
const db = require("quick.db");
const http = require("http");
const express = require("express");
const { Player } = require("discord-player");
const app = express();
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");
require("./util/eventLoader.js")(client);
client.cooldowns = new Discord.Collection()
const queue = new Map();

var prefix = process.env.prefix;

//-----------------------------------------------\\
app.get("/", (request, response) => {
  console.log(Date.now() + " PİNGLENDİ ");
  response.sendStatus(200);
});
app.listen(8000);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
//-----------------------------------------------\\

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === process.env.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(process.env.TOKEN);

////-----------------------------\\\\\\\\\

client.on("message", async message => {
  if (message.author.id === client.user.id) return;
  let sayıcık = await db.fetch(`sayı`);
  if (!sayıcık) sayıcık = 1;
  let sayı = sayıcık.toString();
  let kanal = "837604405170667520";
  if (message.channel.id !== kanal) return;

  if (message.author.id === db.fetch(`sayı-sahip`)) {
    message.delete({ timeout: 100, reason: "ce" });
    message
      .reply(
        " En son sayıyı sen yazmışsın, başkasının oyuna katılmasını bekle."
      )
      .then(s => s.delete({ timeout: 5000, reason: "s" }));
    return;
  }

  if (isNaN(message.content)) {
    message.delete({ timeout: 100, reason: "ce" });

    message
      .reply(" Sadece sayı girebilirsin.")
      .then(s => s.delete({ timeout: 5000, reason: "s" }));
    return;
  }

  if (message.content !== sayı) {
    message.delete({ timeout: 100, reason: "ce" });
    message
      .reply(" Lütfen bir sonraki sayıyı gir. Bir sonraki sayı; " + sayı)
      .then(s => s.delete({ timeout: 5000, reason: "s" }));

    let ce = Number(message.content);
    db.set(`sayı`, ce + 1);
    db.set(`sayı-sahip`, message.author.id);
    return;
  }
});

client.on("message", async message => {
  if (message.author.id === client.user.id) return;
  let kanal = "837604356076732456";
  if (message.channel.id !== kanal) return;

  let kelime = await db.fetch(`kelime`);

  if (message.author.id === db.fetch(`kelime-sahip`)) {
    message.delete({ timeout: 100, reason: "ce" });
    message
      .reply(
        " En son kelimeyi sen **yazmışsın**, başkasının oyuna katılmasını bekle."
      )
      .then(s => s.delete({ timeout: 5000, reason: "s" }));
    return;
  }

  if (!kelime) {
    message.react("<:onay:837604686134640690>");
    db.set(`kelime`, message.content.substr(-1));
    db.set(`kelime-sahip`, message.author.id);
    return;
  }

  if (!message.content.toLowerCase().startsWith(kelime)) {
    message.delete({ timeout: 100, reason: "ce" });
    message
      .reply(" Yeni kelime **" + kelime + "** harfi ile başlamalıdır.")
      .then(s => s.delete({ timeout: 5000, reason: "s" }));
    return;
  }

  message.react("<:onay:837604686134640690>");
  db.set(`kelime`, message.content.substr(-1));
  db.set(`kelime-sahip`, message.author.id);
});

//Seviye

client.cooldown = new Discord.Collection();
client.config = {
  cooldown: 1 * 1000
};
client.db = require("quick.db");
client.on("message", async message => {
  if (!message.guild || message.author.bot) return;
  // XP
  exp(message);
  function exp(message) {
    if (
      !client.cooldown.has(`${message.author.id}`) ||
      Date.now() - client.cooldown.get(`${message.author.id}`) >
        client.config.cooldown
    ) {
      let exp = client.db.add(`exp_${message.author.id}`, 1);
      let level = Math.floor(0.3 * Math.sqrt(exp));
      let lvl =
        client.db.get(`level_${message.author.id}`) ||
        client.db.set(`level_${message.author.id}`, 1);
      if (level > lvl) {
        let newLevel = client.db.set(`level_${message.author.id}`, level);
        message.channel.send(
          `${message.author.toString()} Başarıyla Level Atladın ${newLevel}!`
        );
      }
      client.cooldown.set(`${message.author.id}`, Date.now());
    }
  }
});

//ModLog Baş

client.on("messageDelete", async message => {
  if (message.author.bot || message.channel.type == "dm") return;
  let log = message.guild.channels.cache.get(
    await db.fetch(`log_${message.guild.id}`)
  );
  if (!log) return;
  const embed = new Discord.MessageEmbed()
    .setTitle(message.author.username + " | Mesaj Silindi")
    .addField("Kullanıcı: ", message.author)
    .addField("Kanal: ", message.channel)
    .addField("Mesaj: ", "" + message.content + "");
  log.send(embed);
});
client.on("messageUpdate", async (oldMessage, newMessage) => {
  let modlog = await db.fetch(`log_${oldMessage.guild.id}`);
  if (!modlog) return;
  let embed = new Discord.MessageEmbed()
    .setAuthor(oldMessage.author.username, oldMessage.author.avatarURL())
    .addField("**Eylem:**", "Mesaj Düzenleme")
    .addField(
      "**Mesajın sahibi:**",
      `<@${oldMessage.author.id}> === **${oldMessage.author.id}**`
    )
    .addField("**Eski Mesajı:**", `${oldMessage.content}`)
    .addField("**Yeni Mesajı:**", `${newMessage.content}`)
    .setTimestamp()
    .setColor("#00ff00")
    .setFooter(
      `Sunucu: ${oldMessage.guild.name} - ${oldMessage.guild.id}`,
      oldMessage.guild.iconURL()
    )
    .setThumbnail(oldMessage.guild.iconURL);
  client.channels.cache.get(modlog).send(embed);
});
client.on("channelCreate", async channel => {
  let modlog = await db.fetch(`log_${channel.guild.id}`);
  if (!modlog) return;
  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_CREATE" })
    .then(audit => audit.entries.first());
  let kanal;
  if (channel.type === "text") kanal = `<#${channel.id}>`;
  if (channel.type === "voice") kanal = `\`${channel.name}\``;
  let embed = new Discord.MessageEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL())
    .addField("**Eylem:**", "Kanal Oluşturma")
    .addField("**Kanalı Oluşturan Kişi:**", `<@${entry.executor.id}>`)
    .addField("**Oluşturduğu Kanal:**", `${kanal}`)
    .setTimestamp()
    .setColor("#00ff00")
    .setFooter(
      `Sunucu: ${channel.guild.name} - ${channel.guild.id}`,
      channel.guild.iconURL()
    )
    .setThumbnail(channel.guild.iconUR);
  client.channels.cache.get(modlog).send(embed);
});
client.on("channelDelete", async channel => {
  let modlog = await db.fetch(`log_${channel.guild.id}`);
  if (!modlog) return;
  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_DELETE" })
    .then(audit => audit.entries.first());
  let embed = new Discord.MessageEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL())
    .addField("**Eylem:**", "Kanal Silme")
    .addField("**Kanalı Silen Kişi:**", `<@${entry.executor.id}>`)
    .addField("**Silinen Kanal:**", `\`${channel.name}\``)
    .setTimestamp()
    .setColor("#00ff00")
    .setFooter(
      `Sunucu: ${channel.guild.name} - ${channel.guild.id}`,
      channel.guild.iconURL()
    )
    .setThumbnail(channel.guild.iconURL);
  client.channels.cache.get(modlog).send(embed);
});
client.on("roleCreate", async role => {
  let modlog = await db.fetch(`log_${role.guild.id}`);
  if (!modlog) return;
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_CREATE" })
    .then(audit => audit.entries.first());
  let embed = new Discord.MessageEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL())
    .addField("**Eylem:**", "Rol Oluşturma")
    .addField("**Rolü oluşturan kişi:**", `<@${entry.executor.id}>`)
    .addField("**Oluşturulan rol:**", `\`${role.name}\` **=** \`${role.id}\``)
    .setTimestamp()
    .setFooter(
      `Sunucu: ${role.guild.name} - ${role.guild.id}`,
      role.guild.iconURL
    )
    .setColor("#00ff00")
    .setThumbnail(role.guild.iconURL);
  client.channels.cache.get(modlog).send(embed);
});
client.on("roleDelete", async role => {
  let modlog = await db.fetch(`log_${role.guild.id}`);
  if (!modlog) return;
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());
  let embed = new Discord.MessageEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL())
    .addField("**Eylem:**", "Rol Silme")
    .addField("**Rolü silen kişi:**", `<@${entry.executor.id}>`)
    .addField("**Silinen rol:**", `\`${role.name}\` **=** \`${role.id}\``)
    .setTimestamp()
    .setFooter(
      `Sunucu: ${role.guild.name} - ${role.guild.id}`,
      role.guild.iconURL
    )
    .setColor("#00ff00")
    .setThumbnail(role.guild.iconURL);
  client.channels.cache.get(modlog).send(embed);
});
client.on("emojiCreate", async emoji => {
  let modlog = await db.fetch(`log_${emoji.guild.id}`);
  if (!modlog) return;
  const entry = await emoji.guild
    .fetchAuditLogs({ type: "EMOJI_CREATE" })
    .then(audit => audit.entries.first());
  let embed = new Discord.MessageEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL())
    .addField("**Eylem:**", "Emoji Oluşturma")
    .addField("**Emojiyi oluşturan kişi:**", `<@${entry.executor.id}>`)
    .addField("**Oluşturulan emoji:**", `${emoji} - İsmi: \`${emoji.name}\``)
    .setTimestamp()
    .setColor("#00ff00")
    .setFooter(
      `Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`,
      emoji.guild.iconURL
    )
    .setThumbnail(emoji.guild.iconURL);
  client.channels.cache.get(modlog).send(embed);
});
client.on("emojiDelete", async emoji => {
  let modlog = await db.fetch(`log_${emoji.guild.id}`);
  if (!modlog) return;
  const entry = await emoji.guild
    .fetchAuditLogs({ type: "EMOJI_DELETE" })
    .then(audit => audit.entries.first());
  let embed = new Discord.MessageEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL())
    .addField("**Eylem:**", "Emoji Silme")
    .addField("**Emojiyi silen kişi:**", `<@${entry.executor.id}>`)
    .addField("**Silinen emoji:**", `${emoji}`)
    .setTimestamp()
    .setFooter(
      `Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`,
      emoji.guild.iconURL
    )
    .setColor("#00ff00")
    .setThumbnail(emoji.guild.iconURL);
  client.channels.cache.get(modlog).send(embed);
});
client.on("emojiUpdate", async (oldEmoji, newEmoji) => {
  let modlog = await db.fetch(`log_${oldEmoji.guild.id}`);
  if (!modlog) return;
  const entry = await oldEmoji.guild
    .fetchAuditLogs({ type: "EMOJI_UPDATE" })
    .then(audit => audit.entries.first());
  let embed = new Discord.MessageEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL())
    .addField("**Eylem:**", "Emoji Güncelleme")
    .addField("**Emojiyi güncelleyen kişi:**", `<@${entry.executor.id}>`)
    .addField(
      "**Güncellenmeden önceki emoji:**",
      `${oldEmoji} - İsmi: \`${oldEmoji.name}\``
    )
    .addField(
      "**Güncellendikten sonraki emoji:**",
      `${newEmoji} - İsmi: \`${newEmoji.name}\``
    )
    .setTimestamp()
    .setColor("#00ff00")
    .setFooter(
      `Sunucu: ${oldEmoji.guild.name} - ${oldEmoji.guild.id}`,
      oldEmoji.guild.iconURL
    )
    .setThumbnail(oldEmoji.guild.iconURL);
  client.channels.cache.get(modlog).send(embed);
});
client.on("guildBanAdd", async (guild, user) => {
  let modlog = await db.fetch(`log_${guild.id}`);
  if (!modlog) return;
  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());
  let embed = new Discord.MessageEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL())
    .addField("**Eylem:**", "Yasaklama")
    .addField("**Kullanıcıyı yasaklayan yetkili:**", `<@${entry.executor.id}>`)
    .addField("**Yasaklanan kullanıcı:**", `**${user.tag}** - ${user.id}`)
    .addField("**Yasaklanma sebebi:**", `${entry.reason}`)
    .setTimestamp()
    .setColor("#00ff00")
    .setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)
    .setThumbnail(guild.iconURL);
  client.channels.cache.get(modlog).send(embed);
});
client.on("guildBanRemove", async (guild, user) => {
  let modlog = await db.fetch(`log_${guild.id}`);
  if (!modlog) return;
  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_REMOVE" })
    .then(audit => audit.entries.first());
  let embed = new Discord.MessageEmbed()
    .setAuthor(entry.executor.username, entry.executor.avatarURL())
    .addField("**Eylem:**", "Yasak kaldırma")
    .addField("**Yasağı kaldıran yetkili:**", `<@${entry.executor.id}>`)
    .addField(
      "**Yasağı kaldırılan kullanıcı:**",
      `**${user.tag}** - ${user.id}`
    )
    .setTimestamp()
    .setColor("#00ff00")
    .setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)
    .setThumbnail(guild.iconURL);
  client.channels.cache.get(modlog).send(embed);
});
// ModLog Son

client.on("ready", async () => {
  await console.log("Giriş yaptım!");
  setInterval(() => {
    let değerler = [
      `${prefix}yardım | ${prefix}bot-bilgi`,
      `Minecraft Reklam ${prefix}mc-reklam`,
      `Discord Reklam ${prefix}dc-reklam`
    ];
    let sonuç = değerler[Math.floor(Math.random() * değerler.length)];
    client.user.setActivity(sonuç);
  }, 5000);
});

//Puan Gold

client.on("message", async message => {
  // puan sistemi mesaj yazdıkça puan
  const request = require("node-superfetch");
  let dakdest = await db.fetch(`sğre11_${message.member.id}`);
  let timeout = 1800000; //1000 = 1 saniye //30dk şuan
  const ms = require("parse-ms");
  let amount = Math.floor(Math.random() * 5) + 2;
  if (dakdest !== null && timeout - (Date.now() - dakdest) > 0) {
    let time = ms(timeout - (Date.now() - dakdest));
  } else {
    if (message.member.bot) return;
    if (message.content.length > 1) {
      db.add(`para_${message.guild.id}_${message.author.id}`, +amount);
      db.set(`sğre11_${message.author.id}`, Date.now());
      client.channels.cache.get("838391089588731934").send(
        `:rosette: ` +
          message.member.user.tag +
          ` **` +
          amount +
          `** puan kazandı!`
        //`:rosette: <@` + message.member.username + `> **` + amount + `** puan kazandı!`
      );
    }
  }
});

Date.prototype.toTurkishFormatDate = function(format) {
  let date = this,
    day = date.getDate(),
    weekDay = date.getDay(),
    month = date.getMonth(),
    year = date.getFullYear(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();

  let monthNames = new Array(
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık"
  );
  let dayNames = new Array(
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi"
  );

  if (!format) {
    format = "dd MM yyyy - hh:ii:ss";
  }
  format = format.replace("mm", month.toString().padStart(2, "0"));
  format = format.replace("MM", monthNames[month]);

  if (format.indexOf("yyyy") > -1) {
    format = format.replace("yyyy", year.toString());
  } else if (format.indexOf("yy") > -1) {
    format = format.replace("yy", year.toString().substr(2, 2));
  }

  format = format.replace("dd", day.toString().padStart(2, "0"));
  format = format.replace("DD", dayNames[weekDay]);

  if (format.indexOf("HH") > -1)
    format = format.replace("HH", hours.toString().replace(/^(\d)$/, "0$1"));
  if (format.indexOf("hh") > -1) {
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;
    format = format.replace("hh", hours.toString().replace(/^(\d)$/, "0$1"));
  }
  if (format.indexOf("ii") > -1)
    format = format.replace("ii", minutes.toString().replace(/^(\d)$/, "0$1"));
  if (format.indexOf("ss") > -1)
    format = format.replace("ss", seconds.toString().replace(/^(\d)$/, "0$1"));
  return format;
};

//Mute Sistem Baş

client.on("ready", async () => {
  setInterval(() => {
    let datalar = db.all().filter(data => data.ID.startsWith("mute_"));

    if (datalar.size < 0) return;

    datalar.forEach(datacık => {
      let kullanıcı = datacık.ID.replace("mute_", "");
      let data = db.fetch(`mute_${kullanıcı}`);

      let süre = data.ms - (Date.now() - data.başlangıç);

      let sunucu = client.guilds.cache.get(data.sunucu);
      let member = sunucu.members.cache.get(kullanıcı);
      let kanal = sunucu.channels.cache.get(data.kanal);
      let sebep = data.sebep;
      let moderator = client.users.cache.get(data.moderator);
      let mute_rol = sunucu.roles.cache.find(
        rol =>
          rol.name.toLowerCase().includes("susturuldu") ||
          rol.name.toLowerCase().includes("muted")
      );

      if (!member) {
        let hata = new Discord.MessageEmbed()
          .setTitle("Mute Devam Edemedi!")
          .setDescription(
            "**" +
              kullanıcı +
              "** ID'ye sahip; **" +
              moderator.username +
              "** Tarafından mutelenen kullanıcı **" +
              sunucu.name +
              "** Sunucusundan ayrılmış!"
          )
          .setColor("#91ffbb");
        kanal.send("<@!" + moderator.id + ">", hata);
        db.delete(datacık.ID);

        return;
      }

      if (süre > 0) return;

      let bitti = new Discord.MessageEmbed()
        .setTitle(":hammer_pick: Mute Kaldırıldı!")
        .setColor("#91ffbb")
        .setDescription(
          "Aşağıdaki kullanıcıya ait mute; **Süresi Dolduğu** için sonlandırıldı!"
        )
        .addField("\u200b", "\u200b")
        .addField(
          ":bust_in_silhouette: __KULLANICI__ :bust_in_silhouette:",
          "» Kullanıcı: **" +
            member.user.username +
            "**\n» Mute Sebebi: **" +
            sebep +
            "**\n» ID: **" +
            member.user.id +
            "**"
        )
        .addField("\u200b", "\u200b")
        .addField(
          ":maple_leaf: __YETKİLİ__ :maple_leaf:",
          "» Yetkili: **" +
            moderator.username +
            "**\n» ID: **" +
            moderator.id +
            "**"
        );
      kanal.send(
        "<@!" + member.user.id + "> , <@!" + moderator.id + ">",
        bitti
      );

      member.roles.remove(mute_rol);
      db.delete(datacık.ID);
    });
  }, 5000);
});

//Evcil Hayvan

////RESIMLI GUVENLIK////

client.on('guildMemberAdd',async member => {
  let user = client.users.cache.get(member.id);
  let kanal = client.channels.cache.get(db.fetch(`guvenlik${member.guild.id}`)) 
       const Canvas = require('canvas')
       const canvas = Canvas.createCanvas(360,100);
       const ctx = canvas.getContext('2d');
  
  const resim1 = await Canvas.loadImage('https://i.hizliresim.com/DWmOSd.png')
    const resim2 = await Canvas.loadImage('https://i.hizliresim.com/hIvMtu.png')
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gün = moment(kurulus).format('dddd');  
    var kontrol;
      if (kurulus > 2629800000) kontrol = resim2
    if (kurulus < 2629800000) kontrol = resim1


     const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/621045237137276929/621045305089064980/arka.png");
       ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
   

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format: "png"}));
  ctx.drawImage(kontrol,0,0,canvas.width, canvas.height)
  ctx.beginPath();
    ctx.lineWidth = 4;
  ctx.fill()
    ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
    ctx.clip();
  ctx.drawImage(avatar, 143,10, 73, 72  );

   if (!kanal) return
       const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'güvenlik.png');
    kanal.send(attachment)
});


const Canvas = require('canvas')
client.on('guildMemberAdd', async member => {
  const ch = db.get(`hgbbKanalResim_${member.guild.id}`)
  if(!ch) return
  const kanal = member.guild.channels.cache.get(ch)
  const canvas =  Canvas.createCanvas(1980,1080)
  const ctx =  canvas.getContext('2d')
  const userImage = await Canvas.loadImage(member.user.displayAvatarURL({format:'jpg',size:4096}))
  const bg = await Canvas.loadImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-2YMnOcscL37z_OfV1xgaIYo2mzByCSK3Vg&usqp=CAU')
  const door = await Canvas.loadImage('https://cdn.glitch.com/16c1f2c8-0b25-4605-89ff-c86675c38573%2F1594111765064.png?v=1594111792947')
  ctx.drawImage(bg,0,0,canvas.width,canvas.height)
  ctx.drawImage(door,0,915,150,150)
  ctx.font = '100px Candara'
  ctx.fillStyle ="#F0F8FF"
  ctx.textAlign ='center'
  ctx.fillText(member.user.username,1000,780)
  ctx.fillText('Sunucumuza Hoşgeldin.',1000,950)
  ctx.lineWidth = 10
  ctx.beginPath()
  ctx.shadowColor='black'
  ctx.shadowBlur =100
  ctx.arc(1020,350,270,0,Math.PI*2,true)
  ctx.closePath()
  ctx.stroke()
  ctx.clip()
  ctx.drawImage(userImage,725,55,590,590)
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(),'hoşgeldin.png')
  if(!kanal)return;
  kanal.send(attachment)
  })
client.on('guildMemberRemove', async member => {
  const ch =  db.get(`hgbbKanalResim_${member.guild.id}`)
  if(!ch) return
  const kanal = member.guild.channels.cache.get(ch)
  const canvas =  Canvas.createCanvas(1980,1080)
  const ctx =  canvas.getContext('2d')
  const userImage = await Canvas.loadImage(member.user.displayAvatarURL({format:'jpg',size:4096}))
  const bg = await Canvas.loadImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-2YMnOcscL37z_OfV1xgaIYo2mzByCSK3Vg&usqp=CAU')
  const door = await Canvas.loadImage('https://cdn.glitch.com/16c1f2c8-0b25-4605-89ff-c86675c38573%2F1594111773688.png?v=1594111787318')
  ctx.drawImage(bg,0,0,canvas.width,canvas.height)
  ctx.drawImage(door,1829,915,150,150)
  ctx.font = '100px Candara'
  ctx.fillStyle ="#F0F8FF"
  ctx.textAlign ='center'
  ctx.fillText(member.user.username,1000,780)
  ctx.fillText('Sunucumuzdan Ayrıldı.',1000,950)
  ctx.lineWidth = 10
  ctx.beginPath()
  ctx.shadowColor='black'
  ctx.shadowBlur =100
  ctx.arc(1020,350,270,0,Math.PI*2,true)
  ctx.closePath()
  ctx.stroke()
  ctx.clip()
  ctx.drawImage(userImage,725,55,590,590)
  ctx.blur = 3
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(),'gülegüle.png')
  if(!kanal) return;
  kanal.send(attachment)
  })

