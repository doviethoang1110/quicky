import CookieService from "./cookieService";

export const authHeader = () => {
    const headers = {};
    const token = CookieService.get("access_token");
    const lang = CookieService.get("i18next") || 'en';
    if (lang) headers['accept-language'] = lang;
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
}