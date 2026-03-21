import { ChevronLeft, ChevronRight } from "lucide-react";

import Button from "components/UI/Button";
import FlexBox from "components/UI/FlexBox";
import P from "components/UI/Typography/P";
import { cn } from "utils/helper";

/**
 * Numbered prev/next pagination (e.g. TMDB page / total_pages).
 * Renders nothing when totalPages <= 1.
 */
const Pagination = ({ currentPage, totalPages, onPageChange, isLoading, className }) => {
  if (totalPages <= 1) {
    return null;
  }

  const canGoPrev = currentPage > 1 && !isLoading;
  const canGoNext = currentPage < totalPages && !isLoading;

  return (
    <FlexBox className={cn("items-center justify-center gap-16", className)}>
      <Button
        variant='outline'
        size='small'
        shape='circle'
        disabled={!canGoPrev}
        aria-label='Previous page'
        onClick={() => canGoPrev && onPageChange(currentPage - 1)}>
        <ChevronLeft size={18} />
      </Button>

      <P weight='bold' className='min-w-[7rem] text-center text-neutral-400'>
        Page {currentPage} of {totalPages}
      </P>

      <Button
        variant='outline'
        size='small'
        shape='circle'
        disabled={!canGoNext}
        aria-label='Next page'
        onClick={() => canGoNext && onPageChange(currentPage + 1)}>
        <ChevronRight size={18} />
      </Button>
    </FlexBox>
  );
};

export default Pagination;
