import React from "react";

const activities = [
  {
    date: "Apr 27",
    events: [
      {
        user: "Neville Griffin",
        action: "assigned task",
        task: "Prepare questionnaire",
        assignee: "Jennifer Grey",
        time: "11:43 am",
      },
      {
        user: "Jennifer Grey",
        action: "changed status of",
        task: "Heuristic evaluation",
        status: "DONE",
        time: "11:43 am",
      },
      {
        user: "Meysam Nassour",
        action: "changed status of",
        task: "Create Wireframes",
        status: "STUCK",
        time: "9:20 am",
      },
    ],
  },
  {
    date: "Apr 24",
    events: [
      {
        user: "Alex Tenorio",
        action: "changed status of",
        task: "Design a database",
        status: "REVIEW",
        time: "5:31 pm",
      },
      {
        user: "Neville Griffin",
        action: "assigned task",
        task: "Home page design",
        assignee: "Meysam Nassour",
        time: "12:03 pm",
      },
    ],
  },
];

const ActivityLog = () => {
  return (
    <div className="max-w-xl mx-auto p-4">
      {activities.map((activity, index) => (
        <div key={index}>
          <h3 className="text-gray-500 font-semibold my-4">{activity.date}</h3>
          <div className="border-l-2 border-gray-300 pl-4">
            {activity.events.map((event, idx) => (
              <div key={idx} className="mb-4 p-3 bg-white shadow rounded-lg">
                <p className="text-gray-700 font-medium">{event.user} {event.action}</p>
                <p className="text-gray-500">
                  <span className="font-semibold">{event.task}</span>
                  {event.assignee && <> to <span className="font-semibold">{event.assignee}</span></>}
                  {event.status && <> - <span className="font-bold text-green-500">{event.status}</span></>}
                </p>
                <p className="text-xs text-gray-400">{event.time}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityLog;
