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
        airline
        sourceAirport
        destinationAirport
        airlineByAirlineId {
          name
        },
        airportBySourceAirportId {
          iata
          name
        },
        airportByDestinationAirportId {
          iata
          name
        }
      }
    }
  }
`;
