import { OKXRestClient } from 'okx-api';
import dotenv from 'dotenv';
dotenv.config();

const okx = new OKXRestClient({
  apiKey: process.env.OKX_API_KEY,
  apiSecret: process.env.OKX_API_SECRET,
  passphrase: process.env.OKX_API_PASSPHRASE,
  useServerTime: true,
});

const SYMBOL = 'BTC-USDT'; // formato da OKX
const MODO = 'conservador'; // ou 'agressivo'
const QUANTIDADE = MODO === 'agressivo' ? '0.002' : '0.001';

async function iniciarBot() {
  try {
    console.log('🤖 Iniciando ZenaBot (OKX) no modo', MODO);

    const ticker = await okx.getTicker(SYMBOL);
    const precoAtual = parseFloat(ticker.last);
    console.log(`Preço atual do ${SYMBOL}: US$ ${precoAtual}`);

    const ordem = await okx.placeOrder({
      instId: SYMBOL,
      tdMode: 'cash',
      side: 'buy',
      ordType: 'market',
      sz: QUANTIDADE,
    });

    console.log('✅ Ordem de compra executada:', ordem);
  } catch (error) {
    console.error('❌ Erro ao executar o bot:', error.response?.data || error.message);
  }
}

iniciarBot();
