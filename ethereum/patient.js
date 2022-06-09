import web3 from './web3';
import Patient from './build/PatientFile/PatientContract.json';

const instance = new web3.eth.Contract(
  Patient.abi,
  '0x0a72867AbeB4379ed1c10991F6D5e5bBfc757203'
);

export default instance;
