import { Character } from "../../utils/model";
import Card from "../Card/Card";

export default function CardList(props: { result: Character[], search: string }): JSX.Element {
  return (
    <div className="cards-list">
      {props.result?.map((person) => (
        <Card key={person.uid} results={person} search={props.search}></Card>
      ))}
    </div>
  );
}
