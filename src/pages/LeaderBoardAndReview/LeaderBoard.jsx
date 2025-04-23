import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const LeaderBoard = () => {

    const [data, setData] = useState([])
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
      axiosPublic
        .get('/leaderboard')
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.error("Leaderboard fetch error:", err));
    }, [axiosPublic]);
  

   
    return (

        <div className=" px-4 ">

{/* leader board */}

        <div className='max-w-6xl mx-auto '>
 <h2 className="text-2xl md:text-3xl lg:text-4xl text-secondary font-bold text-center  my-8">

Leader Board

 </h2>

<div className="overflow-x-auto  pt-10">
      <table className="sm:table-auto md:table lg:table w-full">
    
        <thead >
          <tr className='font-bold  sm:text-base md:text-lg lg:text-xl '>
            <th>Rank</th>
            <th className='pl-18'>Image</th>
            <th>Name</th>
            <th>Points</th>
            <th>Badge</th>
          </tr>
        </thead>
        <tbody>
         
          {data.map((user , index) => (
            <tr key={user.email}
            className="text-xs sm:text-sm md:text-base lg:text-lg border-b"
            >
                <td className='font-semibold sm:text-base md:text-lg lg:text-lg '>{index + 1}</td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className=" h-20 w-20 md:h-24 md:w-24 lg:h-40 lg:w-40">
                      <img src={user.avatar || 'No Image'} alt={user?.name || 'No Image'} />
                    </div>
                  </div>
                </div>
              </td>
              <td className='font-semibold sm:text-base md:text-lg lg:text-lg '>{user.name}</td>
              <td className='font-semibold sm:text-base md:text-lg lg:text-lg '>{user.points}</td>
              <td className='font-semibold sm:text-base md:text-lg lg:text-lg '>{user.badge} </td>
              
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