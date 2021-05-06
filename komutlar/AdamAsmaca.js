const { stripIndents } = require('common-tags');
const db = require('quick.db')
const Discord = require('discord.js')
let oyndurum = new Set();

module.exports.run = async (bot, message, args) => {
let para = db.fetch(`para_${message.author.id}`) 
  var miktar = args[0]
  let miktarcık = miktar
  if(!miktar) return message.channel.send(new Discord.MessageEmbed()
                                        .setColor("RED")
                                        .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
                                        .setDescription(`Oynamak için miktar girmelisin (en fazla 50000 💸)`))
 if(miktar > 50000) return message.channel.send(new Discord.MessageEmbed()
                                        .setColor("RED")
                                        .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
                                        .setDescription(`En fazla 50000 💸 bahis yatırabilirsin!`))   
if(miktar > para) return message.channel.send(new Discord.MessageEmbed()
                                              .setColor("RED")
                                        .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
                                        .setDescription(`Oynamak için cüzdanında ${para ? "sadece " + para + ' 💸 var!' : 'hiç paran yok!'}`)) 
        if(miktar < 0) return message.channel.send(new Discord.MessageEmbed() 
                                        .setColor("RED")
                                        .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
                                        .setDescription(`Seni zeki seni bunu başka kimse denemedi sandım de mi, lütfen 1 den büyük bir değer gir!`))  
  else{
  if(miktar <= para) {
    if(miktar > 0){
  let miktarcık = miktar
     let kelime= [
  "elma",
  "lordozi",
  "armut",
  "lüks",
  "eşya",
  "sunucu",
  "koruma",
  "eşek",
  "anlamak",
  "siber",
  "kral",
  "eskici",
  "yılbaşı",
  "köpek",
  "salata",
  "biber",
  "camii",
  "maymun",
  "aslan",
  "ali",
  "bali",
   "kuş",
   "salatalık",
   "kahveci",   
   "çocuk",
   "bilgisayar",
   "kalem",
   "oyun",
    "sandık",
    "defter",
    "kitap",   
  "duman",
  "balta",
  "dizi",
  "film",
  "buluş",
  "ayrılmak",
  "şemsiye",
  "telefon",
   "discord",
   "okul",
   "sınav",   
   "hece",
   "harf",
   "dil",
   "soru",
    "oyuncak",
    "zeytin",
    "fare",   
            
] 
 
        if (oyndurum.has(message.channel.id)) return message.reply('Kanal başına sadece bir adam asmaca oyunu meydana gelebilir.');

        try {
            const cevap = kelime[Math.floor(Math.random() * kelime.length)].toLowerCase();
            let point = 0;
            let displayText = null;
            let tahmin = false;
            const confirmation = [];
            const yanlış = [];
            const display = new Array(cevap.length).fill('_');
            while (cevap.length !== confirmation.length && point < 6) {
                await message.channel.send(stripIndents`
                    ${displayText === null ? '**Adam Asmaca**!' : displayText ? '**Çok iyisin!**' : '**Yanlış Harf!**'}
                         **Kelime:**    \`${display.join(' ')}\`
                    **Yanlış Harfler:** ${yanlış.join(', ') || 'Yok'}
                    \`\`\`
                    _________
                    |    |
                    |    ${point > 0 ? '' : ''}
                    |   ${point > 2 ? '┌' : ' '}${point > 1 ? '()' : ''}${point > 3 ? '┐' : ''}
                    |    ${point > 4 ? '/' : ''} ${point > 5 ? '\\' : ''}
                    |
                    \`\`\`
                `);
                const filter = res => {
                    const choice = res.content.toLowerCase();
                    return res.author.id === message.author.id && !confirmation.includes(choice) && !yanlış.includes(choice);
                };
                const guess = await message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 50000
                });
                if (!guess.size) {
                    await message.channel.send('Zamanın doldu!');
                  db.add(`para_${message.author.id}`, -miktarcık)
                  message.channel.send(miktarcık + ' TL kaybettin')
                    break;
                }
                const choice = guess.first().content.toLowerCase();
                if (choice === 'end') break;
                if (choice.length > 1 && choice === cevap) {
                    tahmin = true;
                    break;
                } else if (cevap.includes(choice)) {
                    displayText = true;
                    for (let i = 0; i < cevap.length; i++) {
                        if (cevap.charAt(i) !== choice) continue;
                        confirmation.push(cevap.charAt(i));
                        display[i] = cevap.charAt(i);
                    }
                } else {
                    displayText = false;
                    if (choice.length === 1) yanlış.push(choice);
                    point++;
                }
            }
            oyndurum.delete(message.channel.id);
            if (cevap.length === confirmation.length || tahmin){ 
               db.add(`para_${message.author.id}`, miktarcık)
              message.channel.send(`**Tebrikler kelimeyi buldun! **${cevap}! `+ miktarcık + 'TL kazandın');}
            else { 
              db.add(`para_${message.author.id}`, -miktarcık)
              message.channel.send(`Maalesef bilemedin kelime bu: **${cevap}** ` + miktarcık + 'TL kaybettin');}
        } catch (err) {
            oyndurum.delete(message.channel.id);
            return message.reply(`Olamaz! Bir Hata Verdi: \`${err.message}\``);
        }
    
   }
  }
   
 
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['adamasmaca'],
  permlevel: 0
};

exports.help = {
  name: 'adamasmaca',
  description: 'Adam asmaca oynarsınız.',
  usage: 'adamasmaca'
};