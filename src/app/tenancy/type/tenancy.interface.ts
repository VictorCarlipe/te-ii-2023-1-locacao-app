import { LocationInterface } from "src/app/location/type/location.interface";
import { StudentInterface } from "src/app/student/type/student.interface";

export interface TenancyInterface{
    id?: number,
    render:StudentInterface,
    location: LocationInterface,
    initialDate: string,
    finalDate: string,
    goal: string,
    description?: string
}