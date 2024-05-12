import React, { useState, useEffect, useRef } from 'react';
import MediaControls from './MediaControls';
import ProgressBar from './ProgressBar';

interface Media {
  url: string;
}

const MediaPlayer: React.FC<Media> = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlayPause = () => {
    if (error) return; // Don't play if there's an error
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      videoRef.current!.play();
    } else {
      videoRef.current!.pause();
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    videoRef.current!.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const handleSeek = (newTime: number) => {
    videoRef.current!.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      videoRef.current!.requestFullscreen();
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleLoadedMetadata = () => {
      setDuration(videoElement?.duration ?? 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement?.currentTime ?? 0);
    };

    const handlePlaying = () => setIsPlaying(true);
    const handlePaused = () => setIsPlaying(false);
    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleEnded = () => setIsPlaying(false);
    const handleVolumeChange = () => setIsMuted(videoElement?.muted ?? false);
    const handleError = () => setError(videoElement?.error?.message ?? 'No error message');

    videoElement?.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoElement?.addEventListener('timeupdate', handleTimeUpdate);
    videoElement?.addEventListener('playing', handlePlaying) ;
    videoElement?.addEventListener('paused', handlePaused) ;
    videoElement?.addEventListener('waiting', handleWaiting);
    videoElement?.addEventListener('canplay', handleCanPlay);
    videoElement?.addEventListener('ended', handleEnded) ;
    videoElement?.addEventListener('volumechange', handleVolumeChange);
    videoElement?.addEventListener('error', handleError);

    return () => {
      videoElement?.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement?.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement?.removeEventListener('playing', handlePlaying);
      videoElement?.removeEventListener('paused', handlePaused);
      videoElement?.removeEventListener('waiting', handleWaiting);
      videoElement?.removeEventListener('canplay', handleCanPlay);
      videoElement?.removeEventListener('ended', handleEnded);
      videoElement?.removeEventListener('volumechange', handleVolumeChange);
      videoElement?.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <div className="media-player">
      {error && <p className="text-red-500">{error}</p>}
      <video ref={videoRef} src={url} autoPlay={false} controls={false} />
      <MediaControls
        isPlaying={isPlaying}
        onPlayPause={togglePlayPause}
        onVolumeChange={handleVolumeChange}
        onSeek={handleSeek}
        isMuted={isMuted}
        isFullScreen={isFullScreen}
        onFullScreen={handleFullScreen}
        onSeekBackward={()=>handleSeek(videoRef.current!.currentTime - 10)} // Added for seek functionality
        onSeekForward={() => handleSeek(videoRef.current!.currentTime + 10)}   // Added for seek functionality
      />
      <ProgressBar currentTime={currentTime} duration={duration} />
      {/* ... minimized player component (if applicable) */}
    </div>
  );
  
};

export default MediaPlayer;
