const db = require(`quick.db`);

exports.run = async (client, message, args) => {
  let kisi = message.mentions.users.first();
  if (!kisi) {
    message.reply(`Lütfen birini taglayınız.`);
    return;
  }
  db.delete(`gold_${kisi.id}`);
  let enis = client.users.cache.get(kisi.id);
  client.channels.cache
    .get(`838391089588731934`)
    .send(`${enis.tag} **Gold** yetkisi alındı!`);
  message.channel.send(
    `Başarıyla **${kisi}** adlı şahıs **Gold** üyeden oldu!`
  );
  return;
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4,
  kategori: "puan"
};
exports.help = {
  name: "gold-çıkar",
  description: "sa",
  usage: "as"
};
