const venom = require('venom-bot');
const fs = require('fs');
const { detectarMonto } = require('./montoDetector');

let total = 0;
const DATA_PATH = './data.json';
const GRUPO_OBJETIVO = 'FAKMIND FOR REAL';

// Cargar total acumulado si ya existe
if (fs.existsSync(DATA_PATH)) {
    total = JSON.parse(fs.readFileSync(DATA_PATH)).total || 0;
}

// ⚠️ ESTA CONFIGURACIÓN ES CLAVE PARA QUE FUNCIONE EN RAILWAY
venom
  .create({
    session: 'fakmind-bot',
    headless: true,
    useChrome: false,
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  .then(client => start(client))
  .catch(e => console.error('Error al iniciar Venom:', e));

function start(client) {
  console.log("✅ Bot activo y escuchando mensajes...");

  client.onMessage(async message => {
    if (message.isGroupMsg && message.chat.name === GRUPO_OBJETIVO) {
      const monto = detectarMonto(message.body);
      if (monto) {
        total += monto;
        fs.writeFileSync(DATA_PATH, JSON.stringify({ total }));
        client.sendText(message.from, `✅ Detectado $${monto}. Total acumulado: $${total}`);
      }
    }
  });
}