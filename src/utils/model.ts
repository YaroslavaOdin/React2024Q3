export interface FormData {
  name: string;
  age: number | string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean;
  picture: File | FileList | undefined | unknown;
  country: string;
}

export interface State {
  ReactHookForm: [];
  UncontrolledFormData: [];
  countries: { countries: [] };
}
