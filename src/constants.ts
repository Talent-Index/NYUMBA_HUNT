import { getFullnodeUrl } from '@mysten/sui.js/client';

export const PACKAGE_ID = "0xf3b04470d8757b9eb2ac73e0ba1773bc28dab7b5fcf0914770a93805fc45a734";

// Set to 'mainnet', 'testnet', or 'devnet'.
export const NETWORK = 'testnet';
export const FULLNODE_URL = getFullnodeUrl(NETWORK);
