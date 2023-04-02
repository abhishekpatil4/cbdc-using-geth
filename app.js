const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

// Set up Web3 provider
var web3 = new Web3('http://localhost:8545')

// Load smart contract ABI and address
const contractAbi = JSON.parse(fs.readFileSync(path.resolve(__dirname, './abi.json')));
const contractAddress = '0xC635C862f9d2499ac6FD34211A430670f8Cd3c4e'; // Replace with your contract address

// Instantiate smart contract object
const contract = new web3.eth.Contract(contractAbi, contractAddress);

//minting Rs 2000
async function mintTokens() {
    contract.methods.mint2000().send({ from: '0x717c913b027e831f82b8623be4550e2e92fb96b4' }) 
        .then(console.log)
}

//function to check token balance
async function checkBalance(account) {
  try {
    let balance = await contract.methods.balanceOf(account).call();
    console.log(`Account balance of ${account}: ${balance}`);
  } catch (error) {
    console.error(error);
  }
}

async function transfer(from_, to, amt){
    try{
        console.log(from_ + ' ' + to + ' ' + amt);
        contract.methods.transfer(to, amt).send({ from: from_})
        .then(console.log)
    }catch(error){
        console.error(error);
    }
}


//function calle:

//  mintTokens();
// checkBalance('0xaf28babb597903f16a4ede2a08fc9393f451034b');
// transfer('0x717c913b027e831f82b8623be4550e2e92fb96b4', '0xaf28babb597903f16a4ede2a08fc9393f451034b', 1);



