import http from "./httpService";
import jwtDecode from "jwt-decode";
const url = "/auth";
const tokenKey = "token";

http.setJWT(getJWT());//reverse control to avoid bi-directional dependency

export async function login ({username:email, password}) {
    const {data:jwt} = await http.post(url, {email, password});
    localStorage.setItem(tokenKey,jwt);
}
export function getJWT(){
    return localStorage.getItem(tokenKey);
}

export function loginWithJWT(jwt){
    localStorage.setItem(tokenKey,jwt);
}
export function logout () {
    localStorage.removeItem(tokenKey);
}
export function getCurrentUser(){
    try{
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);

    }catch(e){return null}
}

