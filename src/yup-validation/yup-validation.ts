import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required.")
    .matches(/^[A-ZА-Я]/, "The first letter of the name must be capital."),
  age: yup
    .number()
    .required("Age is required.")
    .integer("Age must be an integer.")
    .positive("Age must be a positive number."),
  email: yup
    .string()
    .required("Email is required.")
    .email("Invalid email address."),
  password: yup
    .string()
    .required("Password is required.")
    .min(8, "The password must contain 8 letters.")
    .matches(/[0-9]/, "The password must contain 1 number.")
    .matches(/[A-ZА-ЯЁ]/, "The password must contain 1 uppercased letter.")
    .matches(/[a-zа-яё]/, "The password must contain 1 lowercased letter.")
    .matches(
      /[!"#$%&'()*+,-./:;<=>?@[^_`{|}~]/,
      "The password must contain 1 special character.",
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required.")
    .oneOf([yup.ref("password")], "Passwords must match."),
  gender: yup
    .string()
    .required("Gender is required")
    .oneOf(["male", "female", "other"], "Choose your gender."),
  agreement: yup
    .boolean()
    .oneOf([true], "You must accept the Terms and Conditions."),
  picture: yup
    .mixed()
    .required("Picture is required.")
    .test(
      "fileFormat",
      "Invalid format. Format must be jpeg or png.",
      (files) => {
        let isValid = false;
        if (
          (files as File).type === "image/jpeg" ||
          (files as File).type === "image/png"
        ) {
          isValid = true;
        }
        return isValid;
      },
    )
    .test("fileSize", "Max size can be 1080 * 1920.", (value) => {
      if (!value || !(value as File).size) return true;
      return (value as File).size <= 1080 * 1920;
    }),
  country: yup.string().required("Country is required."),
});

export default validationSchema;
