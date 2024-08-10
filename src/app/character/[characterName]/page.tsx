import { IResponse } from "../../../utils/model";
import MainPage from "../../../components/Main/MainPage";
import { cache, Suspense } from "react";
import Loader from "../../../components/Loader/Loader";

export const getCharacterDetails = cache(async (page = 0, search = '', name: unknown) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json",
    },
    body: `name=${search}`,
  };
  let dataFromServerResult, dataFromServer;
  if (search) {
    dataFromServerResult = await fetch(
        `https://stapi.co/api/v1/rest/character/search?pageNumber=${page || 0}&pageSize=50`,
        requestOptions,
      );
      dataFromServer = await dataFromServerResult.json();
  } else {
    dataFromServerResult = await fetch(
        `https://stapi.co/api/v1/rest/character/search?pageNumber=${page || 0}&pageSize=50`
      );
      dataFromServer = await dataFromServerResult.json();
  }

  const requestOptionsForCharacter = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json",
    },
    body: `name=${name}`,
  };

  const dataByIdFromServerResult = await fetch(
    `https://stapi.co/api/v1/rest/character/search`,
    requestOptionsForCharacter
  );
  const dataByIdFromServer: IResponse = await dataByIdFromServerResult.json();

  return { dataFromServer, dataByIdFromServer };
})

export default async  function DetailsPage ({
    params: { characterName },
    searchParams: { page, search }
  }: {
    params: { characterName: string };
    searchParams: { page: number; search: string };
  }) {
    const data = await getCharacterDetails(page, search, decodeURI(characterName));
    return (
      <>
      <Suspense fallback={<Loader />}>
        <MainPage dataFromServer={data.dataFromServer} dataByIdFromServer={data.dataByIdFromServer} />
      </Suspense>
      </>
    );
}