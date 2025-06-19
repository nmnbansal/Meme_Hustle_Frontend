import React, { useEffect, useState } from 'react';
import LeaderboardTable from '../components/LeaderboardTable.jsx';
import NeonText from '../components/NeonText';

function Leaderboard() {
  const [topMemes, setTopMemes] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/memes/leaderboard?top=10');
        const data = await response.json();
        setTopMemes(data);
      } catch (error) {
        console.error('Fetch leaderboard error:', error);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="container mx-auto max-w-2xl">
      <NeonText text="Leaderboard" className="text-4xl mb-6 text-center" />
      <LeaderboardTable memes={topMemes} />
    </div>
  );
}

export default Leaderboard;