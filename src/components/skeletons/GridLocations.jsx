const GridLocations = ({ gridFormat }) => (
  <div className="grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 xl:gap-x-4 animate-pulse">
    {Array.from({ length: gridFormat }).map((item, index) => (
      <div className="flex flex-col" key={index}>
        <div className="relative">
          <div className="sm:w-60 sm:h-60 lg:w-72 lg:h-72 2xl:w-80 2xl:h-80 w-48 h-48 md:w-52 md:h-52 rounded bg-gray-200">
            <div className="absolute inset-0 bg-gray-200 rounded"></div>
          </div>
          <div className="absolute top-0 left-0 py-2 px-4 m-2 bg-white rounded-full flex items-center">
            <div className="rounded bg-gray-200 p-3"></div>
            <div className="rounded bg-gray-200 py-2 px-8 ml-2"></div>
          </div>
          <div className="absolute top-0 right-0 p-2 m-3 bg-white rounded-full flex items-center">
            <div className="bg-gray-200 p-2 rounded-full"></div>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex justify-between items-center">
            <div className="rounded bg-gray-200 py-2 px-8 "></div>
            <div className="flex justify-between items-center">
              <div className="rounded bg-gray-200 py-2 px-4 ml-2"></div>
              <div className="bg-gray-200 p-2 rounded-full ml-2"></div>
            </div>
          </div>
          <div className="flex items-center font-semibold mt-2">
            <div className="rounded bg-gray-200 py-2 px-16 ml-2"></div>
            <div className="rounded bg-gray-200 py-2 px-20 ml-2"></div>
          </div>
          <div className="flex items-center font-semibold mt-2">
            <div className="rounded bg-gray-200 py-2 px-12 ml-2"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
)

export default GridLocations
