import { useState , useEffect , useRef} from 'react'
import { useGetTopSongsInWorldQuery } from '../Api/api'
import {Link} from 'react-router-dom'



function Top10() {
  const {data , error , isLoading} = useGetTopSongsInWorldQuery();
  const [isPlaying , setIsPlaying] = useState(false)
  const audioRef = useRef()

  const handlePausePlay = (previewUrl) => {
    if(audioRef.current){
    if(isPlaying){
      audioRef.current.pause()          
    }
    else{
      audioRef.current.src = previewUrl;
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }
  }

  useEffect(() => {
    if(isLoading){
      console.log("loading...")
    }
    if(error){
      console.log("error is" , error);
    }
    if(data){
      console.log(data)
      console.log(typeof data);
    }
  } , [isLoading , data , error])

  if (isLoading) return <div><h1>Loading...</h1></div>;
  if (error) return <div><h1>Error: {error.message}</h1></div>;

  return (
    <>
    <div className=' bg-[#d1d2d1]'>
      <h1 className="text-center text-4xl font-bold mb-8">Wyvm</h1>
      <div className="text-center mb-6">
        <Link to="/search">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">GO To Search</button>
        </Link>
      </div>
      <div className="flex flex-wrap justify-center px-4">
        <h1 className="w-full text-2xl font-semibold text-center mb-6">Current top 10 songs in the World</h1>
        <ul className="w-full max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.data?.map((song) => {
            const imageUrl = song.attributes.artwork.url.replace('{w}', '200').replace('{h}', '200');
            const previewUrl = song.attributes.previews[0].url;
            return (
              <li key={song.id} className="flex flex-col items-center p-4 bg-[aliceblue] rounded-lg shadow-md transform transition-transform hover:scale-105 hover:bg-[#ededf8]">
                <button
                  className="w-full text-left focus:outline-none"
                  onClick={() => handlePausePlay(previewUrl)}
                >
                  <img src={imageUrl} className="w-full h-auto mb-4 rounded-md" alt={song.attributes.name} />
                  <h2 className="font-bold text-xl mb-2 text-center">{song.attributes.name}</h2>
                  <p className="text-center text-gray-700">{song.attributes.artistName}</p>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <audio ref={audioRef} />
      </div>
    </>
  );
}

export default Top10
