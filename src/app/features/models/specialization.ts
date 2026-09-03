export interface Specialization{
  id?: number;
  name: string;
  description: string;
  status:string;
}
export interface CreateSpecializationInput{
  name: string;
  description: string;
  status:string;
}
export interface UpdateSpecializationInput{
  name: string;
  description: string;
  status:string;
} 