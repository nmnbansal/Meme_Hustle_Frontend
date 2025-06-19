import React, { useEffect, useState } from 'react';
import GlitchButton from './GlitchButton';
import NeonText from './NeonText';

function BidPanel({ memeId, socket }) {
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState('');

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/bids/${memeId}/bids`);
        const data = await response.json();
        setBids(data);
      } catch (error) {
        console.error('Fetch bids error:', error);
      }
    };
    fetchBids();

    // Listen for new bids
    socket.on('newBid', (bid) => {
      if (bid.meme_id === memeId) {
        setBids((prev) => [...prev, bid]);
      }
    });

    return () => {
      socket.off('newBid');
    };
  }, [memeId, socket]);

  const handleBid = async (e) => {
    e.preventDefault();
    if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) return;

    try {
      await fetch(`http://localhost:5000/api/bids/${memeId}/bid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credits: parseInt(bidAmount) }),
      });
      setBidAmount('');
    } catch (error) {
      console.error('Place bid error:', error);
    }
  };

  return (
    <div className="bg-black bg-opacity-70 p-4 rounded-lg mt-4">
      <NeonText text="Bidding Panel" className="text-lg mb-2" />
      <form onSubmit={handleBid} className="flex space-x-2 mb-4">
        <input
          type="number"
          placeholder="Bid amount (credits)"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded flex-grow"
          min="1"
        />
        <GlitchButton type="submit" text="Place Bid" />
      </form>
      <div className="max-h-40 overflow-y-auto">
        {bids.length === 0 ? (
          <p className="text-cyber-blue">No bids yet!</p>
        ) : (
          <ul>
            {bids.map((bid, index) => (
              <li key={index} className="text-sm text-cyber-pink mb-1">
                {bid.user_id} bid {bid.credits} credits
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default BidPanel;