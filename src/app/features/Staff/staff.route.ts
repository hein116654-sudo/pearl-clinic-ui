import { Routes } from "@angular/router";
import { PractitionerPage } from "./practitioner.page/practitioner.page";
import { SpecializationPage } from "./specialization.page/specialization.page";

export default [
   { path :'practitioners',component : PractitionerPage},
   { path:'specializations',component: SpecializationPage}

] as Routes;