import { CardsContainerGrid } from "components/MediaTemplate/TemplateStyles";
import { apiEndpoints } from "globals/constants";
import { Fragment, useEffect, useState } from "react";
import { getCountryCode } from "src/utils/helper";

const WatchProviders = () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const getWatchProviders = async () => {
      const region = await getCountryCode();

      const res = await fetch(apiEndpoints.providers.watchProviders({ region }));
      const data = await res.json();

      if (res.ok) {
        // eslint-disable-next-line no-unused-vars
        setProviders(data.results.map(({ display_priorities, ...rest }) => rest));
      }
    };

    getWatchProviders();
  }, []);

  console.info(providers);

  return (
    <Fragment>
      <h2 className='fs-3 m-0 mb-3'>Watch Providers</h2>

      <CardsContainerGrid>
        {providers.map((provider) => (
          <div key={provider.provider_id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
              alt={provider.provider_name}
              className='img-fluid'
            />
            <p>{provider.provider_name}</p>
          </div>
        ))}
      </CardsContainerGrid>
    </Fragment>
  );
};

export default WatchProviders;
