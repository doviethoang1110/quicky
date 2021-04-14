import Cookie from "universal-cookie";

const cookie = new Cookie();

class CookieService {

    static get(key) {
        return cookie.get(key);
    }

    static set(key, value, maxAge) {
        cookie.set(key, value, {path: '/', maxAge});
    }

    static remove(key) {
        cookie.remove(key);
    }
}

export default CookieService;