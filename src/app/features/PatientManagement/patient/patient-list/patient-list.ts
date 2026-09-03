import { Component, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Patient } from '../../../models/patient';
import { PatientService } from '../../../services/patient.service';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-patient-list',
  imports: [TableModule, ButtonModule,InputTextModule],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.css',
})
export class PatientList implements OnInit{

  private patientSevice = inject(PatientService);
     private  router =inject(Router);

  isLoading = signal<Boolean>(false);

  patients=signal<Patient[]>([]);

  isEditMode = signal<Boolean>(false);

  ngOnInit(): void {
  
    this.fetchPatientList();    
  }
  fetchPatientList(){
    this.isLoading.set(true);
    this.patientSevice.getAll().subscribe({
      next: (data)=>{
        this.patients.set(data);
        this.isLoading.set(false);
      }, error: (error) => {
        this.isLoading.set(false);
        console.log('Failed to fetch specializations:', error);
      }
    })
     
    };

  
    toGoCreate(){
      
     this.router.navigate(['/patientManagement/patient-create']);
      
    }

    toGoEdit(id:number){
      this.router.navigate(['/patientManagement/patient-edit',id]);
    }

    toGoAllergies(id:number){
      this.router.navigate(['/patientManagement/patient-allergies',id]);
    }

    deletePatient(id:number){
      this.patientSevice.delete(id).subscribe({
        next:()=>{
          this.fetchPatientList();
        }, error:(error)=>{
          console.log('Failed to delete patient:', error);
        }
      })
    }
}

  

  

  


