import React from 'react';
import { parseQrContent } from '../utils/qrContentParser';

type Props = {
  onResult: (urls: string[]) => void;
};

export const QRScanner: React.FC<Props> = ({ onResult }) => {
  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) return;
    const urls = await parseQrContent(value);
    onResult(urls);
  };

  return (
    <div>
      {/* Placeholder input for QR content */}
      <input
        type="text"
        placeholder="Paste QR text or URL"
        onBlur={handleInput}
      />
    </div>
  );
};

export default QRScanner;
