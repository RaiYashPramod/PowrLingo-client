import { Loader } from "lucide-react";
import { RankingCard } from "../components/RankingCard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const LeadearBoard = () => {
  // State variable to store leaderboard data
  const [data, setData] = useState([]);

  // Function to fetch leaderboard data from the server
  const fetchLeaderBoard = async () => {
    try {
      const response = await fetch(
        "https://powrlingo-server.onrender.com/api/users/leaderboard"
      );
      const data = await response.json();
      setData(data); // Update the state with the fetched leaderboard data
    } catch (error) {
      toast.error("Something went wrong!"); // Handle errors with a toast notification
    }
  };

  useEffect(() => {
    // Fetch leaderboard data when the component mounts
    fetchLeaderBoard();
  }, []);

  return (
    <>
      <div className="bg-gray-100">
        <span className="font-mono-regular text-xs"><span className="underline">Bonus Tips:</span> Update your name in order to appear on the leaderboard.</span>
      </div>
      <div className="flex flex-col items-center bg-gray-100 min-h-screen">
        <h3 className="p-6 text-4xl font-mono-bold2">LeaderBoard</h3>
        {data.leaderboard ? (
          // Map through the leaderboard data and render RankingCard components
          data.leaderboard.map((userData, index) => (
            <div className="py-4 mx-auto font-mono-regular" key={userData.UUI}>
              {userData.Name != "Anonymous" ? (
                <RankingCard
                  rank={index + 1} // Calculate and display the rank
                  name={userData.Name}
                  points={userData.PointsScored}
                  questionsSolved={userData.totalQuestions.length}
                />
              ) : (
                <></>
              )}
            </div>
          ))
        ) : (
          // <p><Loader size={"10rem"} /></p>
          <div className="flex justify-center items-center">
            <div className="w-32 h-32 border-t-8 border-black border-solid rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default LeadearBoard;
