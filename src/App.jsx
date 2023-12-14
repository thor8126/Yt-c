import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import urls from "./data";

export default function App() {
  const [url, setUrl] = useState(urls["song1"]["url_2k"]);
  const [quality, setQuality] = useState("2k");
  const [played, setPlayed] = useState(0);
  const playerRef = useRef(null);

  const handleQualityChange = (newQuality) => {

    const currentTime = playerRef.current.getCurrentTime();
    setQuality(newQuality);
    setUrl(urls["song1"][`url_${newQuality}`]);

    setTimeout(() => {
      playerRef.current.seekTo(currentTime, "seconds");
    }, 500); 
  };

  return (
    <>
      <div>
        <ReactPlayer
          ref={playerRef}
          url={url}
          controls
          width="80%"
          height="80%"
          autoPlay={true}
          muted={true}
          playing
          pip
          progressInterval={100}
          onProgress={(state) => setPlayed(state.played)}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
      <div>
        <label>
          Select Quality:
          <select value={quality} onChange={(e) => handleQualityChange(e.target.value)}>
            <option value="2k">4k</option>
            <option value="1080">1080p</option>
            <option value="720">720p</option>
          </select>
        </label>
      </div>
    </>
  );
}
