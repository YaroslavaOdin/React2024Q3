import Loader from "../components/Loader/Loader";
import MainPage from "../components/Main/MainPage";
import { cache, Suspense } from "react";

export const getCharacters = cache(async (page: number, search = "") => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json",
    },
    body: `name=${search}`,
  };
  let result, dataFromServer;
  if (search) {
    const result = await fetch(
      `https://stapi.co/api/v1/rest/character/search?pageNumber=${page}&pageSize=50`,
      requestOptions,
    );
    dataFromServer = await result.json();
  } else {
    result = await fetch(
      `https://stapi.co/api/v1/rest/character/search?pageNumber=${page}&pageSize=50`,
    );
    dataFromServer = await result.json();
  }
  return dataFromServer;
});

export default async function Home({
  searchParams,
}: {
  searchParams: { page: number; search: string };
}) {
  const page = searchParams.page || 0;
  const search = searchParams.search;

  const dataFromServer = await getCharacters(page, search);
  return (
    <Suspense fallback={<Loader />}>
      <MainPage dataFromServer={dataFromServer} />
    </Suspense>
  );
}
