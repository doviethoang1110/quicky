import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {authHeader} from "../utils/authHeader";
import config from "../config";
import {setContext} from "@apollo/client/link/context";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: setContext(() => ({
        headers: authHeader()
    })).concat(createHttpLink({
        uri: config.APOLLO_CLIENT,
    }))
});

export default client;