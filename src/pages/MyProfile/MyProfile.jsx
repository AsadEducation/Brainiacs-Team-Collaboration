import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const MyProfile = () => {
  const [summary, setSummary] = useState(null);
  const { currentUser } = useAuth();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    if (!currentUser?.email) return;

    // Step 1: Get profile summary
    axiosPublic
      .get(`/myProfile?email=${currentUser.email}`)
      .then((res) => {
        const data = res.data;
        setSummary(data);

        // Step 2: Optionally post it to save in DB
        return axiosPublic.post("/myProfile", data);
      })
      .catch((err) => console.error("Profile fetch error:", err));
  }, [currentUser?.email, axiosPublic]);

  if (!summary) return <p className="text-center">Loading...</p>;

  const {
    points,
    completedCount,
    currentBadge,
    nextBadge,
    progressToNext,
    badges,
  } = summary;

  return (
    <div className="px-4 py-6">
      <h2 className="text-3xl font-bold text-center text-secondary mb-10">
        My Profile
      </h2>

      <div className="bg-white border rounded-xl p-6 max-w-md mx-auto shadow-lg mb-10">
        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-2 items-center">
            <img
              className="w-10 h-10 rounded-full"
              src={currentUser.photoURL} // Use the imported default image
              alt={currentUser.displayName || "User"}
            />
            <span className="text-lg font-semibold">
              {" "}
              {currentUser?.displayName || "User"}
            </span>
          </div>
          <span className="text-lg font-semibold text-secondary">
            Points: {points}
          </span>
        </div>

        <div className="mb-2">
          <p className="text-gray-700 font-medium">
            Current Badge:
            {currentBadge ? (
              <span className="text-yellow-600 text-lg">
                {" "}
                🏅 {currentBadge.title}
              </span>
            ) : (
              <span className="text-gray-500"> None yet</span>
            )}
          </p>
        </div>

        {nextBadge && (
          <div className="mb-3">
            <p className="text-sm text-gray-500 mb-1">
              Progress to next badge ({nextBadge.title}):
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-secondary h-4 transition-all duration-500"
                style={{ width: `${progressToNext}%` }}
              ></div>
            </div>
            <p className="text-right text-xs mt-1 text-gray-600">
              {progressToNext}%
            </p>
          </div>
        )}

        <div className="flex justify-between text-sm text-gray-600 mt-4">
          <p>
            Tasks Completed:{" "}
            <span className="font-medium">{completedCount}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {badges.map((badge) => (
          <div
            key={badge._id}
            className={`border rounded-lg p-4 shadow-sm hover:shadow-lg transition-all ${
              points >= badge.pointsRequired ? "bg-green-100" : "bg-gray-100"
            }`}
          >
            <img
              src={badge.image}
              alt={badge.title}
              className="w-24 h-24 mx-auto mb-4"
            />
            <h4 className="text-xl font-semibold text-center">{badge.title}</h4>
            <p className="text-sm text-gray-600 text-center">
              {badge.description}
            </p>
            <p className="text-center text-sm mt-2">
              {points >= badge.pointsRequired ? (
                <span className="text-green-600 font-medium">Unlocked</span>
              ) : (
                <span className="text-red-500">
                  Need {badge.pointsRequired - points} more points
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProfile;
