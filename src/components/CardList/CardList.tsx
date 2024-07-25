import { Character } from "../../utils/model";
import Card from "../Card/Card";
import "./CardList.css";

const CardList = (props: { result: Character[] }) => {
  return (
    <div className="cards-list">
      {props.result?.map((person) => <Card results={person}></Card>)}
    </div>
  );
};

export default CardList;
