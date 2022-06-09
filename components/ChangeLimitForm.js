import React, { useState } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import Network from '../ethereum/network';
import web3 from '../ethereum/web3';

const ChangeLimitForm = (props) => {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    const network = Network(props.address);
    try {
      const accounts = await web3.eth.getAccounts();
      await network.methods.setNetworkLimit(value).send({
        from: accounts[0],
      });

      router.replace(`/network/all-networks/${props.address}`);
    } catch (err) {
      setErrorMessage(err.message);
    }
    setIsLoading(false);
    setValue('');
  };
  return (
    <>
      <Form onSubmit={onSubmitHandler} error={!!errorMessage}>
        <Form.Field>
          <label style={{ fontSize: '1.2rem' }}>
            Change Network Limit (Network Head only)
          </label>
          <Input
            label="num"
            labelPosition="right"
            value={value}
            type="number"
            onChange={(event) => setValue(event.target.value)}
            step="1"
            placeholder="Limit number should be higher than current limit."
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button
          type="submit"
          color="teal"
          disabled={!value}
          loading={isLoading}
        >
          Change!
        </Button>
      </Form>
    </>
  );
};

export default ChangeLimitForm;
