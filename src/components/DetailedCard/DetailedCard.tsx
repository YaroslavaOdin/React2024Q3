import { useEffect, useState } from "react";
import { Character } from "../../utils/model";
import { getDetailedInfo } from "../../utils/utils";
import ThemeContext from "../../theme-context/themeContext";
import { Router } from "next/router";

const DetailedCard = (props: { character: Character; onClick: () => void }) => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  if (!props.character) {
    return (
      <div className="no-details">
        <h1 className="title">No character data available.</h1>
      </div>
    );
  }

  if (props.character) {
    const {
      uid,
      name,
      gender,
      yearOfBirth,
      monthOfBirth,
      dayOfBirth,
      placeOfBirth,
      maritalStatus,
    } = props.character;

    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div data-testid="detailed-card">
            {isLoading ? (
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
