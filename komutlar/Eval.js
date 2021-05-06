const Discord = require('discord.js')
const util = require('util');
let prefix = process.env.prefix

exports.run = async (client, message, args) => {
     if(message.author.id !== '802181483170103316' & message.author.id !== '444009349166137344')return message.channel.send('Bu komut sadece bot yapımcılarına aittir.')
    if(!args[0]) {
        return message.channel.send(new Discord.MessageEmbed() .setColor("#91ffbb") .addField(`${message.author.tag} Eval Komutu`,`${prefix}eval Kod`, false))
    }
    const code = args.join(' ');
    if(code.includes("token")) {
      const em = new Discord.MessageEmbed()
            .addField('Giriş', `\`\`\`javascript\n${code}\n\`\`\``)
            .setImage("https://images-ext-1.discordapp.net/external/rIYQirYt5G-ri058qOPCZPbmcNRNee0Hp0gam_ZX3S0/https/www.muratkim.com/wp-content/uploads/2019/04/ekşi-sözlük-yazarıyım-buradakiler-beni-eleştiremez_836814.gif")
            .setColor('RANDOM')
        message.channel.send({em});
    }

    function clean(text) {
        if (typeof text !== 'string')
            text = require('util').inspect(text, { depth: 0 })
        text = text
            .replace(/`/g, '`' + String.fromCharCode(8203))
            .replace(/@/g, '@' + String.fromCharCode(8203))
        return text;
    };

    const evalEmbed = new Discord.MessageEmbed().setColor('RANDOM')
    try {
        var evaled = clean(await eval(code));
        if (evaled.constructor.name === 'Promise') evalEmbed.setDescription(`\`\`\`\n${evaled}\n\`\`\``)
        else evalEmbed.setDescription(`\`\`\`xl\n${evaled}\n\`\`\``)
        const newEmbed = new Discord.MessageEmbed()
            .addField('Giriş', `\`\`\`javascript\n${code}\n\`\`\``)
            .addField('Çıkış', `\`\`\`xl\n${evaled}\`\`\``)
            .setColor('RANDOM')
        message.channel.send(newEmbed);
    }
    catch (err) {
        evalEmbed.addField('Hata çıktı;', `\`\`\`xl\n${err}\n\`\`\``);
        evalEmbed.setColor('#FF0000');
        message.channel.send(evalEmbed);
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0,
  kategori: "yapımcı"
}

exports.help = {
    name: 'eval',
    description: 'Yazılan kodu çalıştırır.',
    usage: 'eval [kod]'
}