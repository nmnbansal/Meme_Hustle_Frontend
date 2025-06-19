import React from 'react';
import MemeForm from '../components/MemeForm';
import NeonText from '../components/NeonText';

function CreateMeme() {
  return (
    <div className="container mx-auto max-w-md">
      <NeonText text="Create a Meme" className="text-4xl mb-6 text-center" />
      <MemeForm />
    </div>
  );
}

export default CreateMeme;