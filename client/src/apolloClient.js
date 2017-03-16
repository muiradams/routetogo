import ApolloClient from 'apollo-client';

const client = new ApolloClient({
  dataIdFromObject: o => o.id,
});

export default client;
