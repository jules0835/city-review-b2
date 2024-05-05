"use client"

import React, { Fragment } from "react"
import Link from "next/link"
import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

// eslint-disable-next-line max-lines-per-function
const DropdownMenu = ({ title, options, icon, noChevron }) => (
  <Menu as="div" className="relative inline-block text-left">
    <div>
      <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        {icon || null}
        {title || null}
        {noChevron ? null : (
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        )}
      </Menu.Button>
    </div>

    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {/* eslint-disable-next-line max-lines-per-function */}
        {options.map((option, index) => (
          <div key={index} className="py-1">
            <Menu.Item>
              {({ active }) => (
                <>
                  {!option.href && !option.action ? (
                    <span
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm w-full text-left"
                      )}
                    >
                      {option.label}
                    </span>
                  ) : null}
                </>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <>
                  {option.href && !option.action ? (
                    <Link
                      href={option.href}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      <span>{option.label}</span>
                    </Link>
                  ) : (
                    !option.href &&
                    option.action && (
                      <button
                        onClick={option.action}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm w-full text-left"
                        )}
                      >
                        <span>{option.label}</span>
                      </button>
                    )
                  )}
                </>
              )}
            </Menu.Item>
          </div>
        ))}
      </Menu.Items>
    </Transition>
  </Menu>
)

export default DropdownMenu
