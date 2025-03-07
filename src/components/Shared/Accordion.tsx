import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import * as React from "react";

import { cn } from "utils/helper";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = ({ className, ref, ...props }: React.ComponentPropsWithRef<typeof AccordionPrimitive.Item>) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
);

const AccordionTrigger = ({ className, children, ref, ...props }: React.ComponentPropsWithRef<typeof AccordionPrimitive.Trigger>) => (
  <AccordionPrimitive.Header className='flex'>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex items-center justify-between py-16 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}>
      {children}
      <ChevronDown size={20} className='transition-transform duration-200' />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

const AccordionContent = ({ className, children, ref, ...props }: React.ComponentPropsWithRef<typeof AccordionPrimitive.Content>) => (
  <AccordionPrimitive.Content
    ref={ref}
    className='text-sm overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
    {...props}>
    <div className={cn("pb-16 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
);

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
