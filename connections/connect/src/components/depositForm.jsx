import { useState, useEffect } from 'react';
import {
  initContract,
  getConnectedAddress,
  depositETH,
} from '../services/ethersService';

const DepositForm = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [userAddress, setUserAddress] = useState('');

  useEffect(() => {
    (async () => {
      await initContract();
      const address = await getConnectedAddress();
      setUserAddress(address);
    })();
  }, []);

  const handleDeposit = async () => {
    try {
      setLoading(true);
      await depositETH(amount);
      alert('Deposit successful!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Welcome, {userAddress.slice(0, 6)}...{userAddress.slice(-4)}</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount in ETH"
      />
      <button onClick={handleDeposit} disabled={loading}>
        {loading ? 'Depositing...' : 'Deposit ETH'}
      </button>
    </div>
  );
};

export default DepositForm;
