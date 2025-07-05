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

    // ✅ Método correto para pegar o saldo da conta
    const contas = await client.account.getBalance();

    console.log('✅ Conexão bem-sucedida!');
    console.log('💼 Saldos disponíveis:', contas);

  } catch (error) {
    console.error('❌ Erro na conexão:', error.response?.data || error.message || error);
  }
}

iniciarBot();
