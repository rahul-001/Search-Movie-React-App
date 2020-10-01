import axios from "axios";

export const token = process.env.REACT_APP_API_TOKEN;

const ConvertHeadersForBackend = (headers) => {
    headers.Authorization = token;
    headers["Content-Type"] = "application/json";
    return headers;
};

export const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    transformRequest: [
        // eslint-disable-next-line no-unused-vars
        (data, headers) => {
            headers = ConvertHeadersForBackend(headers);
            return JSON.stringify(data);
        },
    ],
});