import React, { useEffect, useState } from 'react';
import MemeCard from '../components/MemeCard';
import NeonText from '../components/NeonText';

function Gallery({ socket }) {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await fetch('https://meme-hustle-backend-zmov.onrender.com/api/memes');
        const data = await response.json();
        setMemes(data);
      } catch (error) {
        console.error('Fetch memes error:', error);
      }
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
      <NeonText text="Meme Gallery" className="text-4xl mb-6 text-center" />
      {memes.length === 0 ? (
        <p className="text-cyber-blue text-center">No memes yet! Create one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memes.map((meme) => (
            <MemeCard key={meme.id} meme={meme} socket={socket} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;