import { gql } from 'react-apollo';

export default gql`
  query {
    airlines: allAirlines {
      nodes {
        iata
        name
      }
    }
  }
`;
