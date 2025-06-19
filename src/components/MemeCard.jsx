import React from 'react';
import GlitchButton from './GlitchButton';

function MemeCard({ meme, socket }) {
  const handleVote = async (type) => {
    try {
      const response = await fetch(`/api/memes/${meme.id}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Vote error:', errorData.error);
      }
    } catch (error) {
      console.error('Vote error:', error);
    }
  };

  const handleBid = async (e) => {
    e.preventDefault();
    const credits = parseInt(e.target[0].value);
    if (isNaN(credits) || credits <= 0) {
      console.error('Invalid bid amount:', credits);
      return;
    }

    if (!meme.id) {
      console.error('Invalid meme ID:', meme.id);
      return;
    }

    console.log('Placing bid:', { meme_id: meme.id, credits });

    try {
      const response = await fetch(`/api/bids/${meme.id}/bid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credits }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error('Bid failed:', data);
        throw new Error(data.error || 'Bid failed');
      }
      console.log('Bid successful:', data);
      e.target[0].value = '';
    } catch (error) {
      console.error('Bid error:', error.message);
    }
  };

  return (
    <div className="bg-black bg-opacity-50 p-4 rounded-lg shadow-lg hover:shadow-[0_0_15px_#ff00ff]">
      <img src={meme.image_url} alt={meme.title} className="w-full h-48 object-cover rounded" />
      <h3 className="text-xl font-bold neon-glow">{meme.title}</h3>
      <p className="text-sm text-cyber-blue">{meme.caption || 'No caption yet'}</p>
      <p className="text-sm text-cyber-pink">Vibe: {meme.vibe || 'No vibe yet'}</p>
      <p className="text-sm">Tags: {meme.tags.join(', ')}</p>
      <p className="text-lg">Upvotes: {meme.upvotes}</p>
      <p className="text-sm">Highest Bid: {meme.highestBid || 0} by {meme.highestBidder || 'None'}</p>
      <div className="flex space-x-2 mt-2">
        <GlitchButton onClick={() => handleVote('up')} text="Upvote" />
        <GlitchButton onClick={() => handleVote('down')} text="Downvote" />
      </div>
      <form onSubmit={handleBid} className="mt-2">
        <input
          type="number"
          placeholder="Enter bid (credits)"
          className="bg-gray-800 text-white p-2 rounded"
          min="1"
        />
        <GlitchButton type="submit" text="Place Bid" />
      </form>
    </div>
  );
}

export default MemeCard;