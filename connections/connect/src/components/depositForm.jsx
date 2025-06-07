// src/components/DepositForm.jsx
import React, { useState } from 'react';
import { useContract } from '../hooks/useContract';
import { ethers } from 'ethers';

const DepositForm = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const contract = useContract();

  const handleDeposit = async (e) => {
    e.preventDefault();
    try {
      if (!contract) {
        alert('Contract not initialized');
        return;
      }
      setLoading(true);
      const tx = await contract.DepositETH({
        value: ethers.parseEther(amount),
      });
      await tx.wait();
      alert('Deposit successful!');
      setAmount('');
    } catch (err) {
      console.error(err);
      alert('Deposit failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Deposit AVAX</h2>
      <form onSubmit={handleDeposit}>
        <input
          type="number"
          value={amount}
          placeholder="Amount in AVAX"
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Depositing...' : 'Deposit'}
        </button>
      </form>
    </div>
  );
};

export default DepositForm;
