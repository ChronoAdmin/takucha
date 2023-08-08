import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import {BsPlayCircle,BsPauseCircle} from "react-icons/bs"

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const audioRef = useRef(null);

  // 再生状態が変更されたときに再生/一時停止を切り替える
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // 音量が変更されたときに音量を調節する
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  return (
    <div className="wrap">
      <div className="content">
        <Image src="/bg.png" height={500} width={500} />
        <div className="audio">
          <audio src="/a.mp3" ref={audioRef} />
          <button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <BsPauseCircle /> : <BsPlayCircle />}
          </button>
          <input
            type="range"
            min="0.0"
            max="1.0"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
