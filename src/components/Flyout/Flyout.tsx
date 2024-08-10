import { useDispatch, useSelector } from "react-redux";
import { StoreReducer } from "../../utils/model";
import { unselectAllItems } from "../../redux/reducer";
import { createCsvLink } from "../../utils/utils";

export default function Flyout(): JSX.Element | null {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: StoreReducer) => state.selectedItems.selectedItems,
  );

  if (!selectedItems?.length) {
    return null;
  }

  return (
    <div className="flyout">
      <div className="flyout-text">
        There are currently {selectedItems?.length} items selected
      </div>
      <a
        className="flyout-link"
        href={createCsvLink(selectedItems)}
        aria-label="Download"
        download={`StarTrek_${selectedItems.length}CharactersInfo.csv`}
      >
        <button className="flyout-download-btn">Download</button>
      </a>
      <button
        className="flyout-unselet-btn"
        onClick={(): unknown => dispatch(unselectAllItems())}
      >
        Unselect all
      </button>
    </div>
  );
}
