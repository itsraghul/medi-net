import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Message,
  Placeholder,
  Grid,
  Form,
  Input,
  Table,
  Container,
} from 'semantic-ui-react';

import web3 from '../../../ethereum/web3';
import IPFS from '../../../ethereum/ipfs';
import patient from '../../../ethereum/patient';
import Layout from '../../../components/Layout';
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

const Doctor = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('male');
  const [dob, setDob] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [allergy, setAllergy] = useState('');
  const [account, setAccount] = useState('loading');
  const [pview, setPview] = useState(false);
  const [rview, setRview] = useState(false);
  const [orecord, setOrecord] = useState(false);
  const [viewDoc, setViewDoc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buffer, setBuffer] = useState(null);
  const [rlen, setRlen] = useState(0);
  const [records, setRecords] = useState([]);
  const [hosName, setHosName] = useState('');
  const [reason, setReason] = useState('');
  const [admOn, setAdmOn] = useState('');
  const [disOn, setDisOn] = useState('');
  //   const [ipfs, setIpfs] = useState('');
  const [address, setAddress] = useState('');
  const [docAccAddr, setDocAccAddr] = useState('');
  const [docName, setDocName] = useState('');
  const [docContact, setDocContact] = useState('');
  const [docAddress, setDocAddress] = useState('');
  const [docSpec, setDocSpec] = useState('');
  const [docVerified, setDocVerified] = useState(null);
  const [oview, setOview] = useState(false);
  const [arecord, setArecord] = useState(false);

  const setDisplayAcc = async () => {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  };

  useEffect(() => {
    setDisplayAcc();
  }, []);

  const getDoctor = async () => {
    // setAddView(false);
    setViewDoc(false);
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await patient.methods
        .getDoctorByAddress(account)
        .call({ from: accounts[0] })
        .then((res) => {
          let result = res;
          console.log(result);
          setLoading(false);
          //   setAddView(false);
          setViewDoc(true);
          setDocAccAddr(result['_doc_addr']);
          setDocName(result['_doc_name']);
          setDocSpec(result['_doc_specialisation']);
          setDocContact(result['_doc_contact']);
          setDocAddress(result['_doc_address']);
          setDocVerified(result['isVerified']);
          setDopen(true);
        });
    } catch (e) {
      setLoading(false);
      // alert('error');
    }
  };

  const onHosNameChange = (event) => {
    setHosName(event.target.value);
    console.log(hosName);
  };
  const onReasonChange = (event) => {
    setReason(event.target.value);
    console.log(reason);
  };
  const onAdmOnChange = (event) => {
    setAdmOn(event.target.value.toString());
    console.log(admOn);
  };
  const onDisOnChange = (event) => {
    setDisOn(event.target.value.toString());
    console.log(disOn);
  };
  const onAddressChange = (event) => {
    setAddress(event.target.value);
    console.log(address);
  };

  const viewDoctorView = () => {
    if (viewDoc) {
      return (
        <>
          <Card fluid>
            <Card.Content>
              <Container>
                Name:{'\t' + docName}
                <br></br>
                <br></br>
                Address:{'\t' + docAddress}
                <br></br>
                <br></br>
                Specialisation:{'\t' + docSpec}
                <br></br>
                <br></br>
                Contact:{'\t' + docContact}
                <br></br>
                <br></br>
                Wallet Address:{'\t' + docAccAddr}
                <br></br>
                <br></br>
                Verified: {'\t' + docVerified ? 'Yes' : 'No'}
                <br></br>
                <br></br>
              </Container>
            </Card.Content>
          </Card>
          <br></br>
          <br></br>
        </>
      );
    }
    return null;
  };

  const isLoading = () => {
    if (loading) {
      return (
        <Grid>
          <Card>
            <Card.Content>
              <Placeholder>
                <Placeholder.Header image>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Paragraph>
              </Placeholder>

              <Placeholder>
                <Placeholder.Header image>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Paragraph>
              </Placeholder>
            </Card.Content>
          </Card>
        </Grid>
      );
    }
    return null;
  };

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

  const onOtherRecordSubmit = async () => {
    try {
      setLoading(true);
      setOrecord(false);
      const accounts = await web3.eth.getAccounts();
      let res = await IPFS.add(buffer);
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
      await this.setState({ ipfs: url.toString() });
      let result = await patient.methods
        .addRecord(address, hosName, reason, admOn, disOn, ciphertext)
        .send({ from: accounts[0] });
      console.log(result);
      setLoading(false);
      setOrecord(true);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setOrecord(true);
      alert('Error Uploading Report');
    }
  };

  const addOtherRecord = () => {
    if (orecord) {
      return (
        <Card fluid>
          <Card.Header>
            <center>
              <h2>Add Records</h2>
            </center>
          </Card.Header>
          <Card.Content>
            <Form onSubmit={onOtherRecordSubmit}>
              <Form.Field>
                <label style={{ fontSize: '1.2rem' }}>Patient Address</label>
                <Input
                  type="text"
                  placeholder="Patient Address"
                  value={address}
                  onChange={onAddressChange}
                />
              </Form.Field>
              <Form.Field>
                <label style={{ fontSize: '1.2rem' }}>Hospital Name</label>
                <Input
                  type="text"
                  placeholder="Hospital Name"
                  value={hosName}
                  onChange={onHosNameChange}
                />
              </Form.Field>
              <Form.Field>
                <label style={{ fontSize: '1.2rem' }}>Visit Reason</label>
                <Input
                  type="text"
                  placeholder="visit reason"
                  value={reason}
                  onChange={onReasonChange}
                />
              </Form.Field>
              <Form.Field>
                <label style={{ fontSize: '1.2rem' }}>Admitted On</label>
                <Input
                  type="date"
                  //   placeholder="Admitted On"
                  value={admOn}
                  onChange={onAdmOnChange}
                />
              </Form.Field>
              <Form.Field>
                <label style={{ fontSize: '1.2rem' }}>Discharged On</label>
                <Input
                  type="date"
                  //   placeholder="Mobile/Telephone"
                  value={disOn}
                  onChange={onDisOnChange}
                />
              </Form.Field>
              <Form.Field>
                <label style={{ fontSize: '1.2rem' }}>Medical File</label>
                <Input
                  type="file"
                  inputProps={{
                    accept:
                      'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                  }}
                  icon="file"
                  onChange={captureFile}
                />
              </Form.Field>
              {/* <Message error header="Oops!" content={errorMessage} /> */}
              <Button
                type="submit"
                color="teal"
                disabled={!address && !hosName && !admOn && !disOn && !reason}
                //   loading={isLoading}
              >
                Add Record
              </Button>
            </Form>
          </Card.Content>
        </Card>
      );
    }
    return null;
  };

  const getOtherPatientInfo = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      let res = await patient.methods
        .getPatientDetails(address)
        .call({ from: accounts[0] });
      console.log(res);
      setName(res['_name']);
      setPhone(res['_phone']);
      setGender(res['_gender']);
      setDob(res['_dob']);
      setBloodGroup(res['_bloodgroup']);
      setAllergy(res['_allergies']);
      setLoading(false);
      setOrecord(false);
      setRview(false);
      setPview(true);
      setArecord(false);
      setOview(false);
      // arecord: false,
      // gview: false,
      // orecord: false,
      // rkview: false,
      // pview: true,

      console.log('Other Patient Info Set!!!');
    } catch (e) {
      setLoading(false);
      alert('error or no permission');
      console.log(e);
    }
  };

  const getOtherPatientRecords = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      setRview(false);
      setPview(false);
      setArecord(false);
      setOview(false);
      setLoading(true);
      let res = patient.methods
        .getPatientRecords(address)
        .call({ from: accounts[0] });
      setRlen(res['_hname'].length);

      console.log(rlen);
      let recs = [];
      for (let i = 1; i <= rlen; i++) {
        recs.push({
          hname: res['_hname'][i - 1],
          reason: res['_reason'][i - 1],
          admOn: res['_admittedOn'][i - 1],
          disOn: res['_dischargedOn'][i - 1],
          ipfs: res['ipfs'][i - 1],
        });
      }
      setRecords(recs);
      setLoading(false);
      setRview(true);
      console.log(records);
      console.log('Patient Records Set!!!');
    } catch (e) {
      setLoading(false);
      alert('Error or No Records Found');
      // console.log(e);
    }
  };

  const viewPatientInfo = () => {
    if (pview) {
      return (
        <Card>
          <Card.Header>
            <center>
              <h2>Patient Info</h2>
            </center>
          </Card.Header>
          <Card.Content>
            Name:{'\t\t' + name}
            <br></br>
            <br></br>
            Phone:{'\t\t' + phone}
            <br></br>
            <br></br>
            Dob:{'\t\t' + dob}
            <br></br>
            <br></br>
            Gender:{'\t\t' + gender}
            <br></br>
            <br></br>
            Blood Group:{'\t\t' + bloodGroup}
            <br></br>
            <br></br>
            Allergies:{'\t\t' + allergy}
            <br></br>
            <br></br>
          </Card.Content>
        </Card>
      );
    }
    return null;
  };

  const viewPatientRecords = () => {
    var rows = records;
    if (rview) {
      return (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Hospital Name</Table.HeaderCell>
              <Table.HeaderCell>Reason</Table.HeaderCell>
              <Table.HeaderCell>Admitted On</Table.HeaderCell>
              <Table.HeaderCell>Discharged On</Table.HeaderCell>
              <Table.HeaderCell>Report</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows.map((row, index) => {
              let decryptedtext = CryptoJS.AES.decrypt(
                decode(row['ipfs']).toString(),
                'medinet'
              ).toString(CryptoJS.enc.Utf8);

              const url = decryptedtext.substring(9, decryptedtext.length - 1);
              return (
                <Table.Row key={index}>
                  <Table.Cell>{row['hname']}</Table.Cell>
                  <Table.Cell>{row['reason']}</Table.Cell>
                  <Table.Cell>{row['admOn']}</Table.Cell>
                  <Table.Cell>{row['disOn']}</Table.Cell>
                  <Table.Cell>
                    <a
                      href={'https://' + url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View/Download Record
                    </a>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      );
    }
    return null;
  };

  const Oview = () => {
    if (oview) {
      return (
        <Card>
          <Card.Header>
            <center>
              <h2>Other Patient Info</h2>
            </center>
          </Card.Header>
          <Card.Content>
            <Form
              onSubmit={async () => {
                getOtherPatientInfo();
                getOtherPatientRecords();
                setPview(true);
                setRview(true);
              }}
            >
              <Form.Field>
                <label style={{ fontSize: '1.2rem' }}>Address</label>
                <Input
                  value={address}
                  type="text"
                  onChange={onAddressChange}
                  placeholder="0X...."
                />
              </Form.Field>
              {/* <Message error header="Oops!" content={errorMessage} /> */}
              <Button type="submit" color="teal" disabled={!address}>
                Submit!
              </Button>
            </Form>
          </Card.Content>
        </Card>
      );
    }
    return null;
  };
  return (
    <>
      <Layout>
        <Grid>
          <Grid.Row>
            <Grid centered columns={3}>
              <Grid.Column>
                <Card fluid>
                  <Card.Content>Current Account:{'\t' + account}</Card.Content>
                </Card>
              </Grid.Column>
            </Grid>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}>
              <Button
                content="Doctor Info"
                icon="address card outline"
                color="purple"
                labelPosition="left"
                onClick={async () => {
                  getDoctor();
                  setPview(false);
                  setRview(false);
                  setOview(false);
                  setArecord(false);
                  setOrecord(false);
                }}
              ></Button>
            </Grid.Column>
            <Grid.Column width={4}>
              <Button
                content="Add Patient Record"
                icon="plus"
                color="olive"
                labelPosition="left"
                onClick={async () => {
                  setPview(false);
                  setRview(false);
                  setOview(false);
                  setLoading(false);
                  setArecord(false);
                  setOrecord(true);
                  setViewDoc(false);
                }}
              ></Button>
            </Grid.Column>
            {/* <Grid.Column width={4}>
              <Button
                content="View Patient Info"
                icon="file alternate"
                color="blue"
                labelPosition="left"
                onClick={async () => {
                  setPview(false);
                  setRview(false);
                  setOview(true);
                  setLoading(false);
                  setArecord(false);
                  setOrecord(false);
                  setViewDoc(false);
                }}
              ></Button>
            </Grid.Column> */}
            <Grid.Column width={4}>
              <Button
                content="View Patient Info"
                icon="file alternate"
                color="instagram"
                labelPosition="left"
                onClick={async () => {
                  setPview(false);
                  setRview(false);
                  setOview(true);
                  setLoading(false);
                  setArecord(false);
                  setOrecord(false);
                  setViewDoc(false);
                }}
              ></Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid centered columns={3}>
              <Grid.Column>
                {isLoading()}
                {Oview()}
                {viewDoctorView()}
                {addOtherRecord()}
                {viewPatientInfo()}
                {viewPatientRecords()}
              </Grid.Column>
            </Grid>
          </Grid.Row>
        </Grid>
      </Layout>
    </>
  );
};

// export async function getStaticProps(context) {
//   const accounts = await web3.eth.getAccounts();

//   return {
//     props: { account: accounts[0] },
//   };
// }

export default Doctor;
