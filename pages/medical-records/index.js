import React from 'react';
import { Image } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import LoginCards from '../../components/LoginCards';

const MedicalNetworkHome = () => {
  return (
    <>
      <Layout>
        <Image
          fluid
          centered
          src="/Banner.png"
          rounded
          size="big"
          alt="Banner"
        ></Image>
        <br />
        <LoginCards />
      </Layout>
    </>
  );
};

export default MedicalNetworkHome;
