import { useEffect } from "react";
import { useExam } from "../context/ExamContext";

const AudioMonitor = () => {
  const { dispatch } = useExam();

  useEffect(() => {
    startAudio();
  }, []);

  const startAudio = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();

    source.connect(analyser);

    const data = new Uint8Array(analyser.frequencyBinCount);

    const detect = () => {
      analyser.getByteFrequencyData(data);

      const volume = data.reduce((a, b) => a + b) / data.length;

      if (volume > 60) {
        dispatch({
          type: "ADD_ALERT",
          payload: "🔊 Background noise detected",
        });
      }

      requestAnimationFrame(detect);
    };

    detect();
  };

  return null;
};

export default AudioMonitor;