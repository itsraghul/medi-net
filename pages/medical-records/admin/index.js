import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Message,
  Placeholder,
  Grid,
  Form,
  Input,
  Modal,
} from 'semantic-ui-react';

import web3 from '../../../ethereum/web3';
import patient from '../../../ethereum/patient';
import Layout from '../../../components/Layout';

const Admin = (props) => {
  const [account, setAccount] = useState('loading');
  const [addAddress, setAddAddress] = useState('');
  const [remAddress, setRemAddress] = useState('');
  const [changeManager, setChangeManager] = useState('');
  const [docAccAddr, setDocAccAddr] = useState('');
  const [docName, setDocName] = useState('');
  const [docContact, setDocContact] = useState('');
  const [docAddress, setDocAddress] = useState('');
  const [docSpec, setDocSpec] = useState('');
  const [docVerified, setDocVerified] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addView, setAddView] = useState(false);
  const [viewDoc, setViewDoc] = useState(false);
  const [dopen, setDopen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const setDisplayAcc = async () => {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  };

  useEffect(() => {
    setDisplayAcc();
  }, []);

  const onAddAddrChange = (event) => {
    setAddAddress(event.target.value);
    console.log(addAddress);
  };

  const onDocAccAddrChange = (event) => {
    setDocAccAddr(event.target.value);
    console.log(docAccAddr);
  };
  const onDocNameChange = (event) => {
    setDocName(event.target.value);
    console.log(docName);
  };
  const onDocSpecChange = (event) => {
    setDocSpec(event.target.value);
    console.log(docSpec);
  };
  const onDocContactChange = (event) => {
    setDocContact(event.target.value);
    console.log(docContact);
  };
  const onDocAddressChange = (event) => {
    setDocAddress(event.target.value);
    console.log(docAddress);
  };

  const onRemAddrChange = (event) => {
    console.log(patient);
    setRemAddress(event.target.value);
    console.log(remAddress);
  };

  const onOwnManagerChange = (event) => {
    setChangeManager(event.target.value);
    console.log(changeManager);
  };

  const onAddSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await patient.methods
        .addAdmin(addAddress)
        .send({ from: accounts[0] })
        .then((res) => {
          let result = res;
          console.log(result);
          setLoading(false);
          alert('Successfully Added Admin');
        });
    } catch (e) {
      setLoading(false);
      setErrorMessage(e);
      alert('error');
    }
    setLoading(false);
    setErrorMessage('');
  };

  const onRemSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await patient.methods
        .removeAdmin(remAddress)
        .send({ from: accounts[0] })
        .then((res) => {
          let result = res;
          console.log(result);
          setLoading(false);
          alert('Successfully Removed Admin');
        });
    } catch (e) {
      setLoading(false);
      setErrorMessage(e);
      alert('error');
    }
    setLoading(false);
    setErrorMessage('');
  };

  const onChangeManagerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await patient.methods
        .setManager(changeManager)
        .send({ from: accounts[0] })
        .then((res) => {
          let result = res;
          console.log(result);
          setLoading(false);
          alert('Successfully Changed Owner');
        });
    } catch (e) {
      setLoading(false);
      setErrorMessage(e);
      alert('error');
    }
    setLoading(false);
    setErrorMessage('');
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

  const addDoctor = async () => {
    setAddView(false);
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await patient.methods
        .addDoctor(docName, docContact, docSpec, docAddress, docAccAddr)
        .send({ from: accounts[0] })
        .then((res) => {
          let result = res;
          console.log(result);
          setLoading(false);
          setAddView(true);
          alert('Successfully Added Doctor');
        });
    } catch (e) {
      setLoading(false);
      alert('error');
    }
    setDocName('');
    setDocContact('');
    setDocAddress('');
    setDocSpec('');
    setDocAccAddr('');
  };

  const getDoctor = async () => {
    setAddView(false);
    setViewDoc(false);
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await patient.methods
        .getDoctorByAddress(docAccAddr)
        .call({ from: accounts[0] })
        .then((res) => {
          let result = res;
          console.log(result);
          setLoading(false);
          setAddView(false);
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
      alert('error');
    }
  };

  const addDoctorView = () => {
    if (addView) {
      return (
        <>
          <Card>
            <Card.Header>
              <center>
                <h1>Add Doctor</h1>
              </center>
            </Card.Header>
            <Card.Content>
              <Form onSubmit={addDoctor} error={!!errorMessage}>
                <Form.Field>
                  <label style={{ fontSize: '1.2rem' }}>Address</label>
                  <Input
                    type="text"
                    placeholder="Doc Address"
                    value={docAccAddr}
                    onChange={onDocAccAddrChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label style={{ fontSize: '1.2rem' }}>Name</label>
                  <Input
                    type="text"
                    placeholder="Doc Name"
                    value={docName}
                    onChange={onDocNameChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label style={{ fontSize: '1.2rem' }}>Clinic Address</label>
                  <Input
                    type="text"
                    placeholder="Doc Work Address"
                    value={docAddress}
                    onChange={onDocAddressChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label style={{ fontSize: '1.2rem' }}>Contact</label>
                  <Input
                    type="text"
                    placeholder="Mobile/Telephone"
                    value={docContact}
                    onChange={onDocContactChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label style={{ fontSize: '1.2rem' }}>Specialisation</label>
                  <Input
                    type="text"
                    placeholder="Doc expertise field"
                    value={docSpec}
                    onChange={onDocSpecChange}
                  />
                </Form.Field>
                <Message error header="Oops!" content={errorMessage} />
                <Button
                  type="submit"
                  color="teal"
                  disabled={
                    !docAccAddr &&
                    !docName &&
                    !docAddress &&
                    !docContact &&
                    !docSpec
                  }
                  //   loading={isLoading}
                >
                  Add
                </Button>
              </Form>
            </Card.Content>
          </Card>
          <br></br>
          <br></br>
        </>
      );
    }
    return null;
  };

  const viewDoctorView = () => {
    if (viewDoc) {
      return (
        <>
          <Card>
            <Card.Content>
              <Modal
                onClose={() => setDopen(false)}
                onOpen={() => setDopen(true)}
                open={dopen}
                // trigger={<Button>Show Data</Button>}
              >
                <Modal.Header>Doctor Data</Modal.Header>
                <Modal.Content>
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
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    content="Close"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => setDopen(false)}
                    positive
                  />
                </Modal.Actions>
              </Modal>
              <Card>
                <Card.Header>
                  {' '}
                  <center>
                    {' '}
                    <h2>View Doctor Data</h2>
                  </center>
                </Card.Header>
                <Card.Content>
                  <Form onSubmit={getDoctor}>
                    <Form.Field>
                      <label style={{ fontSize: '1.2rem' }}>Address</label>
                      <Input
                        type="text"
                        placeholder="Doc Address"
                        value={docAccAddr}
                        onChange={onDocAccAddrChange}
                      />
                    </Form.Field>
                    <Button color="teal">Search</Button>
                  </Form>
                </Card.Content>
              </Card>
            </Card.Content>
          </Card>
          <br></br>
          <br></br>
        </>
      );
    }
    return null;
  };

  const addOrRemoveAdmin = (account) => {
    return (
      <>
        <Grid>
          <Grid.Row>
            <Grid.Column width={5}>
              <Button
                content="Add Doctor"
                icon="plus"
                color="green"
                labelPosition="left"
                onClick={async () => {
                  setViewDoc(false);
                  setLoading(false);
                  setAddView(true);
                }}
              ></Button>
            </Grid.Column>

            <Grid.Column width={5}>
              <Button
                content="View Doctor"
                icon="circle"
                labelPosition="left"
                color="blue"
                onClick={async () => {
                  setViewDoc(true);
                  setLoading(false);
                  setAddView(false);
                }}
              ></Button>
            </Grid.Column>
            <Grid.Column width={5}>
              <Button
                content="Hide Tab"
                icon="close"
                color="grey"
                labelPosition="left"
                onClick={async () => {
                  setViewDoc(false);
                  setLoading(false);
                  setAddView(false);
                }}
              ></Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={5}>
              <Card>
                <Card.Content>
                  <Form onSubmit={onAddSubmit} error={!!errorMessage}>
                    <Form.Field>
                      <label style={{ fontSize: '1.2rem' }}>Add Admin</label>
                      <Input
                        label="address"
                        labelPosition="right"
                        value={addAddress}
                        type="text"
                        onChange={onAddAddrChange}
                        placeholder="address to be added."
                      />
                    </Form.Field>
                    <Message error header="Oops!" content={errorMessage} />
                    <Button
                      type="submit"
                      color="teal"
                      // disabled={!addAddress}
                      // loading={isLoading}
                    >
                      Add!
                    </Button>
                  </Form>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column width={5}>
              <Card>
                <Card.Content>
                  <Form onSubmit={onRemSubmit} error={!!errorMessage}>
                    <Form.Field>
                      <label style={{ fontSize: '1.2rem' }}>Remove Admin</label>
                      <Input
                        label="address"
                        labelPosition="right"
                        value={remAddress}
                        type="text"
                        onChange={onRemAddrChange}
                        placeholder="address to be removed."
                      />
                    </Form.Field>
                    <Message error header="Oops!" content={errorMessage} />
                    <Button
                      type="submit"
                      color="teal"
                      // disabled={!remAddress}
                      // loading={isLoading}
                    >
                      Remove!
                    </Button>
                  </Form>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column width={5}>
              <Card>
                <Card.Content>
                  <Form onSubmit={onChangeManagerSubmit} error={!!errorMessage}>
                    <Form.Field>
                      <label style={{ fontSize: '1.2rem' }}>
                        Change Manager
                      </label>
                      <Input
                        label="address"
                        labelPosition="right"
                        value={changeManager}
                        type="text"
                        onChange={onOwnManagerChange}
                        placeholder="address to be changed."
                      />
                    </Form.Field>
                    <Message error header="Oops!" content={errorMessage} />
                    <Button
                      type="submit"
                      color="teal"
                      // disabled={!changeManager}
                      // loading={isLoading}
                    >
                      Remove!
                    </Button>
                  </Form>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
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
          <Grid.Row>{addOrRemoveAdmin()}</Grid.Row>
          <Grid.Row>
            <Grid centered columns={3}>
              <Grid.Column>
                {isLoading()}
                {addDoctorView()}
                {viewDoctorView()}
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

export default Admin;
