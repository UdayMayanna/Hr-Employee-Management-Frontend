import { department } from "./departments";

export interface employee{
    empid : number;
    fname : string;
    email : string;
    phone : string;
    gender : string;
    role : string;
    joiningDate : string;
    address : string;
    department : department;
}