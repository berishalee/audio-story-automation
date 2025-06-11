# audio-story-automation

This project demonstrates a simple interactive audio story player. After scanning a QR code that resolves to one or more Cloudinary audio files, the app can play the audio sequentially or allow interactive selection of segments.

## Running the App

1. Install dependencies with `npm install`.
2. Start the development server with `npm run dev` (or `npm start` depending on your setup).
3. Navigate to the `UploadQRCode` page in your browser.
4. Scan or paste a QR code containing a URL that resolves to multiple Cloudinary audio URLs.
5. If multiple segments are detected, the **InteractiveStoryPlayer** will display controls for each segment.
