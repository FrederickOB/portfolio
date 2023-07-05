import { Dialog, Transition } from "@headlessui/react";

import Image from "next/image";
import { Fragment } from "react";

interface ModalInterface {
  image?: string;
  heading: string;
  children: string | JSX.Element | JSX.Element[];
  openModal?: () => void;
  closeModal: () => void;
  isOpen: boolean;
  width?: string;
}

export default function Modal({
  image,
  heading,
  children,
  openModal,
  closeModal,
  isOpen,
  width = "max-w-md",

  ...props
}: ModalInterface) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto font-Montserrat">
          <div className="flex items-center justify-center min-h-full px-4 pt-4 text-center pb-14 md:p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom=" translate-y-[20rem] opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full ${width} p-6 space-y-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl`}
              >
                <div className="relative -z-10">
                  {image ? (
                    <Image
                      src={image}
                      alt="alt"
                      height={1921}
                      width={1281}
                      className="bg-gray-100 rounded-xl aspect-square"
                      quality={100}
                    />
                  ) : null}
                </div>

                <Dialog.Title
                  as="div"
                  className="flex items-center w-full text-gray-900 "
                >
                  <h3
                    className={`w-full text-2xl font-medium leading-6  text-center`}
                  >
                    {heading}
                  </h3>
                </Dialog.Title>

                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
