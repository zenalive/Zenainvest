// backend/zenabot.js
import dotenv from 'dotenv';
dotenv.config();

import { TradeApi } from 'okx-api';

const MODE = 'conservador'; // ou 'agressivo'
const SYMBOL = 'BTC-USDT'; // formato OKX
const SIZE = MODE === 'agressivo' ? '0.002' : '0.001';

const apiKey = process.env.OKX_API_KEY;
const apiSecret = process.env.OKX_API_SECRET;
const passphrase = process.env.OKX_API_PASSPHRASE;

if (!apiKey || !apiSecret || !passphrase) {
  console.error('❌ Credenciais da API OKX não encontradas. Verifique o .env.');
  process.exit(1);
}

const tradeApi = new TradeApi({
  apiKey,
  apiSecret,
  passphrase,
  demoTrading: false // mudar para true se estiver usando conta demo
});

async function executarCompra() {
  try {
    console.log(`🤖 Iniciando ZenaBot no modo ${MODE}`);

    const result = await tradeApi.placeOrder({
      instId: SYMBOL,
      tdMode: 'cash',
      side: 'buy',
      ordType: 'market',
      sz: SIZE
    });

    console.log('✅ Ordem de compra executada com sucesso:', result);
  } catch (error) {
    console.error('❌ Erro ao executar ordem de compra:', error.message || error);
  }
}

executarCompra();
