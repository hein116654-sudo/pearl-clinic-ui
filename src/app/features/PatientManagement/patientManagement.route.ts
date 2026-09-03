import { Routes } from "@angular/router";
import { PatientList } from "./patient/patient-list/patient-list";
import { PatientAllergiesList } from "./patient-allergies/patient-allergies-list/patient-allergies-list";
import { PatientCreate } from "./patient/patient-create/patient-create";

export default[
    {
        path:'patient-list',component:PatientList
    },
    {
        path:'patient-create',component:PatientCreate
    },{
        path:'patient-edit/:id',component:PatientCreate
    },{
        path:'patient-allergies-list',component:PatientAllergiesList
    },
    {
        path:'patient-allergies/:id',component:PatientAllergiesList
    }

]as Routes;