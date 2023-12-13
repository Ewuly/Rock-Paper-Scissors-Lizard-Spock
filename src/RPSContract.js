export const RPSAddress = "0x6E7aa1A33DfDe02C7De349eb07D943c29d8CF7Bf";
export const RPSAbi = [
  {
    "inputs": [],
    "name": "TIMEOUT",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_c1Hash",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "_j2",
        "type": "address"
      }
    ],
    "name": "createGame",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "gameId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "games",
    "outputs": [
      {
        "internalType": "address",
        "name": "j1",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "j2",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "c1Hash",
        "type": "bytes32"
      },
      {
        "internalType": "enum RPS.Move",
        "name": "c2",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "stake",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lastAction",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_gameId",
        "type": "uint256"
      }
    ],
    "name": "j1Timeout",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_gameId",
        "type": "uint256"
      }
    ],
    "name": "j2Timeout",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_gameId",
        "type": "uint256"
      },
      {
        "internalType": "enum RPS.Move",
        "name": "_c2",
        "type": "uint8"
      }
    ],
    "name": "play",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_gameId",
        "type": "uint256"
      },
      {
        "internalType": "enum RPS.Move",
        "name": "_c1",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "_salt",
        "type": "uint256"
      }
    ],
    "name": "solve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]