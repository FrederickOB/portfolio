import React from "react";

const LinePercentage = ({ label, percentage }) => {
  //   const width = `w-[${percentage}]`;
  return (
    <div>
      <div className="flex items-end justify-between">
        <h4 className="font-semibold text-white uppercase">{label}</h4>
        <h3 className="text-4xl font-bold text-blue-400 ">{percentage}</h3>
      </div>
      <div className="w-full h-3 mt-2 bg-white rounded-full">
        <div
          style={{ width: percentage }}
          className={`h-3 bg-blue-400 rounded-full`}
        ></div>
      </div>
    </div>
  );
};

export default LinePercentage;
