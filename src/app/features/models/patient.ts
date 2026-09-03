export interface Patient {

  id?: number;

  medicalRecordNo: string;

  name: string;

  dateOfBirth: string;

  gender: string;

  phoneNo: string;
  email: string;
  
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;

  createdAt?: String;

}
export interface CreateUpdatePatientInput{
    medicalRecordNo: string,
    name : string,
    dateOfBirth :string,
    gender: string;

  phoneNo: string;
  email: string;
  
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;


}