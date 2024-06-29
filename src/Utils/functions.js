import { userColors } from "./constants";

export const parseData = (string) => {
    try {
        return JSON.parse(string);
    } catch (error) {
        return null;
    }
}

export const isLoggedIn = () => {
    const loggedIn = parseData(localStorage.getItem("isLoggedIn")) || false;
    return loggedIn;
}

export const getUserData = () => {
    const userData = parseData(localStorage.getItem("userData"))
    return userData;
}

export function getRandomColor() {
    return userColors[Math.floor(Math.random() * userColors.length)];
}

export const logOut = () => {
    localStorage.clear();
    window.location.reload();
}