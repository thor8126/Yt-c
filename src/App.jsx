import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import urls from "./data";
import "./App.css"; // Import your CSS file for styling

export default function App() {
  const [song, setSong] = useState("song1");
  const [url, setUrl] = useState(urls[song]["url_2k"]);
  const [quality, setQuality] = useState("url_720");
  const [played, setPlayed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);
  const [showControls, setShowControls] = useState(false);

  const handleQualityChange = (newQuality) => {
    const currentTime = playerRef.current.getCurrentTime();
    setQuality(newQuality);
    setUrl(urls["song1"][`url_${newQuality}`]);

    setTimeout(() => {
      playerRef.current.seekTo(currentTime, "seconds");
    }, 500);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="video-container" onMouseEnter={() => setShowControls(true)} onMouseLeave={() => setShowControls(false)} >
      <ReactPlayer
        ref={playerRef}
        url={url}
        controls={false}
        playing={isPlaying}
        pip
        progressInterval={100}
        onProgress={(state) => setPlayed(state.played)}
        onContextMenu={(e) => e.preventDefault()}
        width="100%"
        height="100%"
      />

      {/* Custom controls */}
      {showControls && <div className="custom-controls">

        {/* play pause button */}
        <div className="play-pause" onClick={togglePlayPause}>
          {isPlaying ? (<i class="fa-solid fa-pause"></i>) : (<i class="fa-solid fa-play"></i>)}
        </div>
        
        {/* progress bar */}
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${played * 100}%` }} />
        </div>

        {/* quality menu */}
        <div className="quality-menu">
            <select
              value={quality}
              onChange={(e) => handleQualityChange(e.target.value)}
            >
              <option className="quality-options" value="2k">4k</option>
              <option className="quality-options" value="1080">1080p</option>
              <option className="quality-options" value="720">720p</option>
            </select>
        </div>


      </div>
      }
    </div>
  );
}
