import { Link } from "react-router-dom";
import { Character, StoreReducer } from "../../utils/model";
import "./Card.css";
import { useDispatch, useSelector } from "react-redux";
import { selectItem, unselectItem } from "../../redux/reducer";

const Card = (props: { results: Character }) => {
  const { uid, name } = props.results;

  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: StoreReducer) => state.selectedItems.selectedItems,
  );

  const isCardSelected = (uid: string | number): boolean => {
    return selectedItems.some((card) => card.uid === uid);
  };

  return (
    <div key={uid} className="card" data-testid="card">
      <b className="card_info card_name">{name}</b>
      <Link to={`/star-trek-character/details=${name}`}>
        <div className="card_info card_link">Learn more...</div>
      </Link>
      {isCardSelected(uid) ? (
        <button
          className="unselect-card-btn"
          onClick={(): unknown => dispatch(unselectItem(props.results))}
        >
          Unselect Card
        </button>
      ) : (
        <button
          className="select-card-btn"
          onClick={(): unknown => dispatch(selectItem(props.results))}
        >
          Select Card
        </button>
      )}
    </div>
  );
};

export default Card;
