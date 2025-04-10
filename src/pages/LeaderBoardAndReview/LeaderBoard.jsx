import React, { useEffect, useState } from 'react';

const LeaderBoard = () => {

    const [data, setData] = useState([])
    const [reward, setReward] = useState([])

    useEffect(() => {
        fetch('/leaderboard.json')
          .then(res => res.json())
          .then(data => setData(data))
          .catch(err => console.error(err));
      }, []);

    useEffect(() => {
        fetch('/reward.json')
          .then(res => res.json())
          .then(data => setReward(data))
          .catch(err => console.error(err));
      }, []);


      
      const currentPoints = 120; // This would be dynamic in real app

      // Find current badge
      const unlockedBadges = reward.filter(b => currentPoints >= b.pointsRequired);
      const lockedBadges = reward.filter(b => currentPoints < b.pointsRequired);
      
      const currentBadge = unlockedBadges[unlockedBadges.length - 1] || null;
      const nextBadge = lockedBadges[0] || null;
      
      const progressToNext = nextBadge
        ? Math.floor((currentPoints / nextBadge.pointsRequired) * 100)
        : 100;
      
      const tasksCompleted = 20;
      const tasksOnTime = 15;
      

    return (

        <div className=" px-4 py-10">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-10">🎉 Reward System</h2>
  
    
        {/* User Reward Summary  */}
<div className="bg-white border rounded-xl p-6 max-w-md mx-auto shadow-lg mb-10">
  <div className="flex justify-between items-center mb-2">
    <span className="text-lg font-semibold">👤 opu</span>
    <span className="text-lg font-semibold text-purple-700">Points: {currentPoints}</span>
  </div>

  <div className="mb-2">
    <p className="text-gray-700 font-medium">
      Current Badge:
      {currentBadge ? (
        <span className="text-yellow-600 text-lg"> 🏅 {currentBadge.title}</span>
      ) : (
        <span className="text-gray-500"> None yet</span>
      )}
    </p>
  </div>

  {/* Progress Bar */}
  {nextBadge && (
    <div className="mb-3">
      <p className="text-sm text-gray-500 mb-1">
        Progress to next badge ({nextBadge.title}):
      </p>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="bg-purple-500 h-4 transition-all duration-500"
          style={{ width: `${progressToNext}%` }}
        ></div>
      </div>
      <p className="text-right text-xs mt-1 text-gray-600">{progressToNext}%</p>
    </div>
  )}

  <div className="flex justify-between text-sm text-gray-600 mt-4">
    <p>Tasks Completed: <span className="font-medium">{tasksCompleted}</span></p>
    <p>On-time: <span className="font-medium">{tasksOnTime}</span></p>
  </div>
</div>

  
        {/* Badges Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reward.map((badge) => (
            <div key={badge.id}
             className={`border rounded-lg p-4 shadow-sm hover:shadow-lg transition-all ${currentPoints >= badge.pointsRequired ? 'bg-green-100' : 'bg-gray-100'}`}>

              <img src={badge.image} alt={badge.title} className="w-24 h-24 mx-auto mb-4" />

              <h4 className="text-xl font-semibold text-center">{badge.title}</h4>
              <p className="text-sm text-gray-600 text-center">{badge.description}</p>
              <p className="text-center text-sm mt-2">
                {currentPoints >= badge.pointsRequired ? (
                  <span className="text-green-600 font-medium">Unlocked</span>
                ) : (
                  <span className="text-red-500">Need {badge.pointsRequired - currentPoints} more points</span>
                )}
              </p>
            </div>
          ))}
        </div>

{/* leader board */}

        <div>
 <h2 className=" text-4xl font-bold text-center text-orange-600 my-8">

Leader Board

 </h2>

<div className="overflow-x-auto pt-10">
      <table className="sm:table-auto md:table lg:table w-full">
    
        <thead >
          <tr className='font-bold  sm:text-base md:text-lg lg:text-xl '>
          
            <th>Rank</th>
            <th>Image</th>
            <th>Name</th>
            <th>Points</th>
            <th>Badge</th>
          </tr>
        </thead>
        <tbody>
         
          {data.map((datas) => (
            <tr key={datas.id}
            className="text-xs sm:text-sm md:text-base lg:text-lg border-b"
            >
                <td className='font-semibold sm:text-base md:text-lg lg:text-lg '>1</td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className=" sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-40 lg:w-40">
                      <img src={datas.avater} alt='' />
                    </div>
                  </div>
                </div>
              </td>
              <td className='font-semibold sm:text-base md:text-lg lg:text-lg '>{datas.name}</td>
              <td className='font-semibold sm:text-base md:text-lg lg:text-lg '>{datas.points}</td>
              <td className='font-semibold sm:text-base md:text-lg lg:text-lg '>{datas.badge} ⭐</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>

       </div>

      </div>

        
    );
};

export default LeaderBoard;