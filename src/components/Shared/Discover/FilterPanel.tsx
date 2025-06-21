import { useRouter } from "next/router";

import GenreSelector from "components/Shared/Discover/helpers/GenreSelector";
import ReleaseDateFilter from "components/Shared/Discover/helpers/ReleaseDateFilter";
import RuntimeFilter from "components/Shared/Discover/helpers/RuntimeFilter";
import VoteAverageFilter from "components/Shared/Discover/helpers/VoteAverageFilter";
import VoteCountFilter from "components/Shared/Discover/helpers/VoteCountFilter";
import Button from "components/UI/Button";
import FlexBox from "components/UI/FlexBox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/UI/Select";
import H5 from "components/UI/Typography/H5";
import P from "components/UI/Typography/P";
import { cn } from "utils/helper";

export interface FilterPanelProps {
  className?: string;
  filters: {
    releaseDate: [string, string];
    voteAverage: [number, number];
    minVoteCount: number;
    runtime: [number, number];
    sortBy: string;
    language?: string;
    originCountry?: string;
    genres?: number[];
  };
  isMobile?: boolean;
  onFilterChange: (filterKey: string, value: unknown) => void;
  onClearFilters: () => void;
  sortOptions: { label: string; value: string }[];
  languageOptions?: { label: string; value: string }[];
  genreOptions?: { id: number; name: string }[];
  regionOptions?: { label: string; value: string }[];
}

const FilterPanel = ({
  filters,
  onFilterChange,
  onClearFilters,
  sortOptions,
  languageOptions = [],
  genreOptions,
  isMobile = false,
  regionOptions = []
}: FilterPanelProps) => {
  const router = useRouter();

  const disableClearAll = Object.keys(router.query).length === 0;

  return (
    <div className={cn("overflow-hidden bg-black", isMobile ? "" : "rounded-xl border border-neutral-700")}>
      <FlexBox className={cn("items-center justify-between gap-16 border-b border-neutral-700", isMobile ? "px-10 py-20" : "p-20")}>
        <H5 weight='semibold'>Filters</H5>

        <Button variant='secondary' onClick={onClearFilters} size='small' disabled={disableClearAll}>
          Clear All
        </Button>
      </FlexBox>

      <div className={cn("overflow-y-auto", isMobile ? "max-h-[65vh]" : "max-h-[80vh]")}>
        {/* Sort By */}
        <div className={cn("border-b border-neutral-700", isMobile ? "px-10 py-20" : "p-20")}>
          <P weight='medium' size='small' className='mb-12 text-neutral-300'>
            Sort By
          </P>
          <Select defaultValue={filters.sortBy} onValueChange={(value) => onFilterChange("sortBy", value)}>
            <SelectTrigger>
              <SelectValue placeholder='Sort By' />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Language */}
        {languageOptions.length > 0 && (
          <div className={cn("border-b border-neutral-700", isMobile ? "px-10 py-20" : "p-20")}>
            <P weight='medium' size='small' className='mb-12 text-neutral-300'>
              Language
            </P>

            <Select value={filters.language} onValueChange={(value) => onFilterChange("language", value)}>
              <SelectTrigger>
                <SelectValue placeholder='Language' />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Country */}
        {regionOptions.length > 0 && (
          <div className={cn("border-b border-neutral-700", isMobile ? "px-10 py-20" : "p-20")}>
            <P weight='medium' size='small' className='mb-12 text-neutral-300'>
              Country
            </P>

            <Select value={filters.originCountry} onValueChange={(value) => onFilterChange("originCountry", value)}>
              <SelectTrigger>
                <SelectValue placeholder='Country' />
              </SelectTrigger>
              <SelectContent>
                {regionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Range filters */}
        <ReleaseDateFilter
          value={filters.releaseDate}
          onChange={(value) => onFilterChange("releaseDate", value)}
          className={cn("border-b border-neutral-700", isMobile ? "px-10 py-20" : "p-20")}
          isMobile={isMobile}
        />

        <VoteAverageFilter
          value={filters.voteAverage}
          onChange={(value) => onFilterChange("voteAverage", value)}
          className={cn("border-b border-neutral-700", isMobile ? "px-10 py-20" : "p-20")}
        />

        <VoteCountFilter
          value={filters.minVoteCount}
          onChange={(value) => onFilterChange("voteCount", value)}
          className={cn("border-b border-neutral-700", isMobile ? "px-10 py-20" : "p-20")}
        />

        <RuntimeFilter
          value={filters.runtime}
          onChange={(value) => onFilterChange("runtime", value)}
          className={cn("border-b border-neutral-700", isMobile ? "px-10 py-20" : "p-20")}
        />

        {genreOptions && genreOptions.length > 0 && (
          <GenreSelector
            genres={genreOptions}
            selectedGenres={filters.genres || []}
            onChange={(value) => onFilterChange("genres", value)}
            className={cn(isMobile ? "px-10 py-16" : "p-16")}
          />
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
