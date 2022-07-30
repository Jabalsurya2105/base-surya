// Minimal kalo recode kasih nama gw
require('./config')
const { proto, getContentType } = require('@adiwajshing/baileys')
const { getGroupAdmins, parseMention, runtime, monospace } = require('./lib/myfunc.js')
const { color, bgcolor } = require('./lib/color')
const fs = require('fs')

module.exports = async (surya, m, msg) => {
try {
if (msg.key && msg.key.remoteJid === 'status@broadcast') return
const pushname = msg.pushName || 'name not detected'
const type = getContentType(msg.message)
const content = JSON.stringify(msg.message)
const from = msg.key.remoteJid
const quoted = type == 'extendedTextMessage' && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
const body = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : ''
const prefix = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@*+,.?=''():√%¢£¥€π¤ΠΦ_&><!`™©®Δ^βα~¦|/\\©^]/gi) : ''
const isCmd = body.startsWith(prefix)
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
const args = body.trim().split(/ +/).slice(1)
const q = args.join(' ')
const isGroup = from.endsWith('@g.us')
const botNumber = surya.user.id.split(':')[0]+'@s.whatsapp.net'
const sender = msg.key.fromMe ? (surya.user.id.split(':')[0]+'@s.whatsapp.net' || surya.user.id) : (msg.key.participant || msg.key.remoteJid)
const groupMetadata = isGroup ? await surya.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.id : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender)
const senderNumber = sender.split('@')[0]
const isBot = botNumber.includes(senderNumber)
const isOwner = ownerNumber.includes(senderNumber) || isBot

function mentions(teks, mems = [], id) {
if (id == null || id == undefined || id == false) {
let res = surya.sendMessage(from, { text: teks, mentions: mems })
return res
} else {
let res = surya.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
return res
}
}

const reply = async(teks) => {await surya.sendMessage(from, { contextInfo: { externalAdReply: {showAdAttribution: true, title: `Hallo ${pushname}`, body: fake, previewType: 'PHOTO', thumbnail: thumb, sourceUrl:`https://wa.me/${ownerNumber}?text=Hai%20bang`}}, text: teks, mentions: parseMention(teks)}, {quoted: msg})}
const replyf = async(id, teks, quoted) => {await surya.sendMessage(id, { contextInfo: { externalAdReply: {showAdAttribution: true, title: `Hallo ${pushname}`, body: fake, previewType: 'PHOTO', thumbnail: thumb, sourceUrl:`https://wa.me/${ownerNumber}?text=Hai%20bang`}}, text: teks, mentions: parseMention(teks)}, {quoted: quoted})}

const sendButMessage = (id, text1, footer1, but = [], options = {}) => {
const buttonMessage = {text: text1, footer: footer1, buttons: but, headerType: 1}
surya.sendMessage(id, buttonMessage, options)}

const sendButTemplate = (id, text1, footer1, but = [], options = {}) => {
const templateMessage = {text: text1,footer: footer1,templateButtons: but}
surya.sendMessage(id, templateMessage, options)}

const sendList = (id, text1, footer1, title1, buttonText1, sec = [], sender, quoted) => {
const listMessage = {text: text1, footer: footer1, title: title1, buttonText: buttonText1, mentions: [sender], sections: sec}
surya.sendMessage(id, listMessage, {quoted: quoted})}

const sendRacMessage = (id, text1 = {}) => {
const reactionMessage = {react: {text: text1,key: msg.key}}
surya.sendMessage(id, reactionMessage)}

switch (command) {
case 'test':
reply('*Oke Active! Runtime :*\n'+monospace(`${runtime(process.uptime())}`))
break
case 'test1':
sendButMessage(from, 'test', 'test', [{buttonId: `${prefix}p1`, buttonText: {displayText: 'Button 1'}, type: 1},{buttonId: 'id2', buttonText: {displayText: 'Button 2'}, type: 1},{buttonId: 'id3', buttonText: {displayText: 'Button 3'}, type: 1}], {quoted:msg})
break

case 'test2':
sendButTemplate(from, 'test', 'test', [{index: 1, urlButton: {displayText: 'test', url: 'https://'}},{index: 2, callButton: {displayText: 'test', phoneNumber: '6285'}},{index: 3, quickReplyButton: {displayText: 'test', id: `0`}}])
break

case 'test3':
sendList(from, 'test', 'test', 'test', 'test', [{title: 'Section 1',rows: [{title: 'Option 1', rowId: 'option1'},{title: 'Option 2', rowId: 'option2', description: 'This is a description'}]},{title: 'Section 2',rows: [{title: 'Option 3', rowId: 'option3'},{title: 'Option 4', rowId: 'option4', description: 'This is a description V2'}]}])
break

case 'react':
sendRacMessage(from,q)
break

case 'kontak':{
addCountCmd('#kontak', sender, _cmd)
if (isQuotedMsg) {
surya.sendContact(from, quotedMsg.sender, q, msg)
} else {
let kont = q.split('|')[0].replace(/[^0-9]/g, '')
surya.sendContact(from, kont, q.split('|')[1], msg)
}
}
break
case 'report': case 'lapor':
if (!q) return reply(`Silahkan Masukan Laporan nya, Contoh : ${command} Ada Bug Di fitur <fitur>`)
reply(`Laporan Telah DiKirimkan ke Owner, Laporan main² atau palsu akan di banned!`)
replyf(ownerNumber, `*[ REPORT ]*\n\n*Dari :* @${sender.split('@')[0]}\n*Pesan :* ${q}`, msg)
break

default:
}} catch (e) {
e = String(e)
if (!e.includes("this.isZero")){
if (!e.includes("Cannot read property 'conversation' of null")){
if (!e.includes("Cannot read property 'contextInfo' of undefined")){
if (!e.includes("Cannot set property 'mtype' of undefined")){
if (!e.includes("jid is not defined")){
if (e.includes("rate-overlimit")){
if (e.includes("Connection Closed")){
if (e.includes("Timed Out")){
console.log(color('|ERROR|', 'red'), color(e, 'cyan'))
surya.sendMessage(ownerNumber, {text:e})}}}}}}}}}}