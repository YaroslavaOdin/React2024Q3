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
    (state: { ReactHookFormData: FormData[] }) => 
      state.ReactHookFormData
  );

  const lastFormSubmittedData = useSelector(
    (state: { lastFormSubmitted: FormData[] }) => {
      return state.lastFormSubmitted;
    }
  );

  return (
    <div className="main-page">
      <Header />
      <h1 className="main-page__title">Form Data</h1>
      <div className="main-page__container">
      <div className="main-page__last-form-data">
          <h3 className="link-title">Last submitted form:</h3>
          <div className="main-page__card-list">
            {lastFormSubmittedData?.length === 0 && (
              <div>No submited forms</div>
            )}
            {lastFormSubmittedData?.length > 0 && (
              <div className="main-page__card last-submitted-form__card">
              <div>Name: {lastFormSubmittedData[0].name}</div>
              <div>Age: {lastFormSubmittedData[0].age}</div>
              <div>Email: {lastFormSubmittedData[0].email}</div>
              <div>Password: {lastFormSubmittedData[0].password}</div>
              <div>Gender: {lastFormSubmittedData[0].gender}</div>
              <div>Country: {lastFormSubmittedData[0].country}</div>
              <div>Picture:</div>
              <img src={lastFormSubmittedData[0].picture} alt="picture" />
            </div>
            )}
          </div>
        </div>
        
        <div className="main-page__uncontrolled-form-data">
          <h3 className="link-title">Forms from uncontrolled form:</h3>
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
          <h3 className="link-title">Forms from react hook form:</h3>
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
