export interface ISignInUserRequestDTO {
  email: string;
  password: string;
}

export interface ISignInUserResponseDTO {
  id: string;
  name: string;
  email: string;
  role: string;
}
