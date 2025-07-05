import okx from 'okx-api';
import dotenv from 'dotenv';
dotenv.config();

const tradeApi = okx.TradeApi({
  apiKey: process.env.OKX_API_KEY,
  apiSecret: process.env.OKX_API_SECRET,
  passphrase: process.env.OKX_API_PASSPHRASE,
});

const SYMBOL = 'BTC-USDT';
const MODO = 'conservador'; // ou 'agressivo'
const QUANTIDADE = MODO === 'agressivo' ? '0.002' : '0.001';

async function iniciarBot() {
  try {
    console.log('🤖 Iniciando ZenaBot no modo', MODO);

    const ticker = await tradeApi.getTicker(SYMBOL);
    const precoAtual = ticker.last;
    console.log(`Preço atual do ${SYMBOL}: US$ ${precoAtual}`);

    const ordem = await tradeApi.placeOrder({
      instId: SYMBOL,
      tdMode: 'cash',
      side: 'buy',
      ordType: 'market',
      sz: QUANTIDADE,
    });

    console.log('✅ Ordem de compra executada:', ordem);
  } catch (error) {
    console.error('❌ Erro ao executar o bot:', error.message || error);
  }
}

iniciarBot();
