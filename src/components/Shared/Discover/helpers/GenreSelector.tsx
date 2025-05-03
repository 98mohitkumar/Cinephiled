import Button from "components/UI/Button";
import P from "components/UI/Typography/P";
import { cn } from "utils/helper";

interface Genre {
  id: number;
  name: string;
}

interface GenreSelectorProps {
  genres: Genre[];
  selectedGenres: number[];
  onChange: (genreIds: number[]) => void;
  className?: string;
}

const GenreSelector = ({ genres, selectedGenres, onChange, className }: GenreSelectorProps) => {
  const toggleGenre = (genreId: number) => {
    const updatedGenres = selectedGenres.includes(genreId) ? selectedGenres.filter((id) => id !== genreId) : [...selectedGenres, genreId];

    onChange(updatedGenres);
  };

  return (
    <div className={cn("w-full", className)}>
      <P weight='medium' size='small' className='text-neutral-300'>
        Genres
      </P>

      <div className='mt-12 flex flex-wrap gap-8'>
        {genres.map((genre) => (
          <Button
            key={genre.id}
            shape='pill'
            variant='secondary'
            size='small'
            onClick={() => toggleGenre(genre.id)}
            weight={selectedGenres.includes(genre.id) ? "medium" : "normal"}
            className={cn(selectedGenres.includes(genre.id) && "bg-white text-black")}>
            {genre.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default GenreSelector;
