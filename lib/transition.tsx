import * as React from "react";
import { Transition } from "@headlessui/react";

const SectionTransition = ({
  show,
  children,
  className
}: {
  show: boolean;
  children: any;
  className?: string
}) => {
  return (
      <Transition
        show={show}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-1000"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className={className}
      >
        {children}
      </Transition>
  );
};

export default SectionTransition;
