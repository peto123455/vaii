import { Document } from "mongodb";

export enum Ranks {
    USER = 0,
    INSTRUCTOR = 1,
    ADMINISTRATOR = 2,
    SUPERADMIN = 3
}

const ranks: Array<string> = [
    "Užívateľ",
    "Inštruktor",
    "Administrátor",
    "Super Administrátor"
]

export function GetRankByLevel(level: number) : string {
    if (level == undefined || level < 0 || level >= ranks.length) return "";

    return ranks[level];
}

export function HasUserPermissions(euser: Express.User, requiredPerm: number) : Boolean {

    const user = euser as Document;

    return user.permLevel >= requiredPerm;
}