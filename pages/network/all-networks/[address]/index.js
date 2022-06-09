import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Grid, Button, Icon, Label, Message } from 'semantic-ui-react';
import Link from 'next/link';
import Network from '../../../../ethereum/network';
import web3 from '../../../../ethereum/web3';
import Layout from '../../../../components/Layout';
import ChangeLimitForm from '../../../../components/ChangeLimitForm';

const NetworkDetails = (props) => {
  const router = useRouter();
  const address = router.query.address;
  const [loading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const renderCards = () => {
    const {
      networkSpecialisation,
      numPatientReportCount,
      doctorsCount,
      network_head,
      networkLimit,
    } = props;
    const items = [
      {
        header: address,
        meta: 'Address of Contract',
        description: 'The Address of the network smart contract.',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: network_head,
        meta: 'Address of Network Head',
        description: 'The manager who created the network.',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: networkSpecialisation,
        meta: 'Network Specialisation',
        description: 'The specialisation of this network.',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: networkLimit,
        meta: 'Network Limit',
        description: 'The no of doctors who can be in this network.',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: doctorsCount,
        meta: 'Number of Doctors in Network',
        description: 'The no of doctors in the network.',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: numPatientReportCount,
        meta: 'Patient Report Count',
        description: 'The no of reports discussion published.',
        style: { overflowWrap: 'break-word' },
      },
    ];

    return <Card.Group items={items} />;
  };

  const registerToNetworkHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    const network = Network(address);
    try {
      const accounts = await web3.eth.getAccounts();
      await network.methods.registerToNetwork().send({
        from: accounts[0],
      });
      router.replace(`/network/all-networks/${address}`);
    } catch (err) {
      setErrorMessage(err.message);
    }
    setIsLoading(false);
  };
  return (
    <>
      <Layout>
        <h1>Network Details</h1>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <Grid.Row>
                <ChangeLimitForm address={address} />
              </Grid.Row>
              <br />
              <Grid.Row>
                <Button
                  as="div"
                  labelPosition="right"
                  type="submit"
                  color="teal"
                  onClick={registerToNetworkHandler}
                >
                  <Button color="teal" loading={loading}>
                    {!loading && <Icon name="check" />}
                  </Button>
                  <Label as="a" basic color="teal" pointing="left">
                    Register To Network
                  </Label>
                </Button>
                {!!errorMessage && (
                  <Message error header="Oops!" content={errorMessage} />
                )}
              </Grid.Row>
              <br />
              <Grid.Row>
                <Link
                  href="/network/all-networks/[address]/reports"
                  as={`/network/all-networks/${address}/reports`}
                >
                  <a>
                    <Button
                      floated="left"
                      icon
                      labelPosition="left"
                      color="teal"
                      size="large"
                    >
                      <Icon name="file alternate" />
                      Patient Reports
                    </Button>
                  </a>
                </Link>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            {/* <Grid.Column>
              <Button
                as="div"
                labelPosition="right"
                type="submit"
                color="teal"
                loading={false}
                onClick={() => {}}
              >
                <Button basic color="teal">
                  <Icon name="fork" />
                </Button>
                <Label as="a" basic color="teal" pointing="left">
                  Register To Network
                </Label>
              </Button>
            </Grid.Column> */}
          </Grid.Row>
        </Grid>
      </Layout>
    </>
  );
};

// export async function getStaticPaths(context) {
//   const address = context.params.address;
//   return {
//     paths: [{ params: { address } }],
//     fallback: false, // false or 'blocking'
//   };
// }

export async function getServerSideProps(context) {
  const address = context.params.address;
  const network = Network(address);

  const summary = await network.methods.getNetworkSummary().call();
  return {
    props: {
      networkSpecialisation: summary['0'],
      numPatientReportCount: summary['1'],
      doctorsCount: summary['2'],
      network_head: summary['3'],
      networkLimit: summary['4'],
    },
  };
}

export default NetworkDetails;
