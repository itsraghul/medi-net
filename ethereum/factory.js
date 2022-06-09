import web3 from './web3';
import NetworkFactory from './build/DoctorNetwork/NetworkFactory.json';

const factory = new web3.eth.Contract(
  NetworkFactory.abi,
  '0xf74ed5c6aFdC646e5F9E52117a0eA61565d1971e'
);

export default factory;
