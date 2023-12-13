
import React, { useState } from 'react';
import { HasherAbi, HasherAddress } from "./HasherContract.js";
import { RPSAbi, RPSAddress } from "./RPSContract.js";
import { ethers } from 'ethers';
import crypto from 'crypto';
import './App.css';
function App() {
  /// Function to generate a random uint256 using the Web Crypto API
  const generateRandomUint256 = async () => {
    const randomBuffer = new Uint8Array(32); // 32 bytes for a uint256

    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(randomBuffer);
    } else {
      // Fallback to Math.random() if crypto.getRandomValues is not available
      for (let i = 0; i < randomBuffer.length; i++) {
        randomBuffer[i] = Math.floor(Math.random() * 256);
      }
    }

    const randomUint256 = '0x' + Array.from(randomBuffer)
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');

    return randomUint256;
  };

  // State for the salt
  const [salt, setSalt] = useState('');

  // Function to update the salt with a new random uint256
  const updateSalt = async () => {
    const newSalt = await generateRandomUint256();
    setSalt(newSalt);
  };

  const [move, setMove] = useState(0);
  const [address, setAddress] = useState('0x');
  const [hashResult, setHashResult] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const [gameId, setGameId] = useState(0);
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleMoveChange = (event) => {
    setMove(event.target.value);
  };
  const handleGameIdChange = (event) => {
    setGameId(event.target.value);
  }
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
            updateSalt();
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
        const init = await contractRPS.createGame(hashResult, address, { value: amountInWei });
        const id = await contractRPS.gameId();
        setGameId(id.toString());
      } else {
        setConnectionStatus('Please install MetaMask');
      }
    } catch (error) {
      console.log("error1");
      console.log(error);
    }
  }
  async function display() {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setConnectionStatus('Connected');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(); // Get the signer from the provider
    const contractRPS = new ethers.Contract(RPSAddress, RPSAbi, signer);
    console.log("gameId:", gameId.toString());
    const game = await contractRPS.games(gameId.toString());
    console.log(game);
    console.log(game.j1);
  }
  async function displayGameId() {
    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setConnectionStatus('Connected');
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(); // Get the signer from the provider
        const contractRPS = new ethers.Contract(RPSAddress, RPSAbi, signer);
        // console.log(contractRPS)
        const id = await contractRPS.gameId();
        // console.log(id);
        console.log(id.toString());
      } else {
        setConnectionStatus('Please install MetaMask');
      }
    } catch (error) {
      console.log("error1");
      console.log(error);
    }
  }
  async function play() {
    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setConnectionStatus('Connected');
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(); // Get the signer from the provider
        const contractRPS = new ethers.Contract(RPSAddress, RPSAbi, signer);
        const amountInWei = ethers.utils.parseEther('0.01');
        const play = await contractRPS.play(gameId, move, { value: amountInWei, gasLimit: 1000000 });


      } else {
        setConnectionStatus('Please install MetaMask');
      }
    } catch (error) {
      console.log("error1");
      console.log(error);
    }
  }
  async function solve() {
    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setConnectionStatus('Connected');
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(); // Get the signer from the provider
        const contractRPS = new ethers.Contract(RPSAddress, RPSAbi, signer);

        const solve = await contractRPS.solve(gameId, move, salt, { gasLimit: 1000000 });


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
      <div className='container'>
        <div className='left'>
          <div>
            {/* <button onClick={connect}>Connect</button> */}
            <h1>Player 1</h1>
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
            <button onClick={initGame}>Init Game : 1st Move</button>
          </div>
          <div>
            <button onClick={display}>Display</button>
          </div>
          <div>
            <button onClick={displayGameId}>Display Game Id</button>
          </div>
        </div>
        <div className='middle'>
          <div>
            <h1>Player 2</h1>
            <h5>Move -------------------------------- Game Id</h5>
            <input type="text" value={move} onChange={handleMoveChange} placeholder="Enter move" />
            <input type="text" value={gameId} onChange={handleGameIdChange} placeholder="Enter Id" />
            <button onClick={play}>Play</button>
          </div>
        </div>
        <div className='rigth'>
          <h1>Result</h1>
          <h5>Solve</h5>
          <input type="text" value={move} onChange={handleMoveChange} placeholder="Enter move" />
          <button onClick={solve}>Solve</button>
        </div>
      </div>
    </>
  );
}
export default App;
