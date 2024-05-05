"use client"
import { useTranslations } from "next-intl"

const GridSelector = ({ grid, handleSelect, selected }) => {
  const t = useTranslations()

  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-3 gap-4">
        {grid &&
          grid.map((item) => {
            const isSelected = Array.isArray(selected)
              ? selected.includes(item.name)
              : selected === item.name

            return (
              <div
                key={item.id}
                className={`text-center border rounded-lg p-4 cursor-pointer  transition ease-in-out active:scale-90 active:after:delay-1000 active:after:duration-700 hover:shadow-md 
          ${
            isSelected
              ? "border-2 border-black bg-gray-200 shadow-md"
              : "border-2 border-gray-200 bg-white"
          }`}
                onClick={() => {
                  handleSelect(item.name)
                }}
              >
                <div
                  className={`transition-transform transform ${
                    isSelected ? "scale-125" : ""
                  }`}
                >
                  {item.icon}
                </div>
                <div className="mt-2 md:text-xl text-xs">
                  {item.translation ? t(item.translation) : item.name}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default GridSelector
