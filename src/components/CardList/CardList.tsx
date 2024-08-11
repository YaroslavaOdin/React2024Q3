import { Character } from "../../utils/model";
import Card from "../Card/Card";

export default function CardList(props: {
  result: Character[];
  search: string;
  page: number;
}): JSX.Element {
  return (
    <div className="cards-list" data-testid="cards-list">
      {props.result?.map((person) => (
        <Card
          key={person.uid}
          results={person}
          search={props.search}
          page={props.page}
        ></Card>
      ))}
    </div>
  );
}
