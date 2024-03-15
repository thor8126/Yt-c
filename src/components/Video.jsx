import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import "../styles/Video.css";

function Video({ urls }) {
  const [played, setPlayed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [quality, setQuality] = useState("720p");
  const [currentTime, setCurrentTime] = useState(0);
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef(null);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const onProgress = (state) => {
      setPlayed(state.played);
    };

    const internalPlayer = playerRef.current?.getInternalPlayer();
    if (internalPlayer) {
      internalPlayer.addEventListener("timeupdate", onProgress);
    }

    return () => {
      if (internalPlayer) {
        internalPlayer.removeEventListener("timeupdate", onProgress);
      }
    };
  }, []);

  const handleQualityChange = (newQuality) => {
    setIsPlaying(false);
    setCurrentTime(playerRef.current.getCurrentTime());
    setQuality(newQuality);
    setPlayerReady(false); // Reset player ready state
  };

  const handlePlayerReady = () => {
    if (!playerReady) {
      const selectedVideo = urls.find((video) => video.quality === quality);
      playerRef.current.url = selectedVideo.url;
      playerRef.current.seekTo(currentTime);
      setIsPlaying(true);
      setPlayerReady(true);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleFullScreen = () => {
    const isFullscreen =
      document.fullscreenElement || document.webkitFullscreenElement;

    if (!isFullscreen) {
      const elem = playerRef.current.wrapper;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  const handleVideoClick = () => {
    togglePlayPause();
  };

  return (
    <div
      className="video-container"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div onClick={handleVideoClick}>
        <ReactPlayer
          ref={playerRef}
          url={urls.find((video) => video.quality === quality)?.url}
          controls={false}
          playing={isPlaying}
          pip
          onReady={handlePlayerReady}
          onContextMenu={(e) => e.preventDefault()}
          width="100%"
          height="100%"
        />
      </div>
      {showControls && (
        <div className="custom-controls">
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${played * 100}%` }}
            />
          </div>
          <div className="quality-menu">
            <select
              value={quality}
              onChange={(e) => handleQualityChange(e.target.value)}
            >
              {urls.map((video, index) => (
                <option
                  key={index}
                  className="quality-options"
                  value={video.quality}
                >
                  {video.quality}
                </option>
              ))}
            </select>
          </div>
          <div className="fullscreen-button" onClick={toggleFullScreen}>
            <i className="fa-solid fa-expand"></i>
          </div>
        </div>
      )}
    </div>
  );
}

export default Video;
