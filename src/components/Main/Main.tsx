import './Main.css';
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import { FormData } from "../../utils/model";

const Main = () => {
  const uncontrolledFormData = useSelector(
    (state: { UncontrolledFormData: FormData[] }) =>
      state.UncontrolledFormData
  );

  const reactHookFormData = useSelector(
    (state: { ReactHookFormData: FormData[] }) => {
      console.log(state);
      return state.ReactHookFormData
    }
      
  );

  return (
    <div className="main-page">
      <Header />
      <h1 className="main-page__title">Form Data</h1>
      <div className="main-page__container">
        <div className="main-page__uncontrolled-form-data">
          <h6 className="link-title">Forms from uncontrolled form:</h6>
          <div className="main-page__card-list">
            {uncontrolledFormData?.length === 0 && (
              <div>No submited forms</div>
            )}
            {uncontrolledFormData?.map((formData) => 
              <div className="main-page__card">
                <div>Name: {formData.name}</div>
                <div>Age: {formData.age}</div>
                <div>Email: {formData.email}</div>
                <div>Password: {formData.password}</div>
                <div>Gender: {formData.gender}</div>
                <div>Country: {formData.country}</div>
                <div>Picture:</div>
                <img src={formData.picture} alt="picture" />
              </div>
            )}
          </div>
        </div>

        <div className="main-page__react-hook-form-data">
          <h6 className="link-title">Forms from react hook form:</h6>
          <div className="main-page__card-list">
            {reactHookFormData?.length === 0 && (
              <div>No submited forms</div>
            )}
            {reactHookFormData?.map((formData) => 
              <div className="main-page__card">
                <div>Name: {formData.name}</div>
                <div>Age: {formData.age}</div>
                <div>Email: {formData.email}</div>
                <div>Password: {formData.password}</div>
                <div>Gender: {formData.gender}</div>
                <div>Country: {formData.country}</div>
                <div>Picture:</div>
                <img src={formData.picture} alt="picture" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
