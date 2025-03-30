import PropTypes from "prop-types";

function ProgressBar({
  progress,
  progressColor = "bg-blue-500",
  startDate,
  endDate,
}) {
  return (
    <div className="progress">
      <div className="w-full bg-gray-200 rounded-full h-6 mt-2">
        <div
          className={`${progressColor} h-full rounded-full text-white text-xs flex items-center justify-center`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        >
          {progress.toFixed(2)}%
        </div>
      </div>

      {(startDate || endDate) && (
        <div className="text-sm text-gray-500 flex justify-center mt-2">
          <span>{startDate}</span>
          <span>{endDate}</span>
        </div>
      )}
    </div>
  );
}
// Khai báo kiểu của props
ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  progressColor: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};

export default ProgressBar;
