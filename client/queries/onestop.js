import { gql } from 'react-apollo';

export default gql`
  query oneway($airline: String, $sourceAirport: String, $destinationAirport: String){
    allRoutes(condition: {
      airline: $airline, 
      sourceAirport: $sourceAirport, 
      destinationAirport: $destinationAirport
      }) {
      nodes {
        nodeId
        airlineByAirlineId {
          name
        },
        airportBySourceAirportId {
          iata
          name
          latitude
          longitude
        },
        airportByDestinationAirportId {
          iata
          name
          latitude
          longitude
        }
      }
    }
  }
`;
