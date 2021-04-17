import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

export const redirect = (location = '/') => {
    history.push(location);
}