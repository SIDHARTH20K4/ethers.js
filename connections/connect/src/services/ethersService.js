// ethersService.js
import { ethers } from 'ethers';
import CustodialWalletABI from './abis/CustodialWallet.json';

const CONTRACT_ADDRESS = '0xd54b9e4bdfdadedd5ab9840109de8a7e971ea8c6'; 

let provider;
let signer;
let contract;

/**
 * Initializes provider, signer, and contract using window.ethereum
 */
export async function initContract() {
  if (!window.ethereum) {
    throw new Error('No wallet found. Please install MetaMask or a compatible wallet.');
  }

  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  contract = new ethers.Contract(CONTRACT_ADDRESS, CustodialWalletABI, signer);
  return contract;
}

/**
 * Returns the current connected address
 */
export async function getConnectedAddress() {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  return accounts[0];
}

/**
 * Deposit ETH into the contract
 */
export async function depositETH(amountInEth) {
  validateContract();
  if (!amountInEth || isNaN(amountInEth)) throw new Error('Invalid amount');

  const tx = await contract.depositETH({
    value: ethers.utils.parseEther(amountInEth.toString()),
  });
  return await tx.wait();
}

/**
 * Deposit ERC20 tokens (requires approval)
 */
export async function depositToken(tokenAddress, amount, decimals = 18) {
  validateContract();

  const erc20 = new ethers.Contract(
    tokenAddress,
    ['function approve(address spender, uint256 amount) public returns (bool)'],
    signer
  );

  const parsedAmount = ethers.utils.parseUnits(amount.toString(), decimals);

  const approveTx = await erc20.approve(CONTRACT_ADDRESS, parsedAmount);
  await approveTx.wait();

  const depositTx = await contract.depositToken(tokenAddress, parsedAmount);
  return await depositTx.wait();
}

/**
 * Withdraw ETH to user (admin only)
 */
export async function withdrawNative(userAddress, amountInEth) {
  validateContract();

  const tx = await contract.withdrawNative(
    userAddress,
    ethers.utils.parseEther(amountInEth.toString())
  );
  return await tx.wait();
}

/**
 * Withdraw ERC20 tokens to user (admin only)
 */
export async function withdrawToken(userAddress, tokenAddress, amount, decimals = 18) {
  validateContract();

  const tx = await contract.withdrawToken(
    userAddress,
    tokenAddress,
    ethers.utils.parseUnits(amount.toString(), decimals)
  );
  return await tx.wait();
}

/**
 * Get ETH or token deposits for a user
 */
export async function getDeposits(userAddress, tokenAddress = ethers.constants.AddressZero) {
  validateContract();
  const result = await contract.deposits(userAddress, tokenAddress);
  return ethers.utils.formatEther(result);
}

/**
 * Get ETH or token withdrawals for a user
 */
export async function getWithdrawals(userAddress, tokenAddress = ethers.constants.AddressZero) {
  validateContract();
  const result = await contract.withdrawals(userAddress, tokenAddress);
  return ethers.utils.formatEther(result);
}

/**
 * Check if given address is the contract owner
 */
export async function isOwner(address) {
  validateContract();
  const owner = await contract.owner();
  return owner.toLowerCase() === address.toLowerCase();
}

/**
 * Sets up wallet-related event listeners (optional)
 */
export function setupWalletListeners({ onAccountsChanged, onChainChanged } = {}) {
  if (!window.ethereum) return;

  window.ethereum.on('accountsChanged', (accounts) => {
    if (onAccountsChanged) onAccountsChanged(accounts[0] || null);
  });

  window.ethereum.on('chainChanged', (_chainId) => {
    if (onChainChanged) onChainChanged(parseInt(_chainId, 16));
    window.location.reload();
  });
}

/**
 * Utility: Format ETH
 */
export function formatETH(wei) {
  return ethers.utils.formatEther(wei);
}

/**
 * Utility: Parse ETH
 */
export function parseETH(eth) {
  return ethers.utils.parseEther(eth.toString());
}

/**
 * Internal: Ensure contract is initialized
 */
function validateContract() {
  if (!contract) throw new Error('Contract not initialized. Call initContract() first.');
}
