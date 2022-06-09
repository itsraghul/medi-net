import React from 'react';
import Link from 'next/link';
import { Grid, Card, Button } from 'semantic-ui-react';

const LoginCards = (props) => {
  return (
    <>
      <Grid>
        <Grid.Column width={5}>
          <Card>
            <Card.Content>
              <Card.Header>Admin </Card.Header>
              <Card.Meta>Owner/Medical Council</Card.Meta>
              <Card.Description>
                <ul>
                  <li>Can add Admins</li>
                  <li>Can remove Admins</li>
                  <li>Owner of the contract can tranfer his ownership</li>
                </ul>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Link href="/medical-records/admin">
                <a>
                  <Button basic color="teal">
                    Login
                  </Button>
                </a>
              </Link>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={6}>
          <Card>
            <Card.Content>
              <Card.Header>Doctor </Card.Header>
              <Card.Meta>Doctors approved by Medical Council</Card.Meta>
              <Card.Description>
                <ul>
                  <li>{`Can view patient's records with permission`}</li>
                  <li>{`Can add patient's records with permission`}</li>
                </ul>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Link href="/medical-records/doctor">
                <a>
                  <Button basic color="teal">
                    Login
                  </Button>
                </a>
              </Link>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={5}>
          <Card>
            <Card.Content>
              <Card.Header>Patient </Card.Header>
              <Card.Meta>Patient Accounts</Card.Meta>
              <Card.Description>
                <ul>
                  <li>Can Sign/Login up as patient</li>
                  <li>Can view/add own records</li>
                  <li>Can grant/revoke permissions to add/view records</li>
                </ul>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              {/* <div className="ui two buttons"> */}
              <Link href="/medical-records/patient">
                <a>
                  <Button basic color="teal">
                    Login
                  </Button>
                </a>
              </Link>
              <Link href="/medical-records/patient/signUp">
                <a>
                  <Button basic color="red">
                    Sign Up
                  </Button>
                </a>
              </Link>
              {/* </div> */}
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default LoginCards;
