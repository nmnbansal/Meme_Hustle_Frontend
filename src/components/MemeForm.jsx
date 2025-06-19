import React, { useState } from 'react';
import GlitchButton from './GlitchButton';
import NeonText, { Loader } from './NeonText';

function MemeForm({ socket }) {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Create meme error:', error);
    }
    setLoading(false);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (success) setSuccess(false);
  };

  return (
    <div className="max-w-md mx-auto bg-black bg-opacity-70 p-6 rounded-lg">
      {success && (
        <div className="mb-4 p-2 bg-green-700 text-white rounded">Meme created successfully!</div>
      )}
      <NeonText text="Create Meme" className="text-2xl mb-4" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Meme Title"
          value={title}
          onChange={handleInputChange(setTitle)}
          className="w-full bg-gray-800 text-white p-2 rounded mb-2"
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={handleInputChange(setImageUrl)}
          className="w-full bg-gray-800 text-white p-2 rounded mb-2"
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={handleInputChange(setTags)}
          className="w-full bg-gray-800 text-white p-2 rounded mb-2"
          disabled={loading}
        />
        <GlitchButton type="submit" text={loading ? <Loader className="scale-75" /> : "Create Meme"} disabled={loading} />
      </form>
    </div>
  );
}

export default MemeForm;