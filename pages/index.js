import Head from 'next/head';
import styled from 'styled-components';
import api from '../api';
import Filters from '../components/Filters';
import LaunchCard from '../components/LaunchCard';

export default function Home({ launches }) {
  return (
    <div>
      <Head>
        <title>Space-X</title>
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
          </CardContainer>
        </AppContainer>
      </main>
      <footer>Developed by Sachin Suresh</footer>
    </div>
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

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 700px) {
    flex-direction: row;
  }
`;

const CardContainer = styled.div`
  text-align: center;
  margin: auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  max-width: 900px;
  .card-wrapper {
    width: 100%;
    margin: 0 20px;
  }

  @media (min-width: 700px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    .card-wrapper {
      width: 40%;
    }
  }

  @media (min-width: 1024px) {
    .card-wrapper {
      width: 20%;
      margin: 0 10px;
    }
  }
`;
