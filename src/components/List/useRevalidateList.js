import { useRouter } from "next/router";

const useRevalidateList = (
  { withQuery } = {
    withQuery: false
  }
) => {
  const router = useRouter();

  const revalidateData = () => {
    router.push(
      {
        pathname: router.pathname,
        query: withQuery
          ? router.query
          : {
              id: router.query.id
            }
      },
      null,
      { shallow: false }
    );
  };

  return { revalidateData };
};

export default useRevalidateList;
