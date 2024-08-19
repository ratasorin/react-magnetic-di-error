import { User } from "@utils/user";

export const cleanUp = () => {
    User.logout();
    console.log("CLEANING UP COOKIES...");
}

export const getStatus = () => {
    console.log("FETCHING STATUS...");
}