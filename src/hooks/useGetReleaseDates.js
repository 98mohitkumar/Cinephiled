const useGetReleaseDates = (data) => {
  const releaseDates =
    data.length > 0
      ? data.map((item) => {
          if (item?.first_air_date || item?.release_date || item?.air_date) {
            return (
              new Date(
                item?.first_air_date?.toString() ||
                  item?.release_date?.toString() ||
                  item?.air_date.toString()
              )
                .toDateString()
                .slice(4, -5) +
              ', ' +
              new Date(
                item?.first_air_date?.toString() ||
                  item?.release_date?.toString() ||
                  item?.air_date.toString()
              ).getFullYear()
            );
          } else {
            return 'TBA';
          }
        })
      : [];

  return releaseDates;
};

export default useGetReleaseDates;
