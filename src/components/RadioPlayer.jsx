import React, { useState, useRef } from 'react';

const RadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const radioStationUrl = 'https://az03.streaminghd.net.ar/8080/stream'; // 

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Uculturemix Radio Test</h1>
        <div className="flex items-center justify-center mb-4">
          <button
            onClick={handlePlayPause}
            className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-full"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
        <audio ref={audioRef} src={radioStationUrl} />
      </div>
    </div>
  );
};

export default RadioPlayer;
