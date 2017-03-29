import { gql } from 'react-apollo';

export default gql`
  query nonstop($airline: String, $sourceAirport: String, $destinationAirport: String){
    allRoutes(condition: {
      airline: $airline, 
      sourceAirport: $sourceAirport, 
      destinationAirport: $destinationAirport
      }) {
      nodes {
        nodeId
        airline: airlineByAirlineId {
          name
        },
        sourceAirport: airportBySourceAirportId {
          iata
          name
          latitude
          longitude
        },
        destinationAirport: airportByDestinationAirportId {
          iata
          name
          latitude
          longitude
        }
      }
    }
  }
`;
