import React, { useState } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import patient from '../../../ethereum/patient';
import web3 from '../../../ethereum/web3';
import Layout from '../../../components/Layout';

const SignUp = (props) => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [gender, setGender] = useState('');
  const [allergy, setAllergy] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [account, setAccount] = useState(props.account);
  // const [account, setAccount] = useState('');

  const onNameChange = (event) => {
    setName(event.target.value);
    console.log(name);
  };
  const onPhoneChange = (event) => {
    setPhone(event.target.value.toString());
    console.log(phone);
  };
  const onGenderChange = (event) => {
    setGender(event.target.value);
    console.log(gender);
  };
  const onDobChange = (event) => {
    setDob(event.target.value.toString());
    console.log(dob);
  };
  const onBloodGroupChange = (event) => {
    setBloodGroup(event.target.value);
    console.log(bloodGroup);
  };
  const onAllergyChange = (event) => {
    setAllergy(event.target.value);
    console.log(allergy);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const accounts = await web3.eth.getAccounts();
      let result = await patient.methods
        .addPatient(name, phone, gender, dob, bloodGroup, allergy)
        .send({ from: accounts[0] });
      console.log(result);
      alert('Account Created!');
      setName('');
      setPhone('');
      setGender('');
      setDob('');
      setBloodGroup('');
      setAllergy('');
      router.back();
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
  };
  return (
    <>
      <Layout>
        <Link href="/medical-records/">
          <a style={{ fontSize: '1.05rem', fontWeight: 'bold' }}>
            {' '}
            {`< Back `}
          </a>
        </Link>
        <h2>Sign Up</h2>
        <Form onSubmit={onSubmitHandler} error={!!errorMessage}>
          <Form.Field>
            <label style={{ fontSize: '1.2rem' }}>Name</label>
            <Input
              type="text"
              placeholder="Your Name."
              value={name}
              onChange={onNameChange}
            />
          </Form.Field>
          <Form.Field>
            <label style={{ fontSize: '1.2rem' }}>Gender</label>
            <Input
              type="text"
              placeholder="Your gender."
              value={gender}
              onChange={onGenderChange}
            />
          </Form.Field>
          <Form.Field>
            <label style={{ fontSize: '1.2rem' }}>Phone Number</label>
            <Input
              type="number"
              placeholder="Phone Number"
              value={phone}
              onChange={onPhoneChange}
            />
          </Form.Field>
          <Form.Field>
            <label style={{ fontSize: '1.2rem' }}>Date of Birth</label>
            <Input
              type="date"
              placeholder="Your date of birth."
              value={dob}
              onChange={onDobChange}
            />
          </Form.Field>
          <Form.Field>
            <label style={{ fontSize: '1.2rem' }}>Blood Group</label>
            <Input
              type="text"
              placeholder="Your blood group."
              value={bloodGroup}
              onChange={onBloodGroupChange}
            />
          </Form.Field>
          <Form.Field>
            <label style={{ fontSize: '1.2rem' }}>Allergy</label>
            <Input
              type="text"
              placeholder="Your allergies."
              value={allergy}
              onChange={onAllergyChange}
            />
          </Form.Field>
          <Form.Field>
            <label style={{ fontSize: '1.2rem' }}>Address</label>
            <Input
              type="text"
              placeholder={account}
              value={account}
              onChange={(event) => setAccount(event.target.value)}
            />
          </Form.Field>
          <Message error header="Oops!" content={errorMessage} />
          <Button
            type="submit"
            color="instagram"
            disabled={!name && !phone}
            loading={loading}
          >
            SignUp!
          </Button>
        </Form>
        <br></br>
        <br></br>
        <br></br>
      </Layout>
    </>
  );
};

SignUp.getInitialProps = async (ctx) => {
  const accounts = await web3.eth.getAccounts();
  const acc = accounts[0];
  return { props: { account: acc } };
};
// export async function getServerSideProps(context) {

//   // const account = accounts[0] ? JSON.stringify(accounts[0]) : null;
//   const addr =

//   return {

//   };
// }

export default SignUp;
