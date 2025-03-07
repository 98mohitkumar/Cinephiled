import { Fragment } from "react";

import { LoadingSpinner } from "components/Loader/Loader";
import Input, { InputLabel } from "components/UI/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/UI/Select";
import P from "components/UI/Typography/P";
import { sortOptions } from "data/global";
import useGetListDetails from "hooks/useGetListDetails";
import { matches } from "utils/helper";

const ListBaseForm = ({ submitHandler, id, children }) => {
  const { error, listDetails: storedValues, loading } = useGetListDetails({ id });

  const { listOptions } = sortOptions;
  const defaultSortOption = listOptions.find((option) => option.isDefault);

  return (
    <Fragment>
      {error ? (
        <P className='text-red-500' weight='medium'>
          Something went wrong. Please try again later.
        </P>
      ) : (
        <Fragment>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <form onSubmit={submitHandler} className='flex flex-col gap-16'>
              <div>
                <InputLabel htmlFor='listName' required>
                  List Name
                </InputLabel>
                <Input
                  type='text'
                  name='name'
                  id='listName'
                  placeholder="e.g. 'My Favorite Movies'"
                  defaultValue={storedValues?.name}
                  fullWidth
                  required
                />
              </div>

              <div>
                <InputLabel htmlFor='listDescription'>Description</InputLabel>
                <textarea
                  rows={3}
                  name='description'
                  id='listDescription'
                  defaultValue={storedValues?.description}
                  placeholder="e.g. 'My favorite movies of all time'"
                  className='block w-full rounded-lg border border-neutral-500 bg-neutral-700 px-12 py-8 text-p 
                  text-white placeholder-neutral-400'
                />
              </div>

              <div>
                <InputLabel required>Select List Type</InputLabel>
                <Select
                  defaultValue={matches(storedValues?.public, undefined) ? "true" : matches(storedValues?.public, false) ? "false" : "true"}
                  name='public'
                  id='publicList'
                  required>
                  <SelectTrigger>
                    <SelectValue placeholder='Public' />
                  </SelectTrigger>
                  <SelectContent position='popper' align='end'>
                    <SelectItem value='true'>Public</SelectItem>
                    <SelectItem value='false'>Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='mb-8'>
                <InputLabel required>Sort By</InputLabel>
                <Select defaultValue={storedValues?.sort_by || defaultSortOption.value} name='sort_by' id='sortBy' required>
                  <SelectTrigger>
                    <SelectValue placeholder={defaultSortOption.name} />
                  </SelectTrigger>
                  <SelectContent position='popper' align='end'>
                    {listOptions.map(({ name, value }) => (
                      <SelectItem key={value} value={value}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {children}
            </form>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ListBaseForm;
