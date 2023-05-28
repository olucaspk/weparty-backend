export interface ICreateUserRequestDTO {
  name: string;
  lastname: string;
  dob: string;
  email: string;
  password: string;
}

export interface ICreateUserResponseDTO {
  status: string;
}
