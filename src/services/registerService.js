import http from "./httpService";
const url = "/users";

export function register ({name, username: email, password}) {

    return http.post(url, {name, email, password});
}