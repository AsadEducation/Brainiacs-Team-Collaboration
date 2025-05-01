import React from "react";
import useActivity from "../../Hooks/useActivity";

// const activities = [
//   {
//     date: "Apr 27",
//     events: [
//       {
//         user: "Neville Griffin",
//         action: "assigned task",
//         task: "Prepare questionnaire",
//         assignee: "Jennifer Grey",
//         time: "11:43 am",
//       },
//       {
//         user: "Jennifer Grey",
//         action: "changed status of",
//         task: "Heuristic evaluation",
//         status: "DONE",
//         time: "11:43 am",
//       },
//       {
//         user: "Meysam Nassour",
//         action: "changed status of",
//         task: "Create Wireframes",
//         status: "STUCK",
//         time: "9:20 am",
//       },
//     ],
//   },
//   {
//     date: "Apr 24",
//     events: [
//       {
//         user: "Alex Tenorio",
//         action: "changed status of",
//         task: "Design a database",
//         status: "REVIEW",
//         time: "5:31 pm",
//       },
//       {
//         user: "Neville Griffin",
//         action: "assigned task",
//         task: "Home page design",
//         assignee: "Meysam Nassour",
//         time: "12:03 pm",
//       },
//     ],
//   },
// ];



const ActivityLog = () => {

  const { activities } = useActivity(); //console.log(activities);



  return (
    <div className="max-w-xl mx-auto p-4">

      {activities.map((activity, index) => (
        <div key={activity._id} className="mb-8">
          
          <div className="mb-4 p-3 bg-white shadow rounded-lg">
            <p className="text-gray-700 font-medium">
              {activity.message}
            </p>

          </div>
          {/* </div> */}
        </div>
      ))}
    </div>
  );
};

export default ActivityLog;
