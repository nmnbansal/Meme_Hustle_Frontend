import React, { useEffect, useState } from 'react';
import NeonText, { Loader } from './NeonText';

function LeaderboardTable() {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://meme-hustle-backend-zmov.onrender.com/api/memes/leaderboard?top=10');
        const data = await response.json();
        setMemes(data);
      } catch (error) {
        console.error('Leaderboard error:', error);
      }
      setLoading(false);
    };
    fetchLeaderboard();
  }, []);

  if (loading) return <Loader className="my-12" />;

  return (
    <div className="max-w-4xl mx-auto">
      <NeonText text="Trending Leaderboard" className="text-2xl mb-4" />
      <table className="w-full bg-black bg-opacity-50 rounded">
        <thead>
          <tr className="text-cyber-pink">
            <th className="p-2">Title</th>
            <th className="p-2">Upvotes</th>
            <th className="p-2">Owner</th>
          </tr>
        </thead>
        <tbody>
          {memes.map((meme) => (
            <tr key={meme.id} className="border-t border-cyber-blue">
              <td className="p-2">{meme.title}</td>
              <td className="p-2">{meme.upvotes}</td>
              <td className="p-2">{meme.owner_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderboardTable;