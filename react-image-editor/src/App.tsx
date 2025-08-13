import React from 'react';
import ImageUploader from './components/ImageUploader';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ImageUploader />
    </div>
  );
};

export default App;
