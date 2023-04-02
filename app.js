const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

// express for handling APIs
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

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
    return balance;
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

// currently not in use - - - - - - - - - - - - - - - - - - - - 
async function totalSupply(){
  try{
      let totalSupply = await contract.methods.totalSupply().call();
      console.log('\nTotal supply: ' + totalSupply + '\n');
  }catch(error){
      console.error(error);
  }
}
// currently not in use - - - - - - - - - - - - - - - - - - - - 

app.get('/mint', function(req, res){
   mintTokens();  
})

app.post('/getBalance', function(req, res){
  let address = req.body.address;
  checkBalance(address);  
  res.redirect('/');
})

async function unlockAccount(accountAddress, ToAddress, amount, accountPassphrase) {
  try {
    const unlocked = await web3.eth.personal.unlockAccount(accountAddress, accountPassphrase, 300);

    if (unlocked) {
      console.log(`Account ${accountAddress} is now unlocked!`);
    } else {
      console.error(`Failed to unlock account ${accountAddress}`);
    }
    transfer(accountAddress, ToAddress, amount);
  } catch (error) {
    console.error(`Error unlocking account ${accountAddress}: ${error}`);
  }
}


app.post('/transfer', function(req, res){
  let FromAddress = req.body.FromAddress;
  let pass = req.body.pass;
  let ToAddress = req.body.ToAddress;
  let amount = req.body.amount;
  unlockAccount(FromAddress, ToAddress, amount, pass);
  res.redirect('/');
})

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/home.html'));
});

app.listen(3000, ()=>{
  console.log("Server is listening on port 3000");
});

