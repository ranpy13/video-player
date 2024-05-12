import React, { useState, useEffect } from 'react';
import MediaPlayer from '../components/MediaPlayer';

interface Media {
  url: string;
}

const MediaPage = () => {
  const [mediaUrl, setMediaUrl] = useState<string>(''); // User-provided URL
  const [media, setMedia] = useState<Media | null>(null);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMediaUrl(event.target.value);
  };

  useEffect(() => {
    if (mediaUrl) {
      setMedia({ url: mediaUrl });
    }
  }, [mediaUrl]);

  return (
    <div>
      <input
        type="text"
        className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
        placeholder="Enter media URL"
        value={mediaUrl}
        onChange={handleUrlChange}
      />
      {media ? (
        <MediaPlayer url={media.url} />
      ) : (
        <p>Enter a media URL to play.</p>
      )}
    </div>
  );
};

export default MediaPage;
