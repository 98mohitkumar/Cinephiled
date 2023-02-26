import Link from 'next/link';
import { Fragment } from 'react';
import { Anchor, SearchSlice } from './HeroStyles';

const SearchSuggestion = ({ data, type, ...props }) => (
  <Fragment>
    {type === 'movie' && (
      <Link
        href={`/movies/${data.id}-${data.title.replace(/[' ', '/']/g, '-')}`}
        passHref
      >
        <Anchor {...props}>
          <SearchSlice>
            <h5 className='suggestion-title'>
              {data.title}{' '}
              {data.release_date &&
                `(${new Date(data.release_date.toString()).getFullYear()})`}
            </h5>

            <h6 className='tag'>Movie</h6>
          </SearchSlice>
        </Anchor>
      </Link>
    )}

    {type === 'tv' && (
      <Link
        href={`/tv/${data.id}-${data.name.replace(/[' ', '/']/g, '-')}`}
        passHref
      >
        <Anchor {...props}>
          <SearchSlice>
            <h5 className='suggestion-title'>
              {data.name}{' '}
              {data.first_air_date &&
                `(${new Date(data.first_air_date.toString()).getFullYear()})`}
            </h5>

            <h6 className='tag'>TV</h6>
          </SearchSlice>
        </Anchor>
      </Link>
    )}
  </Fragment>
);

export default SearchSuggestion;
