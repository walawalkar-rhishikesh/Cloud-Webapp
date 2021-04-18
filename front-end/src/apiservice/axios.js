import axios from "axios";
console.log("Axios initiated to:",window.location.hostname);
export const apiClient = axios.create({
    baseURL: `https://${window.location.hostname}:8080/api`,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8"
    }
});
