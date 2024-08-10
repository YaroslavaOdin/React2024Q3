import { GetServerSideProps } from "next";
import { Character, IResponse } from "../../utils/model";
import MainPage from "../../components/Main/MainPage";

export const getServerSideProps = (async ({ query }) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json",
    },
    body: `name=${query.search}`,
  };
  let dataFromServerResult, dataFromServer;
  if (query?.search) {
    dataFromServerResult = await fetch(
        `https://stapi.co/api/v1/rest/character/search?pageNumber=${query.page || 0}&pageSize=50`,
        requestOptions,
      );
      dataFromServer = await dataFromServerResult.json();
  } else {
    dataFromServerResult = await fetch(
        `https://stapi.co/api/v1/rest/character/search?pageNumber=${query.page || 0}&pageSize=50`
      );
      dataFromServer = await dataFromServerResult.json();
  }

  const requestOptionsForCharacter = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json",
    },
    body: `name=${query.characterName}`,
  };

  const dataByIdFromServerResult = await fetch(
    `https://stapi.co/api/v1/rest/character/search`,
    requestOptionsForCharacter
  );
  const dataByIdFromServer: Character[] = await dataByIdFromServerResult.json();

  return { props: { dataFromServer, dataByIdFromServer } };
}) satisfies GetServerSideProps<{dataFromServer: IResponse}>;

export default function DetailsPage(dataFromServer: IResponse): JSX.Element {
  return (
    <>
      <MainPage {...dataFromServer} />
    </>
  );
}
