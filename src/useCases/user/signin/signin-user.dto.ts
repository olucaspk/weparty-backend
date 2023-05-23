export interface ISignInUserRequestDTO {
  email: string;
  password: string;
}

export interface ISignInUserResponseDTO {
  token: string;
}
