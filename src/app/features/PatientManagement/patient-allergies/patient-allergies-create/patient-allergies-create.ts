import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, signal, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientAllergiesService } from '../../../services/patient-allergies.service';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { Patient } from '../../../models/patient';
import { PatientService } from '../../../services/patient.service';
import { CreatePatientAllergens, PatientAllergens } from '../../../models/patientAllergens';
import { InputTextModule } from 'primeng/inputtext';
import { Allergen } from '../../../models/allergen.enum';


@Component({
    selector: 'app-patient-allergies-create',
    imports: [ButtonModule, ReactiveFormsModule, SelectModule, InputTextModule],
    templateUrl: './patient-allergies-create.html',
    styleUrl: './patient-allergies-create.css',
})
export class PatientAllergyCreateComponent implements OnInit, OnChanges {

    private fb = inject(FormBuilder);
    private allergyService = inject(PatientAllergiesService);
    private patientService = inject(PatientService);

    patients = signal<Patient[]>([]);
    Allergen = Allergen;
    allergenLevels = Object.values(Allergen);

    @Input() selectedAllergen: PatientAllergens | null = null;
    @Output() created = new EventEmitter<void>();

    isEditMode = false;

    allergyForm = this.fb.group({
        id: [null as number | null],
        patientId: [null as number | null, Validators.required],

        allergenName: [''],
        status: [Allergen.LOW],
        drugFamily: [''],
        reaction: ['']
    });
    ngOnInit() {
        this.patientService.getAll().subscribe({
            next: (patients) => {
                this.patients.set(patients);
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['selectedAllergen']) {
            if (this.selectedAllergen) {
                this.isEditMode = true;
    //             const matchedPatient = this.patients().find(
    //     p => p.name?.toLowerCase() === this.selectedAllergen?.patientName?.toLowerCase()
    //   );
                this.allergyForm.patchValue(
                    this.selectedAllergen,
                // patientId: matchedPatient ? matchedPatient.id : null}
                )
            } else {
                this.isEditMode = false;
                this.allergyForm.reset({
                    status: Allergen.LOW
                });
            }
        }
    }

    save() {

        const patientId = this.allergyForm.value.patientId;

        if (!patientId) return;

        const data: CreatePatientAllergens = {
            patientId,
            allergenName: this.allergyForm.value.allergenName ?? '',
            status: this.allergyForm.value.status ?? Allergen.LOW,
            drugFamily: this.allergyForm.value.drugFamily ?? '',
            reaction: this.allergyForm.value.reaction ?? ''

        }
        console.log('DATA TO BACKEND:', data);

        if (this.isEditMode && this.allergyForm.value.id) {
            const id = this.allergyForm.value.id;
            this.allergyService.update(id, data).subscribe({
                next: () => {
                    this.created.emit();
                    this.allergyForm.reset();
                }
            });
        } else {

            this.allergyService.create(data).subscribe({
                next: () => {
                    this.created.emit();
                    this.allergyForm.reset();
                }
            });
        }
    }
}
