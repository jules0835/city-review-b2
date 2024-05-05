const GridSelectorSkeleton = ({ gridFormat }) => (
  <div className="flex justify-center items-center animate-pulse">
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: gridFormat }).map((item, index) => (
        <div
          key={index}
          className="rounded-lg py-3 px-7 border-2 border-gray-200"
        >
          <div className="rounded bg-gray-200 p-7"></div>
          <div className="rounded bg-gray-200 py-2 px-10 mt-5"></div>
        </div>
      ))}
    </div>
  </div>
)

export default GridSelectorSkeleton
