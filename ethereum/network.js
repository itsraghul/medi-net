import web3 from './web3';
import Network from './build/DoctorNetwork/Network.json';

const network = (address) => {
  return new web3.eth.Contract(Network.abi, address);
};

export default network;
