import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeUp, faVolumeMute, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const App = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [songTitle, setSongTitle] = useState('');
    const [artist, setArtist] = useState(''); // No se usa en este caso
    const [albumArt, setAlbumArt] = useState('');
    const [error, setError] = useState(null);

    const fetchMetadata = async () => {
        try {
            const response = await fetch('https://az03.streaminghd.net.ar/cp/get_info.php?p=8080');
            const data = await response.json();
            setSongTitle(data.title || 'Desconocido');
            setAlbumArt(data.art || 'https://i1.sndcdn.com/avatars-xrypX7Vc1IWKvnBu-reTPnQ-t240x240.jpg');
        } catch (error) {
            setError('Error al cargar los metadatos.');
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchMetadata();
        }, 10000); 
        return () => clearInterval(interval); 
    }, []);

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (e) => {
        if (audioRef.current) {
            const newVolume = e.target.value;
            audioRef.current.volume = newVolume;
            setVolume(newVolume);
        }
    };

    const handleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    return (
        <div className={`app ${isDarkTheme ? 'dark' : 'light'} flex flex-col items-center justify-center h-screen`}>
            <h1 className="text-3xl font-bold mb-4">Uculturemix Radio Test</h1>
            <div className="flex flex-col items-center mb-4 relative">
                <img 
                    src={albumArt} 
                    alt="Album Art" 
                    className="w-48 h-48 rounded-lg shadow-lg transition-transform transform hover:scale-110 hover:rotate-6 hover:opacity-90" 
                />
                <p className="mt-2 text-xl">{songTitle}</p>
            </div>
            <audio ref={audioRef} src="https://az03.streaminghd.net.ar/8080/stream" />
            <div className="controls flex items-center mt-4">
                <button className="transition transform hover:scale-105 mx-2" onClick={handlePlayPause}>
                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                </button>
                <button className="transition transform hover:scale-105 mx-2" onClick={handleMute}>
                    <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
                </button>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="slider mx-2 w-32"
                />
                <button className="transition transform hover:scale-105 mx-2" onClick={toggleTheme}>
                    <FontAwesomeIcon icon={isDarkTheme ? faSun : faMoon} />
                </button>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
};

export default App;
