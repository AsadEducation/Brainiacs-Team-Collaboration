import React, { useEffect, useState } from 'react';

const LeaderBoard = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        fetch('/leaderboard.json')
          .then(res => res.json())
          .then(data => setData(data))
          .catch(err => console.error(err));
      }, []);

   
         

    return (

        <div className=" px-4 ">
       

{/* leader board */}

        <div className='max-w-6xl mx-auto '>
 <h2 className=" text-4xl text-secondary font-bold text-center  my-8">

Leader Board

 </h2>

<div className="overflow-x-auto  pt-10">
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
                      <img src={datas.avatar} alt='' />
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