export const RPSAddress = "0x3A019c1A5e58F3Ab8FD2A8D31ccE14dfD7005Ac4";
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