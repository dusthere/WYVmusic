import React, { useState, useEffect, useRef } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import { useGetAlbumSongsQuery, useGetSongByIdQuery } from '../Api/JioSavanApi';
import reactSvg2 from '../assets/react2.svg';
import reactSvg from '../assets/react3.svg';
import Header from './Header';

function DetailsPage() {
  const { albumId } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [songId, setSongId] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const { data, error, isLoading } = useGetAlbumSongsQuery(albumId);
  const { data: songData, error: songError, isLoading: songLoading } = useGetSongByIdQuery(songId, {
    skip: !songId,
  });
  const audioRef = useRef();
  const navigate = useNavigate()

  const handlePausePlay = (id) => {
    if (audioRef.current && songId !== id) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentTime(0);
    }
    if (id !== songId) {
      setSongId(id);
    } else {
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

  useEffect(() => {
    if(songData && audioRef.current){
        audioRef.current.src = songData.media_url;
        audioRef.current.play()
        setIsPlaying(true);
    }
  } , [songData]);

  return (
    <>
      <Header />
      <main className="">
        <div className="flex flex-col items-center p-4 bg-black">
          {isLoading && <p className="text-center text-blue-500">Loading...</p>}
          {error && <p className="text-center text-red-500">{error.message}</p>}
          <ul className="w-full max-w-7xl mt-5">
            {data &&
              data.songs.map((song) => {
                const isThisSongPlaying = isPlaying && songId === song.id;
                return (
                  <li key={song.id} className="flex items-center p-4 bg-gradient-to-b from-gray-200 to-gray-400 rounded-lg shadow-md  mb-4 cursor-pointer z-0"
                  onClick={() => navigate(`/song/${song.id}`)}
                  >
                    <img
                      src={song.image}
                      alt={song.song}
                      className="w-24 h-24 rounded-lg"
                      
                    />
                    <div className="flex flex-col ml-4 flex-1">
                      <p className="text-lg font-bold">{song.song}</p>
                      <p className="text-gray-600">{song.singers}</p>
                    </div>
                    <button
                            className="w-14 h-14 flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg relative"
                            onClick={() => handlePausePlay(item.id)}
                          >
                            {isThisSongPlaying ? (
                              <img src={reactSvg2} alt="Pause" className="w-8 h-8" />
                            ) : (
                              <img src={reactSvg} alt="Play" className="w-8 h-8" />
                            )}
                          </button>
                  </li>
                );
              })}
          </ul>
          <audio ref={audioRef} />
        </div>
      </main>
    </>
  );
}

export default DetailsPage;
