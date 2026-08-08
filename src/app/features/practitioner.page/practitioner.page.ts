import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

import {
  Practitioner,
  PractitionerService,
  CreatePractitionerInput,
  UpdatePractitionerInput
} from '../../service/practitioner.service';

import {
  Specialization,
  SpecializationService
} from '../../service/specialization.service';


@Component({
  selector: 'app-practitioner-page',
  standalone: true,

  providers: [PractitionerService,  SpecializationService],

  imports: [
    CommonModule,
    FormsModule,

    ButtonModule,
    DialogModule,
    InputTextModule,
    SelectModule,
    TableModule,
    TagModule,
    TooltipModule
  ],

  templateUrl: './practitioner.page.html',
  styleUrl: './practitioner.page.css'
})
export class PractitionerPage implements OnInit {


  // ==========================================
  // Practitioner List
  // ==========================================

  practitioners: Practitioner[] = [];

  loading = false;


  // ==========================================
  // Specialization List
  // ==========================================

  specializations: Specialization[] = [];

  selectedSpecializationId?: number;


  // ==========================================
  // Dialog
  // ==========================================

  practitionerDialog = false;

  isEditMode = false;


  // ==========================================
  // Selected Practitioner
  // ==========================================

  practitioner: Practitioner =
    this.emptyPractitioner();


  // ==========================================
  // Constructor
  // ==========================================

  constructor(
    private practitionerService: PractitionerService,
    private specializationService: SpecializationService
  ) {}


  // ==========================================
  // On Init
  // ==========================================

  ngOnInit(): void {

    this.loadPractitioners();

    this.loadSpecializations();

  }


  // ==========================================
  // Get All Practitioners
  // ==========================================

  loadPractitioners(): void {

    this.loading = true;

    this.practitionerService
      .getAll()
      .subscribe({

        next: (data: Practitioner[]) => {

          console.log(
            'Practitioners:',
            data
          );

          this.practitioners = data;

          this.loading = false;

        },

        error: (error) => {

          console.error(
            'Failed to load practitioners:',
            error
          );

          this.loading = false;

        }

      });

  }


  // ==========================================
  // Get All Specializations
  // ==========================================

  loadSpecializations(): void {

    this.specializationService
      .getAll()
      .subscribe({

        next: (data: Specialization[]) => {

          console.log(
            'Specializations:',
            data
          );

          this.specializations = data;

        },

        error: (error) => {

          console.error(
            'Failed to load specializations:',
            error
          );

        }

      });

  }


  // ==========================================
  // Empty Practitioner
  // ==========================================

  emptyPractitioner(): Practitioner {

    return {

      id: undefined,

      name: '',

      licenseNumber: '',

      email: '',

      phone: '',

      status: 'ACTIVE',

      specializationName: '',

      createdAt: undefined

    };

  }


  // ==========================================
  // Open Add Dialog
  // ==========================================

  openNew(): void {

    this.isEditMode = false;

    this.practitioner =
      this.emptyPractitioner();

    this.selectedSpecializationId =
      undefined;

    this.practitionerDialog = true;

  }


  // ==========================================
  // Open Edit Dialog
  // ==========================================

  editPractitioner(
    practitioner: Practitioner
  ): void {

    this.isEditMode = true;

    this.practitioner = {
      ...practitioner
    };


    // Find specialization ID
    // using specialization name

    const specialization =
      this.specializations.find(
        item =>
          item.name ===
          practitioner.specializationName
      );


    this.selectedSpecializationId =
      specialization?.id;


    this.practitionerDialog = true;

  }


  // ==========================================
  // Save Practitioner
  // ==========================================

  savePractitioner(): void {


    // ========================================
    // Validation
    // ========================================

    if (
      !this.practitioner.name ||
      !this.practitioner.licenseNumber ||
      !this.practitioner.email ||
      !this.practitioner.phone ||
      !this.selectedSpecializationId
    ) {

      console.warn(
        'Please fill all required fields.'
      );

      return;

    }


    // ========================================
    // UPDATE
    // ========================================

    if (
      this.isEditMode &&
      this.practitioner.id
    ) {


      const updateData:
        UpdatePractitionerInput = {

        name:
          this.practitioner.name,

        licenseNumber:
          this.practitioner.licenseNumber,

        email:
          this.practitioner.email,

        phone:
          this.practitioner.phone,

        status:
          this.practitioner.status,

        specializationId:
          this.selectedSpecializationId

      };


      console.log(
        'Update practitioner:',
        updateData
      );


      this.practitionerService
        .update(
          this.practitioner.id,
          updateData
        )
        .subscribe({

          next: (data) => {

            console.log(
              'Practitioner updated:',
              data
            );

            this.practitionerDialog =
              false;

            this.loadPractitioners();

          },

          error: (error) => {

            console.error(
              'Failed to update practitioner:',
              error
            );

          }

        });


      return;

    }


    // ========================================
    // CREATE
    // ========================================

    const createData:
      CreatePractitionerInput = {

      name:
        this.practitioner.name,

      licenseNumber:
        this.practitioner.licenseNumber,

      email:
        this.practitioner.email,

      phone:
        this.practitioner.phone,

      status:
        this.practitioner.status,

      specializationId:
        this.selectedSpecializationId

    };


    console.log(
      'Create practitioner:',
      createData
    );


    this.practitionerService
      .create(createData)
      .subscribe({

        next: (data) => {

          console.log(
            'Practitioner created:',
            data
          );

          this.practitionerDialog =
            false;

          this.loadPractitioners();

        },

        error: (error) => {

          console.error(
            'Failed to create practitioner:',
            error
          );

        }

      });

  }


  // ==========================================
  // Delete Practitioner
  // ==========================================

  deletePractitioner(
    practitioner: Practitioner
  ): void {

    if (!practitioner.id) {

      return;

    }


    console.log(
      'Delete practitioner:',
      practitioner.id
    );


    this.practitionerService
      .delete(practitioner.id)
      .subscribe({

        next: () => {

          console.log(
            'Practitioner deleted'
          );

          this.loadPractitioners();

        },

        error: (error) => {

          console.error(
            'Failed to delete practitioner:',
            error
          );

        }

      });

  }


  // ==========================================
  // Status Severity
  // ==========================================

  getStatusSeverity(
    status: string
  ): 'success' | 'danger' | 'warn' | undefined {

    switch (status) {

      case 'ACTIVE':
        return 'success';

      case 'INACTIVE':
        return 'danger';

      case 'Retired':
        return 'warn';

      default:
        return undefined;

    }

  }

}