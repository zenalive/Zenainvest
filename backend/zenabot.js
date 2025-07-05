import dotenv from 'dotenv';
dotenv.config();

const client = new RestClient({
  key: process.env.OKX_API_KEY,
  secret: process.env.OKX_API_SECRET,
  passphrase: process.env.OKX_API_PASSPHRASE,
});
