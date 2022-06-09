import React from 'react';
import { useRouter } from 'next/router';
import { Button, Table } from 'semantic-ui-react';
import Link from 'next/link';
// import web3 from '../../../../../ethereum/web3';
import Network from '../../../../../ethereum/network';
import ReportRow from '../../../../../components/ReportRow';
import Layout from '../../../../../components/Layout';

const Reports = (props) => {
  const { Header, Row, HeaderCell, Body } = Table;

  const renderRow = () => {
    return props.reports.map((report, index) => {
      return (
        <ReportRow
          key={index}
          id={index}
          report={report}
          address={props.address}
          doctorsCount={props.doctorsCount}
        />
      );
    });
  };
  return (
    <>
      <Layout>
        <h2>Reports</h2>
        <Link
          href="/network/all-networks/[address]/reports/new"
          as={`/network/all-networks/${props.address}/reports/new`}
        >
          <a>
            <Button floated="right" style={{ marginBottom: 10 }} color="teal">
              Add Report
            </Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>File</HeaderCell>
              <HeaderCell>Requested Doctor</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{renderRow()}</Body>
        </Table>
        <h4>{`Found ${props.reportsCount} reports.`}</h4>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context) {
  const address = context.params.address;
  const network = Network(address);

  const reportsCount = await network.methods.getReportCount().call();
  const doctorsCount = await network.methods.doctorsCount().call();

  const allReports = await Promise.all(
    Array(parseInt(reportsCount))
      .fill()
      .map((element, index) => {
        return network.methods.patientReports(index).call();
      })
  );
  const reports = JSON.parse(JSON.stringify(allReports));
  return {
    props: {
      address,
      reports,
      reportsCount,
      doctorsCount,
    },
  };
}

export default Reports;
