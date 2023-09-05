import { useState, useRef, useEffect } from "react";
import { Songs } from "../assets/songs";
import { usePlayer } from "../hooks/usePlayer";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { BsPauseFill } from "react-icons/bs";
import { BsFillPlayFill } from "react-icons/bs";

const Player = () => {
  const { song, setSong } = usePlayer();

  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState<number>(0);
  const [currnetTime, setCurrentTime] = useState<number>(0);

  const audioPlayer = useRef<HTMLAudioElement | null>(null);
  const progressBar = useRef<HTMLInputElement | null>(null);

  const playAudio = () => {
    if (audioPlayer.current) {
      setIsPlaying(true);
      audioPlayer.current.play().catch(() => {
        // failed because the user didn't interact with the document first
        setIsPlaying(false);
      });
    }
  };

  useEffect(() => {
    setIsPlaying(true);
    if (audioPlayer.current) {
      audioPlayer.current.onloadedmetadata = () => {
        const seconds = Math.floor(audioPlayer.current?.duration || 0);
        setDuration(seconds);
        playAudio();
        audioPlayer.current!.addEventListener("canplaythrough", () => {
          audioPlayer.current!.play();
        });
        if (progressBar.current != null) {
          progressBar.current!.max = seconds.toString();
        }
      };
    }
  }, []);

  const calculateTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    if (audioPlayer.current!.paused) {
      setIsPlaying(true);
      audioPlayer.current!.play();
    } else {
      setIsPlaying(false);
      audioPlayer.current!.pause();
    }
  };

  const handleTimeUpdate = () => {
    if (audioPlayer.current) {
      setCurrentTime(audioPlayer.current.currentTime);
      progressBar.current!.value = audioPlayer.current.currentTime.toString();
    }
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (audioPlayer.current) {
      audioPlayer.current!.currentTime = Number(newValue);
    }
    setIsPlaying(true);
  };

  const onVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (audioPlayer.current) {
      audioPlayer.current!.volume = Number(newValue) / 100;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-12 px-4 py-10 lg:px-0 lg:w-1/2 ">
      <img src={Songs[song].cover} className="rounded-2xl " />
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-2xl font-bold">{Songs[song].title}</h2>
        <h3 className="text-lg text-gray-500">{Songs[song].author}</h3>
      </div>
      <div className="flex flex-col items-center w-full gap-2">
        <audio
          ref={audioPlayer}
          src={Songs[song].song}
          controls
          onTimeUpdate={handleTimeUpdate}
          className="hidden"
        />
        <div className="flex w-full gap-4 px-2 lg:px-4">
          <div className="w-12 ">{calculateTime(currnetTime)}</div>
          <input
            ref={progressBar}
            type="range"
            defaultValue={0}
            onChange={handleSliderChange}
            className="w-full"
          />
          <div>{calculateTime(duration)}</div>
        </div>
      </div>
      <div className="flex justify-center w-3/4 h-12 gap-2 lg:w-1/3">
        <span className="flex items-center justify-center w-1/3">
          {Songs[song].id > 0 ? (
            <button onClick={() => setSong(song - 1)} aria-label="Back Button">
              <GrPrevious className="text-xl" />
            </button>
          ) : null}
        </span>
        <span className="flex items-center justify-center w-1/3">
          <button onClick={togglePlayPause}>
            {isPlaying ? (
              <BsPauseFill className="text-3xl" />
            ) : (
              <BsFillPlayFill className="text-3xl" />
            )}
          </button>
        </span>
        <span className="flex items-center justify-center w-1/3">
          {Songs[song].id < Songs.length - 1 ? (
            <button
              onClick={() => setSong(song + 1)}
              aria-label="Forward Button"
            >
              <GrNext className="text-xl" />
            </button>
          ) : null}
        </span>
      </div>
      <input type="range" min={0} max={100} onChange={e => onVolumeChange(e)}/>
    </div>
  );
};

export default Player;
