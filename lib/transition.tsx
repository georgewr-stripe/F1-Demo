import * as React from "react";
import { Transition } from "@headlessui/react";

const SectionTransition = ({
  show,
  children,
}: {
  show: boolean;
  children: any;
}) => {
  return (
    <div className="bg-darkGreen">
      <Transition
        show={show}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-1000"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {children}
      </Transition>
    </div>
  );
};

export default SectionTransition;
