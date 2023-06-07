import { accessToken } from "./constants";

export function getLocalAuthToken() {
    return localStorage.getItem(accessToken);
}

export function setLocalAuthToken(token: string) {
    localStorage.setItem(accessToken, token);
}

export function clearLocalAuthToken() {
    localStorage.removeItem(accessToken);
}