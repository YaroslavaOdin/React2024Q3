export interface FormData {
  name: string;
  age: number | string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  agreement: boolean;
  picture: string;
  country: string;
}

export interface State {
  ReactHookForm: [];
  UncontrolledFormData: [];
  countries: { countries: [] };
}
