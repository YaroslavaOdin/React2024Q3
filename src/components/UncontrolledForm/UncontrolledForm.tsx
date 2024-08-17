import "./UncontrolledForm.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUncontrolledFormData } from "../../redux/uncontrolledFormSlice";
import { useRef, useState } from "react";
import { State } from "../../utils/model";
import { toBase64 } from "../../utils/utils";
import * as yup from "yup";
import validationSchema from "../../yup-validation/yup-validation";

const UncontrolledForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const agreementRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const countries = useSelector((state: State) => state.countries.countries);
  const [proposedСountries, setProposedСountries] =
    useState<string[]>(countries);
  const [inputCountry, setInputCountry] = useState<string>("");
  const [isHideCountryList, setIsHideCountryList] = useState<boolean>(true);
  const [validationFormErrors, setvalidationFormErrors] = useState<{
    [key: string]: string;
  }>({});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender: genderRef.current?.value,
      agreement: agreementRef.current?.checked,
      picture: pictureRef.current?.files?.[0],
      country: countryRef.current?.value,
    };

    try {
      await validationSchema.validate(data, { abortEarly: false });

      setvalidationFormErrors({});

      const file = pictureRef.current?.files?.[0];
      const fileToBase64 = file ? ((await toBase64(file)) as string) : "";

      dispatch(
        addUncontrolledFormData({
          name: nameRef.current?.value,
          age: ageRef.current?.value,
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
          confirmPassword: confirmPasswordRef.current?.value,
          gender: genderRef.current?.value,
          agreement: agreementRef.current?.checked,
          picture: fileToBase64,
          country: countryRef.current?.value,
        }),
      );

      navigate("/");
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        error.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setvalidationFormErrors(validationErrors);
      }
    }
  };

  const selectCountry = (country: string) => {
    setIsHideCountryList(true);
    setInputCountry(country);
  };

  const changeSelectCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!value) {
      setInputCountry("");
      setIsHideCountryList(true);
      return;
    }
    setIsHideCountryList(false);
    const filtered = countries.filter((country: string) =>
      country.toLowerCase().startsWith(value.toLowerCase()),
    );
    setProposedСountries(filtered);
    setInputCountry(value);
  };

  return (
    <div className="uncontrolled-form">
      <h1 className="uncontrolled-form__title">Uncontrolled Form</h1>
      <form className="uncontrolled-form__form" onSubmit={handleSubmit}>
        <div className="uncontrolled-form__input-container">
          <label htmlFor="name" className="uncontrolled-form__label">
            Name:
          </label>
          <input id="name" type="text" ref={nameRef} placeholder="Name" />
          {validationFormErrors.name && (
            <div className="validation-form-error">
              {validationFormErrors.name}
            </div>
          )}
        </div>

        <div className="uncontrolled-form__input-container">
          <label htmlFor="name" className="uncontrolled-form__label">
            Age:
          </label>
          <input id="age" type="number" ref={ageRef} placeholder="Age" />
          {validationFormErrors.age && (
            <div className="validation-form-error">
              {validationFormErrors.age}
            </div>
          )}
        </div>

        <div className="uncontrolled-form__input-container">
          <label htmlFor="email" className="uncontrolled-form__label">
            Email:
          </label>
          <input type="email" id="email" ref={emailRef} placeholder="Email" />
          {validationFormErrors.email && (
            <div className="validation-form-error">
              {validationFormErrors.email}
            </div>
          )}
        </div>

        <div className="uncontrolled-form__input-container">
          <label htmlFor="password" className="uncontrolled-form__label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            placeholder="Password"
          />
          {validationFormErrors.password && (
            <div className="validation-form-error">
              {validationFormErrors.password}
            </div>
          )}
        </div>

        <div className="uncontrolled-form__input-container">
          <label htmlFor="confirmPassword" className="uncontrolled-form__label">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            ref={confirmPasswordRef}
            placeholder="Confirm password"
          />
          {validationFormErrors.confirmPassword && (
            <div className="validation-form-error">
              {validationFormErrors.confirmPassword}
            </div>
          )}
        </div>

        <div className="uncontrolled-form__input-container">
          <label htmlFor="gender" className="uncontrolled-form__label">
            Gender:
          </label>
          <select id="gender" ref={genderRef}>
            <option value="">Not selected</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="female">Other</option>
          </select>
          {validationFormErrors.gender && (
            <div className="validation-form-error">
              {validationFormErrors.gender}
            </div>
          )}
        </div>

        <div className="uncontrolled-form__input-container">
          <label htmlFor="agreement" className="uncontrolled-form__label">
            Accept terms and conditions agreement:
          </label>
          <input type="checkbox" id="agreement" ref={agreementRef} />
          {validationFormErrors.agreement && (
            <div className="validation-form-error">
              {validationFormErrors.agreement}
            </div>
          )}
        </div>

        <div className="uncontrolled-form__input-container">
          <label htmlFor="picture">Upload Picture:</label>
          <input
            type="file"
            id="picture"
            ref={pictureRef}
            accept=".png, .jpeg"
          />
          {validationFormErrors.picture && (
            <div className="validation-form-error">
              {validationFormErrors.picture}
            </div>
          )}
        </div>

        <div className="uncontrolled-form__autocomplete-control uncontrolled-form__input-container">
          <label htmlFor="country" className="uncontrolled-form__label">
            Country:
          </label>
          <input
            placeholder="Country"
            type="search"
            ref={countryRef}
            value={inputCountry}
            onChange={changeSelectCountry}
            onFocus={changeSelectCountry}
          />
          {validationFormErrors.country && (
            <div className="validation-form-error">
              {validationFormErrors.country}
            </div>
          )}
        </div>

        <div
          className="proposed-countries uncontrolled-form__input-container"
          style={{ display: isHideCountryList ? "none" : "block" }}
        >
          <div id="country">
            {proposedСountries.map((country) => (
              <div
                className="proposed-countries__country"
                key={country}
                onClick={() => {
                  selectCountry(country);
                }}
              >
                {country}
              </div>
            ))}
          </div>
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default UncontrolledForm;
