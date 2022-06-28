import Link from 'next/link';
import { SearchSlice } from './HeroStyles';

const SearchSuggestion = ({ data, type }) => (
  <>
    {type === 'movie' && (
      <Link
        href={`/movies/${data.id}-${data.title.replaceAll(' ', '-')}`}
        passHref
      >
        <a>
          <SearchSlice>
            <h5 className='suggestion-title'>
              {data.title}{' '}
              {data.release_date &&
                `(${new Date(data.release_date.toString()).getFullYear()})`}
            </h5>

            <h6 className='tag'>Movie</h6>
          </SearchSlice>
        </a>
      </Link>
    )}

    {type === 'tv' && (
      <Link href={`/tv/${data.id}-${data.name.replaceAll(' ', '-')}`} passHref>
        <a>
          <SearchSlice>
            <h5 className='suggestion-title'>
              {data.name}{' '}
              {data.first_air_date &&
                `(${new Date(data.first_air_date.toString()).getFullYear()})`}
            </h5>

            <h6 className='tag'>TV</h6>
          </SearchSlice>
        </a>
      </Link>
    )}
  </>
);

export default SearchSuggestion;
