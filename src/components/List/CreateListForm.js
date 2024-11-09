import { Fragment } from "react";
import useGetListDetails from "./useGetListDetails";
import Loading from "components/Loading";
import { sortOptions } from "globals/constants";

const CreateListForm = ({ submitHandler, id, children }) => {
  const { error, listDetails: storedValues, loading } = useGetListDetails({ id });

  const { listOptions } = sortOptions;

  return (
    <Fragment>
      {error ? (
        <div className='text-lg font-medium text-red-600'>Something went wrong. Please try again later.</div>
      ) : (
        <Fragment>
          {loading ? (
            <Loading />
          ) : (
            <form onSubmit={submitHandler}>
              <div className='mb-5'>
                <label htmlFor='listName' className='text-base mb-2 block font-medium text-neutral-200'>
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  id='listName'
                  required
                  defaultValue={storedValues?.name}
                  placeholder="e.g. 'My Favorite Movies'"
                  className='text-base p-2.5 block w-full rounded-lg border border-neutral-500 bg-neutral-700
         text-white placeholder-neutral-400 focus:border'
                />
              </div>

              <div className='mb-5'>
                <label htmlFor='listDescription' className='text-base mb-2 block font-medium text-neutral-200'>
                  Description
                </label>
                <textarea
                  type='text'
                  rows={4}
                  name='description'
                  id='listDescription'
                  defaultValue={storedValues?.description}
                  placeholder="e.g. 'My favorite movies of all time'"
                  className='text-base p-2.5 block w-full rounded-lg border border-neutral-500 bg-neutral-700
         text-white placeholder-neutral-400'
                />
              </div>

              <div className='mb-5'>
                <label htmlFor='publicList' className='text-base mb-2 block font-medium text-neutral-200'>
                  Public List?
                </label>
                <select
                  id='publicList'
                  name='public'
                  defaultValue={storedValues?.public}
                  className='text-base p-2.5 block w-full rounded-lg border border-neutral-500 bg-neutral-700
         text-white placeholder-neutral-400'>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>

              <div className='mb-5'>
                <label htmlFor='sortBy' className='text-base mb-2 block font-medium text-neutral-200'>
                  Sort By
                </label>
                <select
                  id='sortBy'
                  name='sort_by'
                  defaultValue={storedValues?.sort_by}
                  className='text-base p-2.5 block w-full rounded-lg border border-neutral-500 bg-neutral-700
         text-white placeholder-neutral-400'>
                  {listOptions.map(({ name, value }) => (
                    <option key={value} value={value}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              {children}
            </form>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default CreateListForm;
