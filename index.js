const venom = require('venom-bot');
const fs = require('fs');
const { detectarMonto } = require('./montoDetector');

let total = 0;
const DATA_PATH = './data.json';
const GRUPO_OBJETIVO = 'FAKMIND FOR REAL';

if (fs.existsSync(DATA_PATH)) {
    total = JSON.parse(fs.readFileSync(DATA_PATH)).total || 0;
}

venom.create({
  session: 'fakmind-bot',
  headless: true,
  useChrome: false,
  browserArgs: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  .then(client => start(client))
  .catch(e => console.log(e));

function start(client) {
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
