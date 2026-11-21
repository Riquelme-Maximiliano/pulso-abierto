export interface CryptoPrice {
  usd?: number;
  ars?: number;
}

export interface CryptoResponse {
  bitcoin?: CryptoPrice;
  ethereum?: CryptoPrice;
  solana?: CryptoPrice;
}

export interface Cryptocurrency {
  id: string;
  name: string;
}