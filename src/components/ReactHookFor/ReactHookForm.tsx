import './ReactHookForm.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { State } from "../../utils/model";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "../../yup-validation/yup-validation";
import { addReactHookFormData } from "../../redux/reactHookFormSlice";
import { toBase64 } from "../../utils/utils";
import { FormData } from "../../utils/model";

const ReactHookForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const countries = useSelector((state: State) => state.countries.countries);
  const [proposedСountries, setProposedСountries] =
    useState<string[]>(countries);
  const [inputCountry, setInputCountry] = useState<string>("");
  const [isHideCountryList, setIsHideCountryList] = useState<boolean>(true);

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

  const onSubmit = async (data: FormData) => {
    if(isValid) {
      const file = (data.picture as unknown as FileList)[0]
      const fileToBase64 = file ? (await toBase64(file) as string) : "";

      dispatch(
        addReactHookFormData({
          name: data.name,
          age: data.age,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
          gender: data.gender,
          agreement: data.agreement,
          picture: fileToBase64,
          country: data.country,
        }),
      );

      navigate("/");
    }
  };


  return (
    <div className="react-hook-form">
      <h1 className="react-hook-form__title">React Hook Form</h1>
      <form className="react-hook-form__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="react-hook-form__input-container">
          <label htmlFor="name" className="react-hook-form__label">
            Name:
          </label>
          <input id="name" type="text" {...register('name')} placeholder="Name" />
          {errors.name && (
            <div className="validation-form-error">
              {errors.name.message}
            </div>
          )}
        </div>

        <div className="react-hook-form__input-container">
          <label htmlFor="age" className="react-hook-form__label">
            Age:
          </label>
          <input id="age" type="number" {...register('age')} placeholder="Age" />
          {errors.age && (
            <div className="validation-form-error">
              {errors.age.message}
            </div>
          )}
        </div>

        <div className="react-hook-form__input-container">
          <label htmlFor="email" className="react-hook-form__label">
            Email:
          </label>
          <input type="email" id="email" {...register('email')} placeholder="Email" />
          {errors.email && (
            <div className="validation-form-error">
              {errors.email.message}
            </div>
          )}
        </div>

        <div className="react-hook-form__input-container">
          <label htmlFor="password" className="react-hook-form__label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            {...register('password')}
            placeholder="Password"
          />
          {errors.password && (
            <div className="react-hook-form-error">
              {errors.password.message}
            </div>
          )}
        </div>

        <div className="react-hook-form__input-container">
          <label htmlFor="confirmPassword" className="react-hook-form__label">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword')}
            placeholder="Confirm password"
          />
          {errors.confirmPassword && (
            <div className="validation-form-error">
              {errors.confirmPassword.message}
            </div>
          )}
        </div>

        <div className="react-hook-form__input-container">
          <label htmlFor="gender" className="react-hook-form__label">
            Gender:
          </label>
          <select id="gender" {...register('gender')}>
            <option value="">Not selected</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="female">Other</option>
          </select>
          {errors.gender && (
            <div className="validation-form-error">
              {errors.gender.message}
            </div>
          )}
        </div>

        <div className="react-hook-form__input-container">
          <label htmlFor="agreement" className="react-hook-form__label">
            Accept terms and conditions agreement:
          </label>
          <input type="checkbox" id="agreement" {...register('agreement')} />
          {errors.agreement && (
            <div className="validation-form-error">
              {errors.agreement.message}
            </div>
          )}
        </div>

        <div className="react-hook-form__input-container">
          <label htmlFor="picture">Upload Picture:</label>
          <input
            type="file"
            id="picture"
            {...register('picture')}
            accept=".png, .jpg"
          />
          {errors.picture && (
            <div className="validation-form-error">
              {errors.picture.message}
            </div>
          )}
        </div>

        <div className="react-hook-form__autocomplete-control react-hook-form__input-container">
          <label htmlFor="country" className="react-hook-form__label">
            Country:
          </label>
          <input
            placeholder="Country"
            type="search"
            {...register('country')}
            value={inputCountry}
            onChange={changeSelectCountry}
            onFocus={changeSelectCountry}
          />
          {errors.country && (
            <div className="validation-form-error">
              {errors.country.message}
            </div>
          )}
        </div>

        <div
          className="proposed-countries react-hook-form__input-container"
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
          <button type="submit" disabled={!isValid}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ReactHookForm;