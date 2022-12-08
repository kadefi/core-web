import { Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  Bars3BottomLeftIcon,
  HeartIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Fragment,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { LogoImg } from "ui";

import DexScanLogo from "../assets/pngs/logos/dex-scan-logo.png";
import { SearchModal } from "../components/SearchModal";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Support Us", href: "/donate", icon: HeartIcon },
];

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  const { children } = props;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    function handleShortcut(e: KeyboardEvent) {
      if (e.key.toLowerCase() == "/") {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    }

    document.addEventListener("keydown", handleShortcut);

    return () => {
      document.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  const logo = (
    <div className="flex w-full items-center justify-between md:justify-start">
      <LogoImg src={DexScanLogo} size="xl" className="md:ml-1 md:h-9 md:w-9" />
      <div className="flex flex-col items-start md:ml-2">
        <div className="text-3xl font-bold text-teal-400 md:text-2xl">
          DEXSCAN
        </div>
        <div className="self-end whitespace-nowrap text-sm md:self-start md:text-xs">
          by Kadefi.Money
        </div>
      </div>
    </div>
  );

  const mobileSideBar = (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 md:hidden"
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
          <div className="fixed inset-0 bg-gray-600 bg-opacity-20" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-slate-900 pt-5 pb-4">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
              <div className="flex w-full flex-shrink-0 items-center px-4 text-slate-50">
                {logo}
              </div>
              <div className="mt-5 h-0 flex-1 overflow-y-auto">
                <nav className="space-y-1 px-2">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <div
                        onClick={() => setSidebarOpen(false)}
                        className={clsx(
                          router.pathname === item.href
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "group flex cursor-pointer items-center rounded-md px-2 py-2 text-base font-medium"
                        )}
                      >
                        <item.icon
                          className={clsx(
                            router.pathname === item.href
                              ? "text-gray-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "mr-4 h-6 w-6 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </div>
                    </Link>
                  ))}
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
          <div className="w-14 flex-shrink-0" aria-hidden="true" />
        </div>
      </Dialog>
    </Transition.Root>
  );

  const mobileSideBarToggle = (
    <button
      type="button"
      className="border border-slate-800 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
      onClick={() => setSidebarOpen(true)}
    >
      <span className="sr-only">Open sidebar</span>
      <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  );

  const desktopSideBar = (
    <div className="z-20 hidden transition-all md:fixed md:absolute md:inset-y-0 md:flex md:w-14 md:flex-col hover:md:w-52">
      <div className="flex flex-grow flex-col overflow-y-auto border-r border-slate-800 bg-slate-900 pt-3 md:overflow-x-hidden md:pt-2">
        <div className="flex w-52 flex-shrink-0 items-center px-2 text-slate-50">
          {logo}
        </div>
        <div className="mt-4 flex flex-grow flex-col">
          <nav className="flex-1 space-y-1 px-2 pb-4">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <div
                  className={clsx(
                    router.pathname === item.href
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group mb-2 flex cursor-pointer items-center rounded-md px-2 py-2 text-sm font-medium transition"
                  )}
                >
                  <item.icon
                    className={clsx(
                      router.pathname === item.href
                        ? "text-gray-500"
                        : "text-gray-400 group-hover:text-gray-500",
                      "mr-4 h-6 w-6 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                  <div className="truncate">{item.name}</div>
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );

  const handleSearchBarClick = () => {
    setIsSearchModalOpen(true);

    const fakeInput = document.createElement("input");

    fakeInput.setAttribute("type", "text");
    fakeInput.style.position = "absolute";
    fakeInput.style.opacity = "0";
    fakeInput.style.height = "0";
    fakeInput.style.fontSize = "16px"; // disable auto zoom
    document.body.prepend(fakeInput);

    fakeInput.focus();

    setTimeout(() => {
      inputRef.current?.focus();
      fakeInput.remove();
    }, 1000);
  };

  const searchBar = (
    <div
      className="flex flex-1 cursor-text items-center justify-between text-slate-500"
      onClick={handleSearchBarClick}
    >
      <div className="flex items-center">
        <MagnifyingGlassIcon className="mr-2 h-6 w-6" />
        <div>
          Search trading pair{" "}
          <span className="hidden sm:inline">by symbol, token</span>
        </div>
      </div>
      <div className="hidden items-center font-sans text-sm font-medium text-slate-500 md:inline-flex">
        Press
        <kbd className="ml-1 rounded bg-slate-800 px-2 text-slate-400">/</kbd>
      </div>
    </div>
  );

  return (
    <div className="fixed-body">
      {mobileSideBar}
      {desktopSideBar}
      <div className="flex h-full flex-1 flex-col md:pl-14">
        <div className="sticky top-0 z-10 flex h-14 flex-shrink-0 bg-slate-900 shadow">
          {mobileSideBarToggle}
          <div className="flex flex-1 justify-between border-y border-slate-800 px-6">
            {searchBar}
          </div>
        </div>
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
      <SearchModal
        isOpen={isSearchModalOpen}
        setIsOpen={setIsSearchModalOpen}
        inputRef={inputRef}
      />
    </div>
  );
};

export const getPageLayout = (page: ReactElement) => <Layout>{page}</Layout>;
