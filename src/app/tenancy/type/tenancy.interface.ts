import { LocationInterface } from "src/app/location/type/location.interface";
import { StudentInterface } from "src/app/student/type/student.interface";

export interface TenancyInterface{
    id?: string,
    initialDate: string,
    finalDate: string,
    objective: string,
    description?: string
    local: LocationInterface,
    student:StudentInterface,
}