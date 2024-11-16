import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSongByIdQuery, useGetLyricsQuery } from '../Api/JioSavanApi';
import reactSvg2 from '../assets/react2.svg';
import reactSvg from '../assets/react3.svg';
import Header from '../Components/Header';
import nextSvg from '../assets/next.svg';
import previousSvg from '../assets/previous.svg';

function SongDetails() {
  const { songId } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();

  const { data: songData, isLoading: songLoading } = useGetSongByIdQuery(songId);
  const { data: songLyrics } = useGetLyricsQuery(songId);

  useEffect(() => {
    if (songData && audioRef.current) {
      audioRef.current.src = songData.media_url;
    }
  }, [songData]);

  useEffect(() => {
    const updateCurrentTime = () => setCurrentTime(audioRef.current.currentTime);
    const setAudioDuration = () => setDuration(audioRef.current.duration);
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', updateCurrentTime);
      audio.addEventListener('loadedmetadata', setAudioDuration);
    }

    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', updateCurrentTime);
        audio.removeEventListener('loadedmetadata', setAudioDuration);
      }
    };
  }, []);

  const handlePausePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        setCurrentTime(audioRef.current.currentTime);
        audioRef.current.pause();
      } else {
        audioRef.current.currentTime = currentTime;
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (event) => {
    const seekPercentage = event.target.value;
    if (audioRef.current && !isNaN(duration)) {
      const seekTime = (seekPercentage / 100) * duration;
      if (isFinite(seekTime)) {
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
      }
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-col items-center p-6 bg-gray-800 min-h-screen">
        {songLoading ? (
          <p className="text-center text-blue-500">Loading...</p>
        ) : (
          songData && (
            <div className="bg-gradient-to-b from-gray-200 to-gray-400 p-6 rounded-lg shadow-lg w-full max-w-3xl">
              <div className="flex flex-col items-center mb-6">
                <img
                  src={songData.image}
                  alt={songData.song}
                  className="w-64 h-64 rounded-lg mb-4 shadow-lg"
                />
                <p className="text-3xl font-bold text-gray-800">{songData.song}</p>
                <p className="text-gray-600 text-xl">{songData.singers}</p>
                <div className="flex items-center space-x-6 mt-4 mb-4">
                  <img
                    src={previousSvg}
                    alt="Previous"
                    className="w-12 h-12 cursor-pointer transform hover:scale-110 transition duration-200"
                  />
                  <button
                    className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg hover:bg-blue-800 transition duration-300"
                    onClick={handlePausePlay}
                  >
                    {isPlaying ? (
                      <img src={reactSvg2} alt="Pause" className="w-10 h-10" />
                    ) : (
                      <img src={reactSvg} alt="Play" className="w-10 h-10" />
                    )}
                  </button>
                  <img
                    src={nextSvg}
                    alt="Next"
                    className="w-12 h-12 cursor-pointer transform hover:scale-110 transition duration-200"
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={(currentTime / duration) * 100 || 0}
                  onChange={handleSeek}
                  className="w-full mt-4 appearance-none bg-gray-300 h-2 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Lyrics</h2>
                {songLyrics ? (
                  <div
                    className="text-gray-700 whitespace-pre-line p-4 bg-gray-100 rounded-md shadow-inner max-h-64 overflow-y-auto"
                    dangerouslySetInnerHTML={{ __html: songLyrics.lyrics.replace(/\n/g, '<br />') }}
                  />
                ) : (
                  <p className="text-gray-600">No lyrics available</p>
                )}
              </div>
            </div>
          )
        )}
        <audio ref={audioRef} />
      </main>
    </>
  );
}

export default SongDetails;
