import { ComponentProps, ComponentPropsWithRef, HTMLAttributes } from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "utils/helper";

const Drawer = ({ shouldScaleBackground = true, ...props }: ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

// Drawer Overlay
const DrawerOverlay = ({ className, ref, ...props }: ComponentPropsWithRef<typeof DrawerPrimitive.Overlay>) => (
  <DrawerPrimitive.Overlay ref={ref} className={cn("fixed inset-0 z-50 bg-black/80", className)} {...props} />
);
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

// Drawer Content
const DrawerContent = ({ className, children, ref, ...props }: ComponentPropsWithRef<typeof DrawerPrimitive.Content>) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn("fixed inset-x-[1px] bottom-0 z-modal mt-96 flex h-auto flex-col rounded-t-2xl border border-neutral-700 bg-black", className)}
      {...props}>
      <div className='mx-auto mt-16 h-1.5 w-[100px] rounded-full bg-neutral-700' />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
);
DrawerContent.displayName = "DrawerContent";

// Drawer Header
const DrawerHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid gap-6 p-16 text-center sm:text-left", className)} {...props} />
);
DrawerHeader.displayName = "DrawerHeader";

// Drawer Footer
const DrawerFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-auto flex flex-col gap-8 p-16", className)} {...props} />
);
DrawerFooter.displayName = "DrawerFooter";

// Drawer Title
const DrawerTitle = ({ className, ref, ...props }: ComponentPropsWithRef<typeof DrawerPrimitive.Title>) => (
  <DrawerPrimitive.Title ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
);
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

// Drawer Description
const DrawerDescription = ({ className, ref, ...props }: ComponentPropsWithRef<typeof DrawerPrimitive.Description>) => (
  <DrawerPrimitive.Description ref={ref} className={cn("text-sm text-neutral-500", className)} {...props} />
);
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export { Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription };
