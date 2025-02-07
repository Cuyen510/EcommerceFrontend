import { Role } from "../../models/role";

export interface LoginResponse {
    message: string;

    token: string;

    tokenType: string;

    id: number;
    username: string;

    roles: Role[];
}