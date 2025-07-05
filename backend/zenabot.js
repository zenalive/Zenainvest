import Binance from 'node-binance-api';
import dotenv from 'dotenv';
dotenv.config();

const binance = new Binance().options({
  APIKEY: process.env.BINANCE_API_KEY,
  APISECRET: process.env.BINANCE_API_SECRET,
  useServerTime: true,
  reconnect: true,
  proxy: 'http://qlqsy...@207.244.217.165:6712', // Substitua aqui pelo seu proxy válido
  urls: {
    base: 'https://api.binance.com',
  }
});

const SYMBOL = 'BTCUSDT';
const MODO = 'conservador'; // ou 'agressivo'
const QUANTIDADE = MODO === 'agressivo' ? 0.002 : 0.001;

async function iniciarBot() {
  try {
    console.log('🤖 Iniciando ZenaBot no modo', MODO);

    const ticker = await binance.prices(SYMBOL);
    const precoAtual = parseFloat(ticker[SYMBOL]);
    console.log(`Preço atual do ${SYMBOL}: US$ ${precoAtual}`);

    const ordem = await binance.marketBuy(SYMBOL, QUANTIDADE);
    console.log('✅ Ordem de compra executada:', ordem);
  } catch (error) {
    console.error('❌ Erro ao executar o bot:', error.body || error);
  }
}

iniciarBot();
