import { Allergen } from "./allergen.enum";
import { Patient } from "./patient";

export interface PatientAllergens{
    id?:number,
    patientName:string,
    allergenName:string,
    status:Allergen,
    drugFamily:string,
    reaction:string
    recordedAt:string
}

export interface CreatePatientAllergens{
     patientId:number,
    allergenName:string,
    status:Allergen,
    drugFamily:string,
    reaction:string

}