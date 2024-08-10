import { GetServerSideProps } from "next";
import { IResponse } from "../utils/model";
import MainPage from "../components/Main/MainPage";

export const getServerSideProps = (async ({ query }) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json",
    },
    body: `name=${query.search}`,
  };
  let result, dataFromServer;
  if (query.search) {
    const result = await fetch(
      `https://stapi.co/api/v1/rest/character/search?pageNumber=${query.page || 0}&pageSize=50`,
      requestOptions,
    );
    dataFromServer = await result.json();
  } else {
    result = await fetch(
      `https://stapi.co/api/v1/rest/character/search?pageNumber=${query.page || 0}&pageSize=50`,
    );
    dataFromServer = await result.json();
  }
  return { props: { dataFromServer } };
}) satisfies GetServerSideProps<{ dataFromServer: IResponse }>;

export default function Home(dataFromServer: IResponse): JSX.Element {
  return (
    <>
      <MainPage {...dataFromServer} />
    </>
  );
}
