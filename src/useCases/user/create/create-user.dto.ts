export interface ICreateUserRequestDTO {
  name: string;
  lastname: string;
  dob: string;
  email: string;
  phone: string;
  password: string;
}

export interface ICreateUserResponseDTO {
  status: string;
}
