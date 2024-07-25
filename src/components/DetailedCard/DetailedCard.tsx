import { useEffect, useState } from "react";
import "./DetailedCard.css";
import { Character } from "../../utils/model";
import { getCharacterInfo, getDetailedInfo } from "../../utils/utils";

const DetailedCard = (props: { name: string; onClick: () => void }) => {
  const [result, setResult] = useState<Character[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    const result = await getCharacterInfo(props.name);
    setLoading(false);
    setResult(result || []);
  };

  if (loading) {
    return <div className="loader-details">Loading...</div>;
  }

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
      <div className="cards-details-section">
        <h1 className="title">Detailed information about the character</h1>
        <div className="details-container">
          <b className="card_details">Name: {getDetailedInfo(name)}</b>
          <span className="card_details">Uid: {getDetailedInfo(uid)}</span>
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
    );
  }
};

export default DetailedCard;
