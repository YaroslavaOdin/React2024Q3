import { Link } from "react-router-dom";
import { Character } from "../../utils/model";
import "./Card.css";

const Card = (props: { results: Character }) => {
  const { uid, name, gender } = props.results;

  return (
    <div key={uid} className="card">
      <b className="card_info">{name}</b>
      <span className="card_info">Gender : {gender}</span>
      <Link to={`/star-trek-character/details=${name}`}>
        <div className="card_info">Learn more...</div>
      </Link>
    </div>
  );
};

export default Card;
