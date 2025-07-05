import pkg from 'okx-api';
const { RestClient } = pkg;

import dotenv from 'dotenv';
dotenv.config();

const client = new RestClient({
  key: process.env.OKX_API_KEY,
  secret: process.env.OKX_API_SECRET,
  passphrase: process.env.OKX_API_PASSPHRASE,
});

async function iniciarBot() {
  try {
    console.log('🤖 Testando conexão com OKX...');

    // ✅ Correção aqui: não usa .account.getBalance
    const saldo = await client.getBalance();
    console.log('✅ Conexão bem-sucedida!');
    console.log('💰 Saldo OKX:', saldo);

  } catch (error) {
    console.error('❌ Erro na conexão:', error.response?.data || error.message || error);
  }
}

iniciarBot();
