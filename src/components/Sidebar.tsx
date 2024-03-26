"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import {
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { usePathname } from "next/navigation";
import { logout } from "@/actions/auth";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
    current: true,
  },
  { name: "Users", href: "/users", icon: UsersIcon, current: false },
  { name: "Novels", href: "/novels", icon: FolderIcon, current: false },
  { name: "Comics", href: "/comics", icon: CalendarIcon, current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Dynamically update the `current` field based on the current pathname
  const updatedNavigation = navigation.map((item) => ({
    ...item,
    current: pathname === item.href,
  }));

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}

      <div className="h-full">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-slate-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Pinya Logo"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-slate-50 text-ube-300"
                                      : "text-slate-600 hover:text-ube-300 hover:bg-slate-50",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? "text-ube-300"
                                        : "text-slate-400 group-hover:text-ube-300",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>

                        <li className="mt-auto">
                          <a
                            href="#"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-slate-600 hover:bg-slate-50 hover:text-ube-300"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-slate-400 group-hover:text-ube-300"
                              aria-hidden="true"
                            />
                            Log Out
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="flex h-full w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-slate-200 bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M35.8522 0H4.14777C1.85702 0 0 1.85702 0 4.14777V35.8522C0 38.143 1.85702 40 4.14777 40H35.8522C38.143 40 40 38.143 40 35.8522V4.14777C40 1.85702 38.143 0 35.8522 0Z"
                  fill="#231F44"
                />
                <path
                  d="M28.9906 15.5726C28.9906 18.4234 26.2343 21.0608 22.5693 21.8365C20.9216 22.1856 19.2495 22.3649 17.5837 22.0498C16.8325 21.9093 16.8264 22.2389 16.778 22.5783C16.6386 23.5334 16.5478 24.4884 16.4327 25.4435C16.3297 26.3405 16.2509 27.2374 16.1056 28.1294C15.8694 29.5548 13.8642 30.4033 12.2164 29.807C11.3259 29.4821 10.9079 28.7791 11.017 27.9791C11.2835 26.0738 11.5016 24.1636 11.75 22.2535C12.0286 20.0863 12.3134 17.9192 12.6041 15.7521C12.7435 14.7194 12.804 13.677 13.0948 12.6637C13.7672 10.3366 15.2393 9.32333 18.2318 9.04214C22.1513 8.66882 27.0218 10.8263 28.4453 13.5122C28.8149 14.2055 29.0511 14.9132 28.9906 15.5726ZM19.5707 18.1034C20.7882 18.1034 21.7635 17.9143 22.5996 17.5119C24.2291 16.7313 24.4351 15.3544 23.1024 14.2927C22.0968 13.4976 20.861 13.1001 19.4919 12.94C18.5166 12.8238 17.9108 13.2115 17.8078 14.0019C17.6745 15.0539 17.6201 16.1108 17.4807 17.1629C17.408 17.7349 17.5898 18.0112 18.3772 18.0258C18.7649 18.0355 19.1709 18.0986 19.5707 18.1034Z"
                  fill="white"
                />
              </svg>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {updatedNavigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-slate-50 text-ube-300"
                              : "text-slate-600 hover:text-ube-300 hover:bg-slate-50",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-ube-300"
                                : "text-slate-400 group-hover:text-ube-300",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <form action={logout}>
                    <button
                      disabled={status === "loading" ? true : false}
                      className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-strawberry-200  hover:bg-red-50 hover:text-strawberry-300"
                    >
                      <Cog6ToothIcon
                        className="h-6 w-6 shrink-0 text-strawberry-200 group-hover:text-strawberry-300"
                        aria-hidden="true"
                      />
                      Sign Out {status === "loading" ? "..." : ""}
                    </button>
                  </form>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
