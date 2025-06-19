import React, { useEffect, useState } from 'react';
import MemeCard from '../components/MemeCard';
import NeonText, { Loader } from '../components/NeonText';
import { useNavigate } from 'react-router-dom';

function Gallery({ socket }) {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemes = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://meme-hustle-backend-zmov.onrender.com/api/memes');
        const data = await response.json();
        setMemes(data);
      } catch (error) {
        console.error('Fetch memes error:', error);
      }
      setLoading(false);
    };
    fetchMemes();

    socket.on('newMeme', (newMeme) => {
      setMemes((prev) => [newMeme, ...prev]);
    });
    socket.on('voteUpdate', ({ id, upvotes }) => {
      setMemes((prev) =>
        prev.map((meme) => (meme.id === id ? { ...meme, upvotes } : meme))
      );
    });
    socket.on('newBid', ({ meme_id, credits, user_id }) => {
      console.log('Received newBid:', { meme_id, credits, user_id });
      setMemes((prev) =>
        prev.map((meme) =>
          meme.id === meme_id
            ? { ...meme, highestBid: credits, highestBidder: user_id }
            : meme
        )
      );
    });

    return () => {
      socket.off('newMeme');
      socket.off('voteUpdate');
      socket.off('newBid');
    };
  }, [socket]);

  return (
    <div className="container mx-auto">
      <div className="flex justify-end space-x-4 mb-4">
        <button
          className="bg-cyber-pink text-black px-4 py-2 rounded hover:bg-cyber-blue transition duration-200"
          onClick={() => navigate('/create')}
        >
          Create Meme
        </button>
        <button
          className="bg-cyber-blue text-black px-4 py-2 rounded hover:bg-cyber-pink transition duration-200"
          onClick={() => navigate('/leaderboard')}
        >
          Leaderboard
        </button>
      </div>
      <NeonText text="Meme Gallery" className="text-4xl mb-6 text-center" />
      {loading ? (
        <Loader className="my-12" />
      ) : memes.length === 0 ? (
        <p className="text-cyber-blue text-center">No memes yet! Create one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memes.map((meme, idx) => (
            <div key={meme.id} className="animate-fadein">
              <MemeCard meme={meme} socket={socket} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;