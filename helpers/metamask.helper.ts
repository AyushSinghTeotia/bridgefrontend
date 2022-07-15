import { USER_WALLET_TYPE } from "const";
import { ethers } from "ethers";
import { UserWallet } from "interfaces";
import { store } from "./storage.helper";
import { mapSignerAsWallet } from "./wallet.helper";
export const connect = async (): Promise<UserWallet> => {
    if (!(<any>window).ethereum) {
        throw new Error('MetaMask provider not available');
    }
    const accounts = await (<any>window).ethereum.request({ method: 'eth_requestAccounts' });
    if (accounts?.length > 0) {
        const provider = new ethers.providers.Web3Provider((<any>window).ethereum)
        const signer = provider.getSigner(accounts[0]);
        store(USER_WALLET_TYPE, 'metamask');
        return mapSignerAsWallet(signer, 'metamask');
    } else {
        throw new Error('No MetaMask account retrieved');
    }
}

export const addSwitchBSCNetwork = async () => {
    if (!(<any>window).ethereum) {
        throw new Error('MetaMask provider not available');
    }
    await (<any>window).ethereum.request({ 
        method: 'wallet_addEthereumChain',
        params: [
            {
                "chainId": "0x61", //97 in decimal
                "chainName": "Smart Chain - Testnet",
                "rpcUrls": ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
                "nativeCurrency": {
                    "name": "BNB",
                    "symbol": "BNB",
                    "decimals": 18
                },
                "blockExplorerUrls": ["https://testnet.bscscan.com"]
                }
        ]
    });
}


