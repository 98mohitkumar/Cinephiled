import { ListFilter } from "lucide-react";
import { useState } from "react";

import { Drawer, DrawerContent, DrawerFooter, DrawerTrigger } from "components/Shared/Drawer";
import Button from "components/UI/Button";

import FilterPanel, { FilterPanelProps } from "./FilterPanel";

const MobileFilter = (props: Omit<FilterPanelProps, "isMobile" | "className">) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <Drawer open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
      <DrawerTrigger asChild>
        <Button variant='outline' size='large' className='flex items-center gap-6 drop-shadow-2xl' onClick={() => setDrawerOpen(true)}>
          <ListFilter size={18} />
          Filters
        </Button>
      </DrawerTrigger>

      <DrawerContent className='min-h-96'>
        <div className='mx-auto w-full max-w-screen-sm'>
          <DrawerFooter>
            <FilterPanel {...props} isMobile />
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileFilter;
