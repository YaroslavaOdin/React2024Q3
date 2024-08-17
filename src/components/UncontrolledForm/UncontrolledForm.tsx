import "./UncontrolledForm.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUncontrolledFormData } from "../../redux/uncontrolledFormSlice";
import { useRef, useState } from "react";
import { State } from "../../utils/model";
import { toBase64 } from "../../utils/utils";

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
  const [isHideCountryList, setIsHideCountryList] = useState(true);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

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
        <div>
          <label htmlFor="name" className="uncontrolled-form__label">
            Name:
          </label>
          <input id="name" type="text" ref={nameRef} placeholder="Name" />
        </div>

        <div>
          <label htmlFor="name" className="uncontrolled-form__label">
            Age:
          </label>
          <input id="age" type="number" ref={ageRef} placeholder="Age" />
        </div>

        <div>
          <label htmlFor="email" className="uncontrolled-form__label">
            Email:
          </label>
          <input type="email" id="email" ref={emailRef} placeholder="Email" />
        </div>

        <div>
          <label htmlFor="password" className="uncontrolled-form__label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            placeholder="Password"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="uncontrolled-form__label">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            ref={confirmPasswordRef}
            placeholder="Confirm password"
          />
        </div>

        <div>
          <label htmlFor="gender" className="uncontrolled-form__label">
            Gender:
          </label>
          <select id="gender" ref={genderRef}>
            <option value="">Not selected</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="female">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="agreement" className="uncontrolled-form__label">
            Accept terms and conditions agreement:
          </label>
          <input type="checkbox" id="agreement" ref={agreementRef} />
        </div>

        <div>
          <label htmlFor="picture">Upload Picture:</label>
          <input
            type="file"
            id="picture"
            ref={pictureRef}
            accept=".png, .jpeg"
          />
        </div>

        <div className="uncontrolled-form__autocomplete-control">
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
        </div>

        <div
          className="proposed-countries"
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
