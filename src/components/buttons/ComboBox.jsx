/* eslint-disable max-lines-per-function */
import { Fragment } from "react"
import { Combobox, Transition } from "@headlessui/react"
import { ChevronUpDownIcon } from "@heroicons/react/20/solid"

const ComboBox = ({
  items,
  selectedItem,
  onChange,
  placeholder,
  disabled,
  styles,
  query,
  setQuery,
}) => {
  const filteredItems =
    query === ""
      ? items
      : items.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/gu, "")
            .includes(query.toLowerCase().replace(/\s+/gu, ""))
        )

  return (
    <div>
      <Combobox value={selectedItem} onChange={onChange} disabled={disabled}>
        <div className="relative">
          <div className={`${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
            <Combobox.Input
              className={styles}
              displayValue={(item) => item}
              onChange={(event) => setQuery(event.target.value)}
              disabled={disabled}
              placeholder={placeholder}
            />
            <Combobox.Button
              className="absolute inset-y-0 right-0 flex items-center pr-2"
              disabled={disabled}
            >
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options
              className={`absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-300 ${
                !filteredItems.length && query !== "" ? "hidden" : ""
              }`}
            >
              {filteredItems.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2">
                  Nothing found.
                </div>
              ) : (
                filteredItems.map((item) => (
                  <Combobox.Option
                    key={item}
                    className={({ active }) =>
                      `${
                        active ? "bg-blue-200" : "text-gray-900"
                      } cursor-default select-none relative px-4 py-2`
                    }
                    value={item}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item}
                        </span>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}

export default ComboBox
