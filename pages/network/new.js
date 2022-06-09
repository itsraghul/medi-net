import React, { useState } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import { useRouter } from 'next/router';

import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';
import Layout from '../../components/Layout';

const NewNetwork = () => {
  const router = useRouter();
  const [networkName, setNetworkName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createNewNetwork(networkName)
        .send({ from: accounts[0] });
      router.push('/network');
    } catch (err) {
      setErrorMessage(err.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Layout>
        <h2>Create new Medical Network</h2>
        <br />
        <Form onSubmit={onSubmitHandler} error={!!errorMessage}>
          <Form.Field>
            <h3>Network Name</h3>

            <Input
              label=""
              labelPosition="right"
              value={networkName}
              type="text"
              onChange={(event) => setNetworkName(event.target.value)}
              placeholder="Enter the name of the network.(with specialization)"
            />
          </Form.Field>
          <Message error header="Oops!" content={errorMessage} />
          <Button
            type="submit"
            color="teal"
            disabled={!networkName}
            loading={isLoading}
          >
            Create!
          </Button>
        </Form>
      </Layout>
    </>
  );
};

export default NewNetwork;
