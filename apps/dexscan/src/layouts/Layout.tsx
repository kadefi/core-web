import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowTopRightOnSquareIcon,
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
  WalletIcon,
} from "@heroicons/react/20/solid";
import { HeartIcon, HomeIcon, XMarkIcon } from "@heroicons/react/24/outline";
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
import { BrowserUtil, LogoImg } from "ui";

import { trackEvent } from "../analytics/Analytics.util";
import DexScanLogo from "../assets/pngs/logos/dex-scan-logo.png";
import { SearchModal } from "../components/SearchModal";
import { AmplitudeEvent } from "../enums";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Support Us", href: "/donate", icon: HeartIcon },
  {
    name: "Portfolio",
    href: "https://kadefi.money",
    icon: WalletIcon,
    isExternalLink: true,
    track: () => {
      trackEvent(AmplitudeEvent.KadefiMoneyNavigate);
    },
  },
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
    <div className="flex w-full items-center justify-between md:justify-start md:gap-1">
      <LogoImg src={DexScanLogo} size="xl" className="md:ml-1 md:h-9 md:w-9" />
      <div
        className="flex flex-col items-start md:ml-2"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        <div className="text-3xl font-bold md:text-2xl">
          <span className="text-slate-300">DEX</span>
          <span className="text-teal-500">Scan</span>
        </div>
        <div className="self-end whitespace-nowrap text-sm text-slate-400 md:self-start md:text-xs">
          by kadefi.money
        </div>
      </div>
    </div>
  );

  const getNavMenuItems = () =>
    navigation.map((item) => {
      const navMenu = (
        <div
          className={clsx(
            router.pathname === item.href
              ? "bg-slate-100 text-slate-900"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
            "group mb-3 flex cursor-pointer items-center rounded-md px-2 py-2 text-sm font-medium transition"
          )}
        >
          <item.icon
            className={clsx(
              router.pathname === item.href
                ? "text-slate-500"
                : "text-slate-400 group-hover:text-slate-500",
              "mr-4 h-6 w-6 flex-shrink-0"
            )}
            aria-hidden="true"
          />
          <div className="truncate">{item.name}</div>
          {item.isExternalLink && (
            <ArrowTopRightOnSquareIcon className="ml-2 h-4 w-4" />
          )}
        </div>
      );

      if (item.isExternalLink) {
        return (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            onClick={() => item.track && item.track()}
          >
            {navMenu}
          </a>
        );
      }

      return (
        <Link key={item.name} href={item.href}>
          {navMenu}
        </Link>
      );
    });

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
          <div className="fixed inset-0 bg-slate-600 bg-opacity-20 backdrop-blur" />
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
                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 shadow focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white"
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
                <nav className="px-2">{getNavMenuItems()}</nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
          <div className="w-14 flex-shrink-0 transition" aria-hidden="true" />
        </div>
      </Dialog>
    </Transition.Root>
  );

  const mobileSideBarToggle = (
    <button
      type="button"
      className="border border-slate-800 px-3 text-slate-500 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white md:hidden md:px-4"
      onClick={() => setSidebarOpen(true)}
    >
      <span className="sr-only">Open sidebar</span>
      <Bars3BottomLeftIcon className="h-5 md:w-5" aria-hidden="true" />
    </button>
  );

  const desktopSideBar = (
    <div className="z-20 hidden transition-all md:fixed md:absolute md:inset-y-0 md:flex md:w-14 md:flex-col hover:md:w-52">
      <div className="flex flex-grow flex-col overflow-y-auto border-r border-slate-800 bg-slate-900 pt-3 md:overflow-x-hidden md:pt-2">
        <div className="flex w-52 flex-shrink-0 items-center px-2 text-slate-50">
          {logo}
        </div>
        <div className="mt-4 flex flex-grow flex-col">
          <nav className="flex-1 px-2 pb-4">{getNavMenuItems()}</nav>
        </div>
      </div>
    </div>
  );

  const handleSearchBarClick = () => {
    setIsSearchModalOpen(true);
    BrowserUtil.focusInput(inputRef);
  };

  const searchBar = (
    <div
      className="flex flex-1 cursor-text items-center justify-between text-slate-500"
      onClick={handleSearchBarClick}
    >
      <div className="flex items-center">
        <MagnifyingGlassIcon className="mr-2 h-5 w-5 md:h-6 md:w-6" />
        <div>
          Search token pair <span className="hidden sm:inline">by symbol</span>
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
        <div className="sticky top-0 z-10 flex h-11 flex-shrink-0 bg-slate-900 shadow md:h-14">
          <div className="flex flex-1 justify-between border-y border-slate-800 px-3 text-sm md:px-6">
            {searchBar}
          </div>
          {mobileSideBarToggle}
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
