import {ApolloClient, InMemoryCache} from "@apollo/client";
import {authHeader} from "../utils/authHeader";
import config from "../config";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    headers: authHeader(),
    uri: config.APOLLO_CLIENT
});

export default client;