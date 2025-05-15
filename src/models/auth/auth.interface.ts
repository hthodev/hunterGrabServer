export interface IUserLogin {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken?: string;
  hd?: string;
  name?: string;
}

export interface IResponseGoogle {
  iss: string,
  sub: string,
  email: string,
  email_verified: boolean,
  name: string,
  picture: string,
  given_name: string,
  iat: number,
  exp: number,
  family_name: string;
}
