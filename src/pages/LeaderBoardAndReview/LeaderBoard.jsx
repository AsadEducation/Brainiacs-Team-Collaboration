import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';

const LeaderBoard = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 
  const axiosPublic = useAxiosPublic();
  const { currentUser} = useAuth(); 
  const currentUserEmail = currentUser?.email; 
  const [yourRank, setYourRank] = useState(null);

  useEffect(() => {
    axiosPublic.get('/leaderboard')
      .then((res) => {
        console.log('Fetched Leaderboard Data:', res.data);
       
        if (Array.isArray(res.data)) {
          setData(res.data);
          const rank = res.data.findIndex(user => user.email === currentUserEmail);
          if (rank !== -1) {
            setYourRank(rank + 1);
          }
        } else {
          console.error("Leaderboard data is not an array:", res.data);
        }
      })
      .catch((err) => console.error("Leaderboard fetch error:", err));
  }, [axiosPublic, currentUserEmail]);
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="px-4">
      <div className='max-w-6xl mx-auto'>
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-secondary font-bold text-center my-8">
          Leader Board
        </h2>

       
        <div className="text-center mb-8">
          <p className="text-lg font-semibold text-primary">
            Your Rank: #{yourRank || "Not Ranked"}
          </p>
          <p className="text-sm text-gray-500">
            Total Participants: {data.length}
          </p>
          
        </div>

        <div className="overflow-x-auto pt-10">
          <table className="sm:table-auto md:table lg:table w-full">
            <thead>
              <tr className='font-bold sm:text-base md:text-lg lg:text-xl'>
                <th>Rank</th>
                <th>Image</th>
                <th>Name</th>
                <th>Points</th>
                <th>Badge</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user, index) => (
                <tr key={user.email} className="text-xs sm:text-sm md:text-base lg:text-lg border-b">
                  <td className='font-semibold'>{indexOfFirstItem + index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="h-20 w-20 md:h-24 md:w-24 lg:h-18 lg:w-18">
                          <img src={user.avatar || 'No Image'} alt={user?.name || 'No Image'} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='font-semibold'>{user.name}</td>
                  <td className='font-semibold'>{user.points}</td>
                  <td className='font-semibold'>{user.badge}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end my-8 space-x-2">
  <button
    onClick={() => currentPage > 1 && paginate(currentPage - 1)}
    className="px-4 py-2 border rounded-full bg-gray-200 hover:bg-secondary hover:text-white"
  >
    Prev
  </button>

  {[...Array(totalPages)].map((_, index) => (
    <button
      key={index}
      onClick={() => paginate(index + 1)}
      className={`px-3 py-2 border rounded-full 
        ${currentPage === index + 1 ? 'bg-secondary text-white' : 'bg-gray-200 hover:bg-secondary hover:text-white'}`}
    >
      {index + 1}
    </button>
  ))}

  <button
    onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
    className="px-4 py-2 border rounded-full bg-gray-200 hover:bg-secondary hover:text-white"
  >
    Next
  </button>
</div>

      </div>
    </div>
  );
};

export default LeaderBoard;