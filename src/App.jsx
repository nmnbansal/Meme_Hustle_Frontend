import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import io from 'socket.io-client';
import Gallery from './screens/Gallery';
import CreateMeme from './screens/CreateMeme';
import Leaderboard from './screens/Leaderboard';
import NeonText from './components/NeonText';
import logo from './assets/memehustle-logo.svg';

const socket = io('https://meme-hustle-backend-zmov.onrender.com');

function App() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    socket.on('newMeme', (meme) => {
      setMemes((prev) => [meme, ...prev]);
    });
    socket.on('voteUpdate', ({ id, upvotes }) => {
      setMemes((prev) =>
        prev.map((meme) =>
          meme.id === id ? { ...meme, upvotes } : meme
        )
      );
    });
    socket.on('newBid', ({ meme_id, user_id, credits }) => {
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
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-blue-900 text-white p-4">
        <Link to="/">
          <div className="flex items-center justify-center mb-8 gap-3 cursor-pointer">
            <img src={logo} alt="MemeHustle Logo" className="w-10 h-10 drop-shadow-lg" />
            <NeonText text="MemeHustle" className="text-4xl font-bold text-center" />
          </div>
        </Link>
        <Routes>
          <Route path="/" element={<Gallery socket={socket} memes={memes} setMemes={setMemes} />} />
          <Route path="/create" element={<CreateMeme socket={socket} />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;