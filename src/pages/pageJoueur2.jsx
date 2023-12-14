
import React, { useState, useEffect } from 'react';
import { HasherAbi, HasherAddress } from "./HasherContract.js";
import { RPSAbi, RPSAddress } from "./RPSContract.js";
import { ethers } from 'ethers';
import '../App.css';
function PageJoueur2() {
  // Initialiser le salt avec une valeur aléatoire
  const [salt, setSalt] = useState(0);
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


  async function play() {
    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setConnectionStatus('Connected');
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(); // Get the signer from the provider
        const contractRPS = new ethers.Contract(RPSAddress, RPSAbi, signer);
        const game = await contractRPS.games(gameId);
        console.log(game);
        const amount = game.stake / 10**18;
        console.log(amount.toString());

        const amountInWei = ethers.utils.parseEther(amount.toString());
        const play = await contractRPS.play(gameId, move, { value: amountInWei, gasLimit: 1000000 });


      } else {
        setConnectionStatus('Please install MetaMask');
      }
    } catch (error) {
      console.log("error1");
      console.log(error);
    }
  }

  async function getEthJ2() {
    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setConnectionStatus('Connected');
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(); // Get the signer from the provider
        const contractRPS = new ethers.Contract(RPSAddress, RPSAbi, signer);


        const solve = await contractRPS.j1Timeout(gameId, { gasLimit: 1000000 });


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
        <div className='middle'>
          <div>
            <h1>Player 2</h1>
            <div>
            <p>1 : Rock</p>
            <p>2 : Paper</p>
            <p>3 : Scissors</p>
            <p>4 : Spock</p>
            <p>5 : Lizard</p>
          </div>
            <h5>Move -------------------------------- Game Id</h5>
            <input type="text" value={move} onChange={handleMoveChange} placeholder="Enter move" />
            <input type="text" value={gameId} onChange={handleGameIdChange} placeholder="Enter Id" />
            <button onClick={play}>Play</button>
          </div>
          <div>
            <button onClick={getEthJ2}>Get my eth back</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default PageJoueur2;
