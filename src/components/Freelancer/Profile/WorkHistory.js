import React from "react";

const WorkHistory = () => {
  const jobs = [
    { title: "Website Development", status: "Completed" },
    { title: "Mobile App Design", status: "In Progress" },
  ];

  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h3 className="font-semibold mb-4">Job History</h3>
      {jobs.map((job, index) => (
        <div
          key={index}
          className="flex justify-between py-2 border-b last:border-none"
        >
          <p>{job.title}</p>
          <span
            className={`text-sm ${
              job.status === "Completed"
                ? "text-green-500"
                : "text-blue-500"
            }`}
          >
            {job.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default WorkHistory;
