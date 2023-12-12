import React, { useState } from 'react';
import { HasherAbi, HasherAddress } from "./HasherContract.js";
import { RPSAbi, RPSAddress } from "./RPSContract.js";
import { ethers } from 'ethers';
import './App.css';

function App() {
  const [move, setMove] = useState(0);
  const [salt, setSalt] = useState(0);
  const [address, setAddress] = useState('0x');
  const [hashResult, setHashResult] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleMoveChange = (event) => {
    setMove(event.target.value);
  };

  const handleSaltChange = (event) => {
    setSalt(event.target.value);
  };

  async function getHash() {
    try {
      const networkData = await provider.getNetwork();
      try {
        if (typeof window.ethereum !== "undefined") {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          if (accounts.length > 0) {
            setConnectionStatus('Connected');

            if (networkData.chainId !== 11155111) {
              if (window.ethereum) {
                try {
                  await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [
                      {
                        chainId: '0xaa36a7', // Sepolia network chain ID
                      },
                    ],
                  });
                  window.location.reload();
                } catch (error) {
                  console.error("Error switching chain:");
                  console.error(error);
                }
              }
            }

            const contract = new ethers.Contract(HasherAddress, HasherAbi, provider);
            const hash = await contract.hash(move, salt);
            setHashResult(hash);
          } else {
            setConnectionStatus('Please connect MetaMask');
            await window.ethereum.request({ method: "eth_requestAccounts" });
            setConnectionStatus('Connected');
          }
        }
      } catch (error) {
        window.location.reload();
        console.error(error);
      }
    } catch (error) {
      window.location.reload();
      console.log(error);
    }
  }

  async function connect() {
    try {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setConnectionStatus('Connected');
      } else {
        setConnectionStatus('Please install MetaMask');
      }
    }
    catch (error) {
      console.log("error");
      console.log(error);
    }
  }

  async function initGame() {
    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setConnectionStatus('Connected');
  
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(); // Get the signer from the provider
        const contractRPS = new ethers.Contract(RPSAddress, RPSAbi, signer);
  
        const amountInWei = ethers.utils.parseEther('0.01');
        const init = await contractRPS.RPSinit(hashResult, accounts[0], { value: amountInWei });
      } else {
        setConnectionStatus('Please install MetaMask');
      }
    } catch (error) {
      console.log("error1");
      console.log(error);
    }
  }
  

  return (
    <>
      <div>
        {/* <button onClick={connect}>Connect</button> */}
      </div>
      <div>
        <p>1 : Rock</p>
        <p>2 : Paper</p>
        <p>3 : Scissors</p>
        <p>4 : Spock</p>
        <p>5 : Lizard</p>
      </div>
      <h5>Move -------------------------------- Address</h5>
      <input type="text" value={move} onChange={handleMoveChange} placeholder="Enter move" />
      <input type="text" value={address} onChange={handleAddressChange} placeholder="Enter address" />
      <button onClick={getHash}>Test</button>
      <div>
        <strong>Hash Result:</strong> {hashResult}
      </div>
      <div>
        <button onClick={initGame}>Get Address</button>
      </div>
    </>
  );
}

export default App;
