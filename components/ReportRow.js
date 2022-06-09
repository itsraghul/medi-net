import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
// import Link from 'next/link';
import web3 from '../ethereum/web3';
import Network from '../ethereum/network';
import { useRouter } from 'next/router';
var CryptoJS = require('crypto-js');

function decode(encoded) {
  const encodedWord = CryptoJS.enc.Base64.parse(encoded); // encodedWord via Base64.parse()
  const decoded = CryptoJS.enc.Utf8.stringify(encodedWord); // decode encodedWord via Utf8.stringify() '75322541'
  return decoded;
}

const ReportRow = (props) => {
  const router = useRouter();
  const { Row, Cell } = Table;
  const { id, report } = props;
  const readyToFinalize = report.approvalCount > props.doctorCount / 2;

  let decryptedtext = CryptoJS.AES.decrypt(
    decode(report.fileUrl).toString(),
    'medinet'
  ).toString(CryptoJS.enc.Utf8);

  const url = decryptedtext.substring(9, decryptedtext.length - 1);
  // console.log(urlLink);
  // const url = 'ipfs.io/ipfs/QmVz4VxFrnwaxkZR4tvoNKt7JoyBv7eA7uZ89q13jxXFGY';

  const onApprove = async () => {
    const network = Network(props.address);
    const accounts = await web3.eth.getAccounts();
    await network.methods.verifyReport(props.id).send({ from: accounts[0] });
    router.reload();
  };

  const onFinalize = async () => {
    const network = Network(props.address);
    const accounts = await web3.eth.getAccounts();
    await network.methods.finalizeReport(props.id).send({ from: accounts[0] });
  };
  return (
    <>
      <Row
        disabled={report.verified}
        positive={readyToFinalize && !report.verified}
      >
        <Cell>{id}</Cell>
        <Cell>{report.description}</Cell>
        <Cell>
          <a href={'https://' + url} target="_blank" rel="noopener noreferrer">
            {/* View/Download Record */}
            <Icon name="download" />
          </a>
        </Cell>
        <Cell>{report.requestedDoctor}</Cell>
        <Cell>
          {report.approvalCount}/{props.doctorsCount}
        </Cell>
        <Cell>
          {report.verified ? (
            'Request'
          ) : (
            <Button color="green" basic onClick={onApprove}>
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {report.verified ? (
            'Finalised'
          ) : (
            <Button color="instagram" basic onClick={onFinalize}>
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    </>
  );
};

export default ReportRow;
