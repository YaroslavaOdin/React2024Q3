import { Character } from "../../utils/model";
import { getDetailedInfo } from "../../utils/utils";
import ThemeContext from "../../theme-context/themeContext";

const DetailedCard = (props: { character: Character; onClick: () => void }) => {
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
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
};

export default DetailedCard;
