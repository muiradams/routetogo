import { gql } from 'react-apollo';

export default gql`
  query onestop($airline: String!, $sourceAirport: String!){
    allRoutes(condition: {
      airline: $airline, 
      sourceAirport: $sourceAirport, 
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
          finalAirports: routesBySourceAirportId (condition: {
            airline: $airline, 
            }) {
            nodes {
              airport: airportByDestinationAirportId {
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
