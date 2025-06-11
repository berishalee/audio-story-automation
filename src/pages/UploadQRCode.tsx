import React, { useState } from 'react';
import QRScanner from '../components/QRScanner';
import InteractiveStoryPlayer from '../components/InteractiveStoryPlayer';

export const UploadQRCode: React.FC = () => {
  const [urls, setUrls] = useState<string[] | null>(null);

  const handleResult = (res: string[]) => {
    setUrls(res);
  };

  return (
    <div>
      {!urls && <QRScanner onResult={handleResult} />}
      {urls && urls.length > 1 && <InteractiveStoryPlayer urls={urls} />}
      {urls && urls.length === 1 && <audio controls src={urls[0]} />}
    </div>
  );
};

export default UploadQRCode;
