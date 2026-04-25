import { useEffect, useRef, useState } from 'react';

export const useAudioNoise = (reportEvent) => {
  const [isNoisy, setIsNoisy] = useState(false);
  const audioContextRef = useRef(null);
  const analyzerRef = useRef(null);
  const dataArrayRef = useRef(null);
  const sourceRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const startAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyzerRef.current = audioContextRef.current.createAnalyser();
        
        sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
        sourceRef.current.connect(analyzerRef.current);
        
        analyzerRef.current.fftSize = 256;
        const bufferLength = analyzerRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);

        timerRef.current = setInterval(() => {
          analyzerRef.current.getByteFrequencyData(dataArrayRef.current);
          let sum = 0;
          for (let i = 0; i < bufferLength; i++) {
            sum += dataArrayRef.current[i];
          }
          const average = sum / bufferLength;

          // Threshold for noise (adjust as needed)
          if (average > 50) {
            setIsNoisy(true);
            reportEvent({
              type: 'NOISE',
              severity: 'MEDIUM',
              description: 'Excessive background noise detected',
              timestamp: new Date()
            });
          } else {
            setIsNoisy(false);
          }
        }, 2000);
      } catch (err) {
        console.error('Error accessing microphone:', err);
      }
    };

    startAudio();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, [reportEvent]);

  return { isNoisy };
};