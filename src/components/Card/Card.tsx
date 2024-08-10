import Link from "next/link";
import { Character, StoreReducer } from "../../utils/model";
import { selectItem, unselectItem } from "../../redux/reducer";
import { useDispatch, useSelector } from "react-redux";

export default function Card(props: {
  results: Character;
  search: string;
  page: number;
}): JSX.Element {
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
      <Link
        href={`/character/${encodeURI(name)}?search=${props.search}&page=${props.page}`}
      >
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
}
