import Link from "next/link";

const Breadcrumbs = ({ links }) => {
  return (
    <nav className='flex mb-4' aria-label='Breadcrumb'>
      <ol className='inline-flex items-center gap-2 flex-wrap'>
        {links?.map(({ href, label }, index) => (
          <li className='inline-flex items-baseline gap-2' key={index}>
            <Link href={href} passHref>
              <p
                className={`inline-flex items-center text-sm sm:text-base font-semibold hover:text-white transition-colors ${
                  index !== links?.length - 1
                    ? "text-neutral-200"
                    : "text-neutral-400 pointer-events-none"
                }`}>
                {label}
              </p>
            </Link>

            {index !== links?.length - 1 ? (
              <svg
                className='w-[0.65rem] md:w-3 aspect-square text-gray-400'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 6 10'>
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m1 9 4-4-4-4'
                />
              </svg>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
