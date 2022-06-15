import React from 'react';
import { Card, Button, Icon, Grid, Image } from 'semantic-ui-react';
import Link from 'next/link';

import factory from '../../ethereum/factory';
import Layout from '../../components/Layout';

const Network = (props) => {
  const renderNetworks = () => {
    const items = props.networks.map((address) => {
      return {
        header: address,
        description: (
          <Link
            href="/network/all-networks/[address]"
            as={`/network/all-networks/${address}`}
          >
            <a>View Network</a>
          </Link>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  };

  return (
    <>
      <Layout>
        <Image
          fluid
          centered
          src="/Banner 1.png"
          rounded
          size="big"
          alt="Banner"
        ></Image>
        <h3>Open Medical Networks</h3>
        <Grid>
          <Grid.Column width={13}>{renderNetworks()}</Grid.Column>
          <Grid.Column width={3}>
            <Link href="/network/new">
              <a>
                <Button floated="left" icon labelPosition="left" color="teal">
                  <Icon name="plus" />
                  Create Network
                </Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context) {
  const networks = await factory.methods.getDeployedNetworks().call();

  return {
    props: { networks },
  };
}

export default Network;
