import Cookies from 'js-cookie';
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const jwt_token = Cookies.get('app_token');

 const apolloClient = new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: '/api/graphql', // Server URL (must be absolute)
      headers: {
        'token': jwt_token, // Replace with your actual API key
    }
    }),
    cache: new InMemoryCache(),
 });

export default apolloClient;