import axios from "axios";

export const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTdkN2JjOTAxOWM1MjQzZGEyYWFjZmVmZTdmOWE3NiIsInN1YiI6IjVmNzRhMDk3YmM4YWJjMDAzODZkYjliZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BUDf5J3CHadMvsyct7dsdrjSEi0CufsUnJQlX6Xmrys';

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