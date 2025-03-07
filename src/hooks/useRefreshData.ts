import { useRouter } from "next/router";

const useRefreshData = (
  { withQuery } = {
    withQuery: false
  }
) => {
  const router = useRouter();

  const revalidateData = () => {
    router.replace(
      {
        pathname: router.pathname,
        query: withQuery
          ? router.query
          : {
              id: router.query.id
            }
      },
      undefined,
      { shallow: false }
    );
  };

  return { revalidateData };
};

export default useRefreshData;
