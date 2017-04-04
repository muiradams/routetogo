import { gql } from 'react-apollo';

export default gql`
  query {
    airports: allAirports {
      nodes {
        iata
        name
      }
    }
  }
`;
