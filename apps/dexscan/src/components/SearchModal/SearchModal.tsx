import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowSmallDownIcon,
  ArrowSmallUpIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  Dispatch,
  Fragment,
  KeyboardEvent as ReactKeyboardEvent,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { LogoImg, NumberUtil } from "ui";

import { useGetTradingPairs } from "../../api/TradingPair.queries";
import { TradingPairInfo } from "../../types/TradingPairTable.type";

const cleanStr = (s: string) => s.replace(" ", "").toLowerCase();

const getSelectionIndex = {
  ArrowUp: (idx: number, _maxIdx?: number) => Math.max(idx - 1, 0),
  ArrowDown: (idx: number, maxIdx: number) => Math.min(idx + 1, maxIdx),
};

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const SearchModal = (props: Props) => {
  const { isOpen, setIsOpen } = props;
  const router = useRouter();

  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>();

  const [currentIdx, setCurrentIdx] = useState(0);
  const selectionRefs = useRef([]);

  const { data: tradingPairs } = useGetTradingPairs();

  useEffect(() => {
    setCurrentIdx(0);
  }, [isOpen]);

  useEffect(() => {
    function handleShortcut(e: KeyboardEvent) {
      const isCtrlK = e.ctrlKey && e.key.toLowerCase() == "k";

      if (isCtrlK && inputRef && inputRef.current) {
        e.preventDefault();
        inputRef.current.focus();
        setCurrentIdx(0);
      }
    }

    document.addEventListener("keydown", handleShortcut);

    return () => {
      document.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  const filteredPairs = useMemo(
    () =>
      tradingPairs
        ? tradingPairs.filter((pair) => {
            const searchTarget = cleanStr(
              `${pair.id}/${pair.token0.name}/${pair.token1.name}`
            );
            const searchTerm = cleanStr(inputValue);

            return searchTarget.search(new RegExp(searchTerm, "i")) >= 0;
          })
        : [],
    [tradingPairs, inputValue]
  );

  const resultsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    resultsRef.current = resultsRef.current.slice(0, filteredPairs.length);
  }, [filteredPairs]);

  const navigate = (pair: TradingPairInfo) => {
    setIsOpen(false);

    router.push({
      pathname: "/pair",
      query: { id: pair.id, exchange: pair.exchange.name },
    });
  };

  const handleSearchResultMouseClick = (
    pair: TradingPairInfo,
    index: number
  ) => {
    setCurrentIdx(index);
    navigate(pair);
  };

  const handleKeyDown = (
    e: ReactKeyboardEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    if (!(filteredPairs.length > 0)) {
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const selectedIndex = Math.max(currentIdx, 0);
      const selectedPair = filteredPairs[selectedIndex];

      navigate(selectedPair);
    }

    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const newSelection = getSelectionIndex[e.key](
        currentIdx,
        filteredPairs.length - 1
      );

      selectionRefs.current[newSelection].focus();
      setCurrentIdx(newSelection);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setCurrentIdx(0);
  };

  const searchBar = (
    <div className="relative flex w-full max-w-2xl items-center justify-center">
      <MagnifyingGlassIcon className="absolute left-2 h-4 w-4 text-slate-500" />
      <input
        placeholder="Search pair by symbol, token"
        type="text"
        name="search"
        id="search"
        className="block w-full rounded-md border-gray-300 bg-slate-900 pr-12 pl-8 text-slate-50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        value={inputValue}
        onChange={handleInputChange}
        ref={inputRef}
      />
      <div className="absolute inset-y-0 right-0 flex hidden py-1.5 pr-1.5 md:block">
        <kbd className="inline-flex items-center rounded border border-slate-500 px-2 font-sans text-sm font-medium text-slate-500">
          CTRL + K
        </kbd>
      </div>
    </div>
  );

  const searchResults = () => {
    if (!tradingPairs) {
      return null;
    }

    return (
      <div className="flex w-full flex-col items-center overflow-y-auto text-sm text-slate-300">
        {filteredPairs.map((pair, i) => {
          const isFirstIdx = i === 0 && currentIdx === 0;
          const { id, token0, token1, exchange, price } = pair;

          const setButtonRef = (el: HTMLButtonElement) => {
            selectionRefs.current[i] = el;
          };

          return (
            <button
              key={`${id}-${exchange.name}`}
              className={clsx(
                "my-1 flex w-full items-center justify-between rounded-md bg-slate-800 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500",
                isFirstIdx && "outline-none ring-2 ring-inset ring-indigo-500"
              )}
              ref={(el) => setButtonRef(el)}
              onKeyDown={handleKeyDown}
              onClick={() => handleSearchResultMouseClick(pair, i)}
            >
              <div className="flex items-center">
                <LogoImg src={token0.img} size="xs" />
                <span className="ml-2 font-bold">{token0.name}</span>
                <span className="ml-1 text-slate-500">{`/ ${token1.name}`}</span>
                <span className="ml-1 text-slate-500"> - {exchange.name}</span>
              </div>
              <div>{NumberUtil.formatPrice(price)}</div>
            </button>
          );
        })}
      </div>
    );
  };

  const keyboardShortcutsHelper = (
    <div className="hidden items-center justify-end text-xs text-slate-400 md:flex">
      <ArrowSmallUpIcon className="h-6 w-6 rounded-md bg-slate-800 p-1" />
      <ArrowSmallDownIcon className="ml-1 h-6 w-6 rounded-md bg-slate-800 p-1" />
      <div className="ml-1">Navigate</div>
      <div className="ml-4 rounded-md bg-slate-800 px-2 py-1 text-xs">
        ENTER
      </div>
      <div className="ml-1">Select</div>
    </div>
  );

  return (
    <div>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-30"
          onClose={setIsOpen}
          onKeyDown={handleKeyDown}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-800 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-30 overflow-y-auto">
            <div className="flex h-full min-h-full items-start">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative flex h-full w-full transform flex-col items-center overflow-hidden rounded-lg bg-slate-900 px-4 pt-5 pb-4 text-left shadow-xl transition-all lg:h-[75%]">
                  <div className="mx-2 w-full max-w-2xl grow-0">
                    {searchBar}
                  </div>
                  <div className="mt-2 w-full max-w-2xl grow-0">
                    {keyboardShortcutsHelper}
                  </div>
                  <div className="grow-1 my-2 w-full max-w-2xl overflow-y-auto">
                    {searchResults()}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default SearchModal;
