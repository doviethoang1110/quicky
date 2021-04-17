import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import client from "./plugins/apollo";
import i18next from "./plugins/i18n";
import {I18nextProvider} from 'react-i18next';


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <I18nextProvider i18n={i18next}>
                        <App />
                    </I18nextProvider>
                </BrowserRouter>
            </ApolloProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
