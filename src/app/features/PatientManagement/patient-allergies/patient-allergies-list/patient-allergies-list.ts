import { Component, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PatientAllergiesService } from '../../../services/patient-allergies.service';
import { PatientAllergens } from '../../../models/patientAllergens';
import { ButtonDirective, ButtonModule } from "primeng/button";
import { DialogModule } from 'primeng/dialog';
import { PatientAllergyCreateComponent } from "../patient-allergies-create/patient-allergies-create";



@Component({
  selector: 'app-patient-allergies-list',
  imports: [TableModule, ButtonModule, DialogModule, PatientAllergyCreateComponent],
  templateUrl: './patient-allergies-list.html',
  styleUrl: './patient-allergies-list.css',
})
export class PatientAllergiesList implements OnInit {
  private patientAllergenService = inject(PatientAllergiesService);

  isloading = signal<boolean>(false);

  createDialogVisible=false;

  isEditMode=signal<boolean>(false);
  selectedAllergenData:PatientAllergens | null= null;

  patientAllergens = signal<PatientAllergens[]>([]);

  ngOnInit(): void {
    this.fetchAllergen();
  }
  fetchAllergen() {
    this.isloading.set(true);
    this.patientAllergenService.getAll().subscribe({
      next: (data) => {
        this.patientAllergens.set(data);
        this.isloading.set(false);
      }
      , error: (error) => {
        this.isloading.set(false);
        console.log("Failed to Fetch Allergens", error);
      }
    })

  }
  openCreateDialog(){
    this.isEditMode.set(true);
    this.selectedAllergenData=null;
    this.createDialogVisible=true;
  }
  onAllergyCreated(){
    this.createDialogVisible=false;
    this.resetDialogState();
    this.fetchAllergen();
  }

  editAllergen(id:number):void{
    if(id==null) return;
     this.patientAllergenService.getById(id).subscribe({
      next:(allergenData)=>{
        this.selectedAllergenData=allergenData;
        this.isEditMode.set(true);
        this.createDialogVisible=true;
      },error:(err)=>
        console.error("Error Loading Allergen",err)
      
    }) 

  }
  resetDialogState(){
    this.isEditMode.set(false);
    this.selectedAllergenData=null;
  }

  deleteAllergen(allergen:PatientAllergens):void{
    if(allergen.id==null){
      return;
    }
    this.patientAllergenService.delete(allergen.id).subscribe({
      next:()=>{
        console.log("Allergen deleted!!!");
        this.fetchAllergen();
      }
    });
  }



}
