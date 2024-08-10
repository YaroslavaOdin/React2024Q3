import Loader from "../components/Loader/Loader";
import MainPage from "../components/Main/MainPage";
import { Suspense } from "react";
import { getCharacters } from "../utils/utils";

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
