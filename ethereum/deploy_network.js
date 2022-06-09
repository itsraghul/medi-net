const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require('./build/DoctorNetwork/NetworkFactory.json');

const provider = new HDWalletProvider(
  'note orphan wood door mirror milk lunar abandon already taste utility acid',
  'https://rinkeby.infura.io/v3/b3d784d7ac5546fa8809aa72e3f18597'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ gas: '3000000', from: accounts[0] });

  //   console.log(JSON.stringify(compiledFactory.abi));
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
