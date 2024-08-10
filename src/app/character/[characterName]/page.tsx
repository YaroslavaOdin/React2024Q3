import MainPage from "../../../components/Main/MainPage";
import { Suspense } from "react";
import Loader from "../../../components/Loader/Loader";
import { getCharacterDetails } from "../../../utils/utils";

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