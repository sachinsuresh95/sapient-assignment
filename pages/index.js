import Head from 'next/head';
import styled from 'styled-components';
import api from '../api';
import Filters from '../components/Filters';
import LaunchCard from '../components/LaunchCard';

export default function Home({ launches }) {
  return (
    <Layout>
      <Head>
        <title>Space-X Launch Programs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h2 style={{ padding: '10px' }}>Space-X</h2>
        <AppContainer>
          <Filters />
          <CardContainer>
            {launches.map(launch => (
              <div key={launch.launch_date_unix} className="card-wrapper">
                <LaunchCard launch={launch} />
              </div>
            ))}
            {
              launches.length === 0 && <div className='no-result'>Oops! No results!</div>
            }
          </CardContainer>
        </AppContainer>
      </main>
      <footer>Developed by Sachin Suresh</footer>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { launch_year, launch_success, land_success } = context.query;
  const res = await api.getLaunchData(
    launch_year,
    launch_success,
    land_success
  );
  return { props: { launches: res } };
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  main {
    flex-grow: 1;
  }
`;
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 700px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const CardContainer = styled.div`
  text-align: center;
  flex-grow: 1;
  display: grid;
  grid-auto-rows: 1fr;
  grid-template-columns: 1fr;
  justify-content: center;
  align-content: center;
  grid-gap: 10px;
  .card-wrapper {
    max-width: 220px;
    max-height: 400px;
    margin: 0 auto;
  }
  .no-result {
    grid-column-start: 1;
    grid-column-end: 5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }
  @media (min-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 600px;
    .card-wrapper {
      margin: 0;
    }
  }
  @media (min-width: 1024px) {
    max-width: 900px;
    grid-template-columns: repeat(4, 1fr);
    .card-wrapper {
      margin: 0;
    }
  }
`;
