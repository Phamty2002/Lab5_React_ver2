import React, { useEffect, useRef, useState } from "react";

function Short({ videoData, shortContainerRef }) {
  const videoRef = useRef();

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(videoData.reaction.isLiked);

  useEffect(() => {
    const handleVideo = () => {
      const videoTop = videoRef.current.getBoundingClientRect().top;

      if (videoTop > 0 && videoTop <= 150) {
        playVideo();
      } else {
        resetVideo();
      }
    };

    const playVideo = async () => {
      try {
        await videoRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        setIsPlaying(false);
        videoRef.current.pause();
      }
    };

    const resetVideo = () => {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    };

    const handleBlur = () => {
      if (isActiveVideo()) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };

    const handleFocus = () => {
      if (isActiveVideo()) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    };

    // Add event listeners
    shortContainerRef.current.addEventListener("scroll", handleVideo);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    // Cleanup event listeners on component unmount
    return () => {
      shortContainerRef.current.removeEventListener("scroll", handleVideo);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [shortContainerRef]);

  const togglePlayPause = () => {
    if (!isPlaying) {
      playVideo();
    } else {
      pauseVideo();
    }
  };

  const playVideo = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };

  const pauseVideo = () => {
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="reel">
      <div className="reel-video">
        <div className="video">
          <video
            ref={videoRef}
            onClick={togglePlayPause}
            disableRemotePlayback
            playsInline
            loop
            src={videoData.videoUrl}
          ></video>
          <div className="controls">
            <span onClick={togglePlayPause}>
              <ion-icon name={`${isPlaying ? "pause" : "play"}-outline`}></ion-icon>
            </span>
            <span onClick={toggleMute}>
              <ion-icon name={`volume-${isMuted ? "mute" : "medium"}-outline`}></ion-icon>
            </span>
          </div>
          {/* Other components */}
        </div>
        {/* Other components */}
      </div>
    </div>
  );
}

function isActiveVideo() {
  const videoTop = videoRef.current.getBoundingClientRect().top;
  return videoTop > 0 && videoTop <= 150;
}

function VideoList({ videos }) {
  const shortContainerRef = useRef();

  return (
    <div ref={shortContainerRef}>
      {videos.map((video) => (
        <Short key={video.id} videoData={video} shortContainerRef={shortContainerRef} />
      ))}
    </div>
  );
}

export default VideoList;
