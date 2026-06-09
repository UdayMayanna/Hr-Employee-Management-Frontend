import { department } from "./departments";

export interface Hr{
    fname : string;
    email : string;
    password : string;
    phone : string;
    gender : string;
    hrId : number;
    department : department;
}