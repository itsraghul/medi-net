const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build/DoctorNetwork');
fs.removeSync(buildPath);

const doctorNetworkFilePath = path.resolve(
  __dirname,
  'contracts',
  'DoctorNetwork.sol'
);

const source = fs.readFileSync(doctorNetworkFilePath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'DoctorNetwork.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  'DoctorNetwork.sol'
];

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract + '.json'),
    output[contract]
  );
}
