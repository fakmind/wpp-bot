function detectarMonto(texto) {
    const match = texto.match(/(\d+(?:[.,]\d{1,2})?)\s*✅/);
    if (match) {
        return parseFloat(match[1].replace(',', '.'));
    }
    return null;
}

module.exports = { detectarMonto };