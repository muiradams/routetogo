import { gql } from 'react-apollo';

export default gql`
  query onestop($airline: String, $sourceAirport: String, $destinationAirport: String){
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
        secondAirport: airportByDestinationAirportId {
          iata
          name
          latitude
          longitude
          nextAirport: routesBySourceAirportId (condition: {
            airline: $airline, 
            }) {
            nodes {
              finalAirport: airportByDestinationAirportId {
                iata
                name
                latitude
                longitude
              }
            }
          }
        }
      }
    }
  }
`;
