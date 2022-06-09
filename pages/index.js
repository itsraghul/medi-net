import Head from 'next/head';
// import Image from 'next/image';
import { Card, Grid, Image } from 'semantic-ui-react';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>MediNet</title>
        <meta
          name="description"
          content="Platform for patient record and medical network"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <br></br>
        <br></br>
        <Grid>
          <Grid.Row>
            <Grid.Column width={6} floated="right">
              <Link href="/medical-records">
                <a>
                  <Card>
                    <Image
                      src="/Patient Records.png"
                      // width={72}
                      // height={16}
                      alt="Patient"
                    ></Image>
                  </Card>
                </a>
              </Link>
            </Grid.Column>
            <Grid.Column width={6} floated="right">
              <Link href="/network">
                <a>
                  <Card>
                    <Image src="/Doctors Network.png" alt="Doctor"></Image>
                  </Card>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  );
}
