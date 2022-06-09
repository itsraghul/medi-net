import React, { useState } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Network from '../../../../../ethereum/network';
import ipfs from '../../../../../ethereum/ipfs';
import web3 from '../../../../../ethereum/web3';
import Layout from '../../../../../components/Layout';
var CryptoJS = require('crypto-js');

function encode(myString) {
  const encodedWord = CryptoJS.enc.Utf8.parse(myString); // encodedWord Array object
  const encoded = CryptoJS.enc.Base64.stringify(encodedWord); // string: 'NzUzMjI1NDE='
  return encoded;
}
function decode(encoded) {
  const encodedWord = CryptoJS.enc.Base64.parse(encoded); // encodedWord via Base64.parse()
  const decoded = CryptoJS.enc.Utf8.stringify(encodedWord); // decode encodedWord via Utf8.stringify() '75322541'
  return decoded;
}

const NewReport = () => {
  const router = useRouter();
  const address = router.query.address;
  const [errorMessage, setErrorMessage] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const [buffer, setBuffer] = useState(null);

  const convertToBuffer = async (reader) => {
    const buffer = await Buffer.from(reader.result);
    setBuffer(buffer);
  };

  const captureFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => convertToBuffer(reader);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const accounts = await web3.eth.getAccounts();
      const network = Network(address);
      let res = await ipfs.add(buffer);
      console.log(res[0].hash);
      let url = 'https://ipfs.io/ipfs/' + res[0].hash;
      var ciphertext = encode(
        CryptoJS.AES.encrypt(JSON.stringify(url), 'medinet').toString()
      );
      var decryptedtext = CryptoJS.AES.decrypt(
        decode(ciphertext).toString(),
        'medinet'
      ).toString(CryptoJS.enc.Utf8);
      console.log('encrypted:' + ciphertext);
      console.log('decrypted:' + decryptedtext);
      setFileUrl(url.toString());
      console.log(url);
      let result = await network.methods
        .createPatientReport(description, ciphertext)
        .send({ from: accounts[0] });
      console.log(result);
      alert('Report Added!!!');
      setDescription('');
      router.back();
    } catch (err) {
      // console.log(e);
      setErrorMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Layout>
        <Link
          href="/network/all-networks/[address]/reports/"
          as={`/network/all-networks/${address}/reports/`}
        >
          <a style={{ fontSize: '1.05rem', fontWeight: 'bold' }}>
            {' '}
            {`< Back `}
          </a>
        </Link>
        <h2>Create a new Request</h2>
        <Form onSubmit={onSubmit} error={!!errorMessage}>
          <Form.Field>
            <label style={{ fontSize: '1.2rem' }}>Description</label>
            <Input
              type="text"
              placeholder="Describe the report issue."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label style={{ fontSize: '1.2rem' }}>File</label>
            <Input
              type="file"
              inputProps={{
                accept:
                  'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              }}
              label="Medical Report"
              onChange={captureFile}
            />
          </Form.Field>
          {/* <Form.Field>
            <label style={{ fontSize: '1.2rem' }}>Requested Doctor </label>
            <Input
              type="text"
              placeholder="Address of requested Doctor"
              value={requestedDoctor}
              onChange={(event) => setRequestedDoctor(event.target.value)}
            />
          </Form.Field> */}
          <Message error header="Oops!" content={errorMessage} />
          <Button
            type="submit"
            color="instagram"
            disabled={!description && !fileUrl}
            loading={loading}
          >
            Create!
          </Button>
        </Form>
      </Layout>
    </>
  );
};

export default NewReport;
