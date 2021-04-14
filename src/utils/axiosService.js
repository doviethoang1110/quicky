import axios from "axios";
import { authHeader } from "./authHeader";
import config  from "../config";

export default function axiosService(url, method, data) {
    return axios({
        url: `${config.API_URL}/${url}`,
        method,
        data,
        headers: authHeader()
    });
}