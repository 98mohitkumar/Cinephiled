import Loading from "components/Loading";
import { sortOptions } from "globals/constants";
import { Fragment } from "react";
import useGetListDetails from "./useGetListDetails";

const CreateListForm = ({ submitHandler, id, children }) => {
  const { error, listDetails: storedValues, loading } = useGetListDetails({ id });

  const { listOptions } = sortOptions;

  return (
    <Fragment>
      {error ? (
        <div className='text-lg font-medium text-red-600'>
          Something went wrong. Please try again later.
        </div>
      ) : (
        <Fragment>
          {loading ? (
            <Loading />
          ) : (
            <form onSubmit={submitHandler}>
              <div className='mb-5'>
                <label
                  htmlFor='listName'
                  className='block mb-2 text-base font-medium text-neutral-200'>
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  id='listName'
                  required
                  defaultValue={storedValues?.name}
                  placeholder="e.g. 'My Favorite Movies'"
                  className='border text-base rounded-lg block w-full p-2.5 bg-neutral-700 border-neutral-500
         placeholder-neutral-400 text-white focus:border'
                />
              </div>

              <div className='mb-5'>
                <label
                  htmlFor='listDescription'
                  className='block mb-2 text-base font-medium text-neutral-200'>
                  Description
                </label>
                <textarea
                  type='text'
                  rows={4}
                  name='description'
                  id='listDescription'
                  defaultValue={storedValues?.description}
                  placeholder="e.g. 'My favorite movies of all time'"
                  className='border text-base rounded-lg block w-full p-2.5 bg-neutral-700 border-neutral-500
         placeholder-neutral-400 text-white'
                />
              </div>

              <div className='mb-5'>
                <label
                  htmlFor='publicList'
                  className='block mb-2 text-base font-medium text-neutral-200'>
                  Public List?
                </label>
                <select
                  id='publicList'
                  name='public'
                  defaultValue={storedValues?.public}
                  className='border text-base rounded-lg block w-full p-2.5 bg-neutral-700 border-neutral-500
         placeholder-neutral-400 text-white'>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>

              <div className='mb-5'>
                <label
                  htmlFor='sortBy'
                  className='block mb-2 text-base font-medium text-neutral-200'>
                  Sort By
                </label>
                <select
                  id='sortBy'
                  name='sort_by'
                  defaultValue={storedValues?.sort_by}
                  className='border text-base rounded-lg block w-full p-2.5 bg-neutral-700 border-neutral-500
         placeholder-neutral-400 text-white'>
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
