import Link from "next/link";

const Breadcrumbs = ({ links }) => {
  return (
    <nav className='mb-4 flex' aria-label='Breadcrumb'>
      <ol className='inline-flex flex-wrap items-center gap-2'>
        {links?.map(({ href, label }, index) => (
          <li className='inline-flex items-baseline gap-2' key={index}>
            <Link href={href} passHref>
              <p
                className={`text-sm sm:text-base inline-flex items-center font-semibold transition-colors hover:text-white ${
                  index !== links?.length - 1 ? "text-neutral-200" : "pointer-events-none text-neutral-400"
                }`}>
                {label}
              </p>
            </Link>

            {index !== links?.length - 1 ? (
              <svg
                className='text-gray-400 aspect-square w-[0.65rem] md:w-3'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 6 10'>
                <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 9 4-4-4-4' />
              </svg>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
