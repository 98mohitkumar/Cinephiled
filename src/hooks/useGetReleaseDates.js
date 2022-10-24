import { useMemo } from 'react';

const useGetReleaseDates = (data) => {
  const releaseDates = useMemo(
    () =>
      data.map(
        (item) =>
          new Date(
            item?.first_air_date?.toString() || item?.release_date?.toString()
          )
            .toDateString()
            .slice(4, -5) +
          ', ' +
          new Date(
            item?.first_air_date?.toString() || item?.release_date?.toString()
          ).getFullYear()
      ),
    [data]
  );

  return releaseDates;
};

export default useGetReleaseDates;
