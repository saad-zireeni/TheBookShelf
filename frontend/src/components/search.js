import { useState } from "react";
import { Combobox, Transition } from "@headlessui/react";

const SearchBar = ({ products, searchProductsHandler }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex justify-end pr-4">
      <div className="w-72">
        <Combobox>
          <div className="relative">
            <div className="relative w-full overflow-hidden text-left rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 sm:text-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <Combobox.Input
                className="border text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-100"
                onChange={(event) => searchProductsHandler(event.target.value)}
              />
            </div>
            <Transition
              as="div"
              enter="transition ease-in duration-100"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-out duration-75"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Combobox.Options className="absolute w-full mt-1 overflow-auto text-base bg-gray-100 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                {products.length === 0 && searchTerm !== "" ? (
                  <div className="px-4 py-2 text-gray-900 cursor-default select-none">
                    Nothing found.
                  </div>
                ) : null}

                {/* (
                  searchProductsHandler(searchTerm).map((product) => (
                    <Combobox.Option
                      key={product.id}
                      className={({ active }) =>
                        `relative flex h-20 items-center text-gray-900 cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-gray-200" : "bg-white"
                        }`
                      }
                      value={product}
                    >
                      {({ selected }) => (
                        <>
                          <img
                            src={product.imgUrl}
                            alt={product.title}
                            className="w-12 h-16 mr-4"
                          />
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {product.title}
                          </span>
                        </>
                      )}
                    </Combobox.Option>
                  ))
                ) */}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    </div>
  );
};

export default SearchBar;
