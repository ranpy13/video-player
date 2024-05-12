import React from 'react';

interface MediaControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onVolumeChange: (newVolume: number) => void;
  onSeek: (newTime: number) => void;
  isMuted: boolean;
  isFullScreen: boolean;
  onFullScreen: () => void;
  onSeekBackward: () => void;
  onSeekForward: () => void;
}

const MediaControls: React.FC<MediaControlsProps> = ({
  isPlaying,
  onPlayPause,
  onVolumeChange,
  onSeek,
  isMuted,
  isFullScreen,
  onFullScreen,
  onSeekBackward,
  onSeekForward,
}) => {
  return (
    <div className="media-controls flex items-center justify-between px-4 py-2 bg-gray-800 opacity-75 hover:opacity-100">
      <button
        className="text-white hover:text-gray-300"
        onClick={onPlayPause}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <div className="flex items-center">
        <button
          className="text-white hover:text-gray-300 mr-2"
          disabled={!isPlaying} // Disable rewind when not playing
          onClick={onSeekBackward}
        >
          <i className="fas fa-backward"></i>
        </button>
        <button
          className="text-white hover:text-gray-300"
          onClick={onPlayPause}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          className="text-white hover:text-gray-300 ml-2"
          disabled={!isPlaying} // Disable fast-forward when not playing
          onClick={onSeekForward}
        >
          <i className="fas fa-forward"></i>
        </button>
        <input
          type="range"
          className="w-full h-2 rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          min={0}
          max={1}
          step={0.01}
          value={isMuted ? 0 : onVolumeChange} // Handle muted state
          onChange={(event) => onVolumeChange(parseFloat(event.target.value))}
        />
        <button
          className="text-white hover:text-gray-300 ml-2"
          onClick={() => onVolumeChange(isMuted ? 0.5 : 0)} // Toggle mute
        >
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
      </div>
      <div className="flex items-center">
        <button
          className="text-white hover:text-gray-300 mr-2"
          onClick={onFullScreen}
        >
          {isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </div>
    </div>
  );
};

export default MediaControls;
