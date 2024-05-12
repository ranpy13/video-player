import React from 'react';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentTime, duration }) => {
  const progress = (currentTime / duration) * 100;

  return (
    <div className="progress-bar h-2 bg-gray-200 rounded-full">
      <div
        className="progress w-full h-full rounded-full bg-blue-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
