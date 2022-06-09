const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build/PatientFile');
fs.removeSync(buildPath);

const patientFilePath = path.resolve(__dirname, 'contracts', 'PatientFile.sol');

const source = fs.readFileSync(patientFilePath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'PatientFile.sol': {
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
  'PatientFile.sol'
];

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract + '.json'),
    output[contract]
  );
}
