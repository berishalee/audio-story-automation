import React, { useState, useRef, useEffect } from 'react';

type Props = {
  urls: string[];
};

export const InteractiveStoryPlayer: React.FC<Props> = ({ urls }) => {
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const [playing, setPlaying] = useState<number | null>(null);

  const toggle = (index: number) => {
    const current = audioRefs.current[index];
    if (!current) return;
    if (playing === index) {
      current.pause();
      setPlaying(null);
    } else {
      if (playing !== null && audioRefs.current[playing]) {
        audioRefs.current[playing].pause();
      }
      current.play();
      setPlaying(index);
    }
  };

  useEffect(() => {
    const Rec: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!Rec) return;
    const recognition = new Rec();
    recognition.continuous = true;
    recognition.onresult = (event: any) => {
      const last = event.results[event.results.length - 1][0].transcript.toLowerCase();
      if (last.includes('next')) {
        const next = playing !== null ? (playing + 1) % urls.length : 0;
        toggle(next);
      } else if (last.includes('pause')) {
        if (playing !== null) toggle(playing);
      } else if (last.includes('play')) {
        const index = playing !== null ? playing : 0;
        toggle(index);
      }
    };
    recognition.start();
    return () => recognition.stop();
  }, [playing, urls]);

  return (
    <div>
      {urls.map((url, i) => (
        <div key={i}>
          <button onClick={() => toggle(i)}>
            {playing === i ? 'Pause' : 'Play'} Segment {i + 1}
          </button>
          <audio ref={el => { if (el) audioRefs.current[i] = el; }} src={url} />
        </div>
      ))}
    </div>
  );
};

export default InteractiveStoryPlayer;
