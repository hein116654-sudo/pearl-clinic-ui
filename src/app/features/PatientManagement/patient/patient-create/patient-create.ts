import { Component, inject, OnChanges, OnInit, signal } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateUpdatePatientInput} from '../../../models/patient';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';


@Component({
  selector: 'app-patient-create',
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DatePickerModule,
    SelectModule,
    TextareaModule
  ],
  templateUrl: './patient-create.html',
  styleUrl: './patient-create.css',
})
export class PatientCreate implements OnInit {
  private patientService = inject(PatientService);
  private router = inject(Router);
  private route=inject(ActivatedRoute);
  isLoading=signal<boolean>(false);

  isEditMode=signal<boolean>(false);

  patient: CreateUpdatePatientInput = {
    name: '',
    medicalRecordNo: '',
    dateOfBirth: '',
    gender:'',
    phoneNo: '',
    email: '',
    address: '',
    emergencyContactName: '',
    emergencyContactPhone: ''
  };

  genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' }
  ];

  ngOnInit(): void {
    const idParam=this.route.snapshot.paramMap.get('id');
    if(idParam){
      const id=Number(idParam);
      this.isEditMode.set(true);
      this.fetchPatientData(id);
    }
  }

  fetchPatientData(id:number){
    this.isLoading.set(true);
    this.patientService.getById(id).subscribe({
      next:(data)=>{
        if(data.dateOfBirth){
          data.dateOfBirth=new Date(data.dateOfBirth) as any;
        }
          this.patient={...data};
        this.isLoading.set(false);
      },
      error:(error)=>{
        console.log('Failed to fetch patient data:',error);
        this.isLoading.set(false);
      }
    })
  }

  onSubmit(): void {
    this.isLoading.set(true);

    this.patientService.create(this.patient).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/patientManagement/patient-list']);
      },
      error: (err) => {
        this.isLoading.set(false);
        console.error('Failed to create patient:', err);
      }
    });
  }
  goBack(): void {
    this.router.navigate(['/patientManagement/patient-list']);
  }
}
