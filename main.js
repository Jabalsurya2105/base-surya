require('./config')
const { default: makeWASocket, DisconnectReason, useSingleFileAuthState} = require('@adiwajshing/baileys')
const fs = require('fs')
const { state, saveState } = useSingleFileAuthState(`./${sessionName}.json`)
const pino = require('pino')
const connectKeWA = () => {
const surya = makeWASocket({logger:pino({level:'silent'}), printQRInTerminal: true, auth: state,browser: ['Mecha Bot Multi Device', 'Safari', '3.0.0']})
require('./surya.js')
nocache('./surya.js', module => console.log(`"${module}" Updated!`))
require('./lib/myfunc.js')
nocache('./lib/myfunc.js', module => console.log(`"${module}" Updated!`))
surya.sendContact = async (id, numbers, name, quoted, mn) => {
let number = numbers.replace(/[^0-9]/g, '')
const vcard = 'BEGIN:VCARD\n' 
+ 'VERSION:3.0\n' 
+ 'FN:' + name + '\n'
+ 'ORG:;\n'
+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
+ 'END:VCARD'
return surya.sendMessage(id, { contacts: { displayName: name, contacts: [{ vcard }] }},{ quoted: quoted })
}
surya.ev.on('messages.upsert', async m => {
if (!m.messages) return
msg = m.messages[0]
console.log(msg)
require("./surya")(surya, m, msg)})
surya.ev.on('connection.update', (update) => {
const {connection,lastDisconnect} = update
if (connection === 'close') {lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut ? connectKeWA() : ''}
if (update.receivedPendingNotifications) surya.sendMessage(ownerNumber, {text: `Mechabot berhasil tersambung ke nomor ini`})
surya.ev.on('creds.update', saveState)
console.log(update)})}
function nocache(module, cb = () => { }) {console.log(`Module ${module} detected!`) 
fs.watchFile(require.resolve(module), async () => {await uncache(require.resolve(module))
cb(module)})}
function uncache(module = '.') {
return new Promise((resolve, reject) => {
try {
delete require.cache[require.resolve(module)]
resolve()} catch (e) {reject(e)}})}
connectKeWA()