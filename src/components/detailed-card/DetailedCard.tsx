import { useEffect, useState } from "react";
import "./DetailedCard.css";
import { Character } from "../../utils/model";

const DetailedCard = (props: { name: string; onClick: () => void }) => {
  const [result, setResult] = useState<Character[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const url = "https://stapi.co/api/v1/rest/character/search";

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
      body: `name=${decodeURI(props.name)}`,
    };

    await fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        setResult(result.characters || []);
      });
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
    const noData: string = "Not known";
    return (
      <div className="cards-details-section">
        <h1 className="title">Detailed information about the character</h1>
        <div className="details-container">
          <b className="card_details">Name: {name ? name : noData}</b>
          <span className="card_details">Uid: {uid ? uid : noData}</span>
          <span className="card_details">
            Gender: {gender ? gender : noData}
          </span>
          <span className="card_details">
            Year of birth: {yearOfBirth ? yearOfBirth : noData}
          </span>
          <span className="card_details">
            Month of birth: {monthOfBirth ? monthOfBirth : noData}
          </span>
          <span className="card_details">
            Day of birth: {dayOfBirth ? dayOfBirth : noData}
          </span>
          <span className="card_details">
            Place of birth: {placeOfBirth ? placeOfBirth : noData}
          </span>
          <span className="card_details">
            Marital status: {maritalStatus ? maritalStatus : noData}
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
