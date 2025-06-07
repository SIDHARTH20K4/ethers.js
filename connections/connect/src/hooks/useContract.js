// src/hooks/useContract.js

import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import CONTRACT_ABI from '../abis/CustodialWallet.json';
const CONTRACT_ADDRESS = "0xd54b9e4bdfdadedd5ab9840109de8a7e971ea8c6";

export const useContract = () => {
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const init = async() => {
            if (window.ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
                setContract(contractInstance);
            }
        };
        init();
    }, []);

    return contract;
};


//0xd54b9e4bdfdadedd5ab9840109de8a7e971ea8c6