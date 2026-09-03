export interface Practitioner {

  id?: number;

  name: string;

  licenseNumber: string;

  email: string;

  phone: string;

  status: string;

  specializationName: string;

  createdAt?: string;

}

export interface CreatePractitionerInput {

  name: string;
  licenseNumber: string;
  email: string;
  phone: string;
  status: string;
  specializationId: number;

}
export interface UpdatePractitionerInput {

  name: string;
  licenseNumber: string;
  email: string;
  phone: string;
  status: string;
  specializationId: number;

}