"use client";
import { useState } from "react";
import { SkeletonCircle } from "@chakra-ui/react";
import { UserButton, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../public/logo.png";
import Image from "next/image";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Payee", href: "/payee" },
  { name: "Account", href: "/account" },
];

const  Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-royalblue-800 text-royalblue-200 z-10">
        <div
          className=" mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5 flex gap-2">
              <span className="sr-only">Money Tracker</span>
              <Image className="h-10 w-auto" src={logo} alt="" />
              <div className="text-2xl logo font-bold pt-1">Money Tracker</div>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                className="h-6 w-6 text-royalblue-200 font-bold hover:text-royalblue-500"
                aria-hidden="true"
              />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm hover:text-base font-semibold leading-6"
              >
                {item.name}
              </a>
            ))}
            <ClerkLoading>
              <SkeletonCircle size="7" />
            </ClerkLoading>
            <ClerkLoaded>
              <UserButton />
            </ClerkLoaded>
          </div>
        </div>

        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        >
          <div className="fixed inset-0" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-40 w-full overflow-y-auto bg-darkbg px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-royalblue-950">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Money Tracker</span>
                <div className=" text-2xl logo font-bold text-royalblue-200">
                  Money Tracker
                </div>
                {/* <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              /> */}
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-royalblue-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-royalblue-50">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-royalblue-100 hover:bg-royalblue-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                  <UserButton />
                </div>
                {/* <div className="py-6">
                  <Link
                    to="/admin"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Admin Login
                  </Link>
                </div> */}
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
    </>
  );
}

export default Nav;