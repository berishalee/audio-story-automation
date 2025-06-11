export async function parseQrContent(content: string): Promise<string[]> {
  let data = content.trim();
  if (/^https?:\/\//i.test(content)) {
    try {
      const resp = await fetch(content, { redirect: 'follow' });
      data = await resp.text();
    } catch (err) {
      console.error('Failed to resolve QR url', err);
    }
  }

  let urls: string[] = [];
  try {
    const json = JSON.parse(data);
    if (Array.isArray(json)) {
      urls = json.map(String);
    } else if (typeof json === 'string') {
      urls = json.split(',').map(s => s.trim());
    } else if (json.audio) {
      if (Array.isArray(json.audio)) {
        urls = json.audio.map(String);
      } else {
        urls = String(json.audio).split(',').map(s => s.trim());
      }
    }
  } catch {
    urls = data.split(',').map(s => s.trim());
  }

  const CLOUDINARY_PATTERN = /cloudinary\.com|res\.cloudinary\.com/;
  return urls.filter(url => CLOUDINARY_PATTERN.test(url));
}
