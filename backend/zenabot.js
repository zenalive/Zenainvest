import axios from 'axios';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.OKX_API_KEY;
const API_SECRET = process.env.OKX_API_SECRET;
const PASSPHRASE = process.env.OKX_API_PASSPHRASE;

const SYMBOL = 'BTC-USDT';
let modoAtual = 'conservador';

const QUANTIDADES = {
  conservador: '0.001',
  agressivo: '0.002',
};

function gerarAssinatura(timestamp, method, requestPath, body = '') {
  const prehash = `${timestamp}${method}${requestPath}${body}`;
  return crypto.createHmac('sha256', API_SECRET).update(prehash).digest('base64');
}

async function enviarOrdemCompra() {
  const timestamp = new Date().toISOString();
  const method = 'POST';
  const path = '/api/v5/trade/order';
  const bodyData = {
    instId: SYMBOL,
    tdMode: 'cash',
    side: 'buy',
    ordType: 'market',
    sz: QUANTIDADES[modoAtual],
  };
  const body = JSON.stringify(bodyData);
  const sign = gerarAssinatura(timestamp, method, path, body);

  const headers = {
    'OK-ACCESS-KEY': API_KEY,
    'OK-ACCESS-SIGN': sign,
    'OK-ACCESS-TIMESTAMP': timestamp,
    'OK-ACCESS-PASSPHRASE': PASSPHRASE,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.post(`https://www.okx.com${path}`, bodyData, { headers });
    console.log('✅ Ordem enviada:', response.data);
  } catch (error) {
    console.error('❌ Erro ao enviar ordem:', error.response?.data || error.message);
  }
}

function alternarModo() {
  modoAtual = modoAtual === 'conservador' ? 'agressivo' : 'conservador';
  console.log(`🔁 Modo alterado para: ${modoAtual}`);
}

enviarOrdemCompra();
