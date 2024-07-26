import { useEffect, useState } from "react";
import "./DetailedCard.css";
import { Character } from "../../utils/model";
import { getDetailedInfo } from "../../utils/utils";
import { stApi } from "../../api/starTrekApi";
import ThemeContext from "../../theme-context/themeContext";

const DetailedCard = (props: { name: string; onClick: () => void }) => {
  const [result, setResult] = useState<Character[]>();

  // eslint-disable-next-line react-compiler/react-compiler
  const getCharacterInfo = stApi.endpoints.getCharacterInfo.useQuery;

  const {
    data: dataByInfo,
    isLoading: isLoadingByInfo,
    isFetching: isFetchingByInfo,
    // eslint-disable-next-line react-compiler/react-compiler
  } = getCharacterInfo(props.name);

  useEffect(() => {
    if (dataByInfo) {
      setResult(dataByInfo?.characters);
    }
  }, [dataByInfo]);

  if (result && result.length === 0) {
    return (
      <div className="no-details">
        <h1 className="title">No character data available.</h1>
      </div>
    );
  }

  if (result) {
    const {
      uid,
      name,
      gender,
      yearOfBirth,
      monthOfBirth,
      dayOfBirth,
      placeOfBirth,
      maritalStatus,
    } = result[0];

    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div>
            {isLoadingByInfo || isFetchingByInfo ? (
              <div className="loader">Loading...</div>
            ) : (
              <div className={`theme-${theme} cards-details-section`}>
                <h1 className="title">
                  Detailed information about the character
                </h1>
                <div className="details-container">
                  <b className="card_details">Name: {getDetailedInfo(name)}</b>
                  <span className="card_details">
                    Uid: {getDetailedInfo(uid)}
                  </span>
                  <span className="card_details">
                    Gender: {getDetailedInfo(gender)}
                  </span>
                  <span className="card_details">
                    Year of birth: {getDetailedInfo(yearOfBirth)}
                  </span>
                  <span className="card_details">
                    Month of birth: {getDetailedInfo(monthOfBirth)}
                  </span>
                  <span className="card_details">
                    Day of birth: {getDetailedInfo(dayOfBirth)}
                  </span>
                  <span className="card_details">
                    Place of birth: {getDetailedInfo(placeOfBirth)}
                  </span>
                  <span className="card_details">
                    Marital status: {getDetailedInfo(maritalStatus)}
                  </span>
                </div>

                <button className="btn details_close" onClick={props.onClick}>
                  Close details
                </button>
              </div>
            )}
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
};

export default DetailedCard;
