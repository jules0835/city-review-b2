const ProgressBar = ({ progress }) => (
  <div className="w-full bg-gray-200 p-0.5 dark:bg-gray-700 rounded-full">
    <div
      className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-lg"
      style={{ width: `${progress}%` }}
    >
      {progress}%
    </div>
  </div>
)

export default ProgressBar
