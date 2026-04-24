import { useEffect, useState } from "react";

export const useAudioNoise = () => {
  const [noiseLevel, setNoiseLevel] = useState(0);

  useEffect(() => {
    let audioContext;
    let analyser;

    const start = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);

      analyser = audioContext.createAnalyser();
      source.connect(analyser);

      const data = new Uint8Array(analyser.frequencyBinCount);

      const loop = () => {
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b) / data.length;

        setNoiseLevel(avg);
        requestAnimationFrame(loop);
      };

      loop();
    };

    start();

    return () => audioContext?.close();
  }, []);

  return noiseLevel > 50;
};