import styled from 'styled-components';
import Image from 'next/image';

const LaunchCard = ({ launch }) => (
  <Card>
    <div key={launch.launch_date_unix}>
      <div className="image-wrapper">
        <Image
          src={launch.links.mission_patch}
          alt={`${launch.mission_name} icon`}
          width={200}
          height={200}
          quality={60}
        />
      </div>
      <div className="card-title">
        {launch.mission_name} #{launch.flight_number}
      </div>
      {launch.mission_id.length > 0 && (
        <div className="mission-id">
          <span style={{ fontWeight: 'bold' }}>Mission IDs:</span>{' '}
          <ul>
            {launch.mission_id.map(id => (
              <li key={id}>{id}</li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <span style={{ fontWeight: 'bold' }}>Launch year:</span>
        {launch.launch_year}
      </div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Succesfull Launch:</span>
        {`${launch.launch_success}`}
      </div>
    </div>
  </Card>
);

const Card = styled.div`
  margin: auto;
  width: 100%;
  height: 100%;
  padding: 15px;
  background-color: white;
  text-align: left;
  line-height: 1.5;
  font-size: 12px;
  border-radius: 5px;
  .card-title {
    font-size: 16px;
    font-weight: 600;
    color: indigo;
  }
  .image-wrapper {
    background-color: lightgrey;
    img {
      max-width: 100%;
      height: auto;
    }
  }
  .mission-id {
    ul {
      margin: 0;
    }
  }
`;

export default LaunchCard;
