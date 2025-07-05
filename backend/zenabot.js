import pkg from 'okx-api';
const { RestClient } = pkg;

import dotenv from 'dotenv';
dotenv.config();

const client = new RestClient({
  key: process.env.OKX_API_KEY,
  secret: process.env.OKX_API_SECRET,
  passphrase: process.env.OKX_API_PASSPHRASE,
});

const SYMBOL = 'BTC-USDT';
let modoAtual = 'conservador';
const QUANTIDADES = {
  conservador: '0.001',
  agressivo: '0.002',
};

function alternarModo() {
  modoAtual = modoAtual === 'conservador' ? 'agressivo' : 'conservador';
  console.log(`🔁 Modo alterado para: ${modoAtual}`);
}

async function iniciarBot() {
  try {
    console.log('🤖 Iniciando ZenaBot no modo', modoAtual);

    const ticker = await client.getTicker(SYMBOL);
    console.log('🧾 Ticker completo:', ticker);

    const precoAtual = ticker?.data?.[0]?.last || 'N/A';
    console.log(`💰 Preço atual do ${SYMBOL}: US$ ${precoAtual}`);

    const ordem = await client.placeOrder({
      instId: SYMBOL,
      tdMode: 'cash',
      side: 'buy',
      ordType: 'market',
      sz: QUANTIDADES[modoAtual],
    });

    console.log('✅ Ordem de compra executada:', ordem);
  } catch (error) {
    console.error('❌ Erro ao executar o bot:', error.message || error);
  }
}

iniciarBot();
