import { Fragment } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/UI/Select";
import { cn } from "utils/helper";

const MediaFilters = ({ sortBy, handleSortSelection, localOptions, department, handleFilterSelection, departmentList, className }) => {
  return (
    <Fragment>
      <Select value={sortBy} onValueChange={handleSortSelection}>
        <SelectTrigger className={cn("w-fit min-w-[250px]", className)}>
          <SelectValue placeholder='Sort By:' />
        </SelectTrigger>
        <SelectContent position='popper' align='end'>
          {localOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={department} onValueChange={handleFilterSelection}>
        <SelectTrigger className={cn("w-fit min-w-[250px]", className)}>
          <SelectValue placeholder='Filter By Department' />
        </SelectTrigger>
        <SelectContent position='popper' align='end'>
          {departmentList.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Fragment>
  );
};

export default MediaFilters;
