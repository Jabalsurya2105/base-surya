const fs = require('fs')
const chalk = require('chalk')

global.ownerNumber = "62895415497664@s.whatsapp.net"
global.ownerName = "Surya"
global.botName = "Mechabot Multi Device"
global.fake = "© 2022 Copyright by Surya"
global.sessionName = "Surya"
global.thumb = fs.readFileSync('mecha.jpg')
global.mess = {
success: 'Sukses',
wait: '*_Loading..._*',
limit: 'Maaf limit harian kamu sudah habis, beli premium untuk mendapatkan limit Unlimited, atau kamu dapat menunggu reset limit pada pukul 05.05 setiap harinya',
error: {
Iv: 'Link yang kamu berikan tidak valid',
api: 'Maaf terjadi kesalahan'
},
group: 'Perintah ini hanya bisa digunakan di grup',
private: 'Perintah ini hanya bisa digunakan di private message',
admin: 'Perintah ini hanya bisa digunakan oleh Admin Grup',
botAdmin: 'Bot Harus menjadi admin',
owner: 'Perintah ini hanya dapat digunakan oleh owner bot',
premium: 'Perintah ini khusus user premium'
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.cyanBright(`Update'${__filename}'`))
delete require.cache[file]
require(file)
})