import React, { useState } from 'react';
import GlitchButton from './GlitchButton';
import NeonText from './NeonText';

function MemeForm({ socket }) {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const meme = {
      title,
      image_url: imageUrl || 'https://picsum.photos/200',
      tags: tags.split(',').map((tag) => tag.trim()),
    };
    try {
      await fetch('https://meme-hustle-backend-zmov.onrender.com/api/memes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meme),
      });
      setTitle('');
      setImageUrl('');
      setTags('');
    } catch (error) {
      console.error('Create meme error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-black bg-opacity-70 p-6 rounded-lg">
      <NeonText text="Create Meme" className="text-2xl mb-4" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Meme Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-gray-800 text-white p-2 rounded mb-2"
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full bg-gray-800 text-white p-2 rounded mb-2"
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full bg-gray-800 text-white p-2 rounded mb-2"
        />
        <GlitchButton type="submit" text="Create Meme" />
      </form>
    </div>
  );
}

export default MemeForm;