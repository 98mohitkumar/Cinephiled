import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { PeopleTemplateGrid } from "components/Templates/PeopleTemplate";
import P from "components/UI/Typography/P";

const MediaCastGrid = ({ cast, totalCount = 0, showEpisodeCount = false }) => {
  const router = useRouter();
  const additionalGridItem =
    totalCount > 15 ? (
      <Link href={`${router.asPath}/cast`}>
        <div className='grid-center aspect-profile rounded-xl transition-all can-hover:bg-neutral-800'>
          <motion.div
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.1 }
            }}
            whileTap={{ scale: 0.9 }}
            className='grid-center gap-8'>
            <div className='grid-center aspect-square w-14 rounded-full border-4 border-neutral-500 bg-neutral-200 p-10'>
              <ChevronRight size={24} className='text-black' />
            </div>

            <P weight='bold' size='large'>
              Full Cast
            </P>
          </motion.div>
        </div>
      </Link>
    ) : null;

  return (
    <PeopleTemplateGrid items={cast} additionalGridItem={additionalGridItem}>
      {(person) => (
        <div className='mt-12'>
          <P tag='h6' weight='bold' className='line-clamp-2 text-pretty' title={person.character}>
            {person.character}
          </P>
          <P className='text-neutral-400' weight='medium' size='small'>
            {person.name}
          </P>
          {showEpisodeCount ? (
            <P className='text-neutral-400' size='small'>
              {person?.episode_count} episodes
            </P>
          ) : null}
        </div>
      )}
    </PeopleTemplateGrid>
  );
};

export default MediaCastGrid;
