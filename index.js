const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const { detectarMonto } = require('./montoDetector');

let total = 0;
const DATA_PATH = './data.json';

if (fs.existsSync(DATA_PATH)) {
    total = JSON.parse(fs.readFileSync(DATA_PATH)).total || 0;
}

const client = new Client();

client.on('qr', qr => qrcode.generate(qr, { small: true }));

client.on('ready', () => {
    console.log('✅ Bot listo y conectado a WhatsApp');
});

client.on('message', message => {
    const monto = detectarMonto(message.body);
    if (monto) {
        total += monto;
        fs.writeFileSync(DATA_PATH, JSON.stringify({ total }));
        message.reply(`✅ Detectado $${monto}. Total acumulado: $${total}`);
    }
});

client.initialize();