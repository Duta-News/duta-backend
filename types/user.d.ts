export interface User {
  id: string;
  email: string;
  password: string;
  phoneNumber: string;
  name: string;
  authenticationType: string;
  authenticationId: string;
  isEmailVerified: boolean;
  dob: string;
  gender: string;
}
