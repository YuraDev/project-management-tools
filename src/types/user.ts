export type Role =  "member" | "manager" | "admin";

export interface User {
    id: string,
    name: string,
    role: Role,
    username: string,
    password: string,
    reservedMembers: string[],
}