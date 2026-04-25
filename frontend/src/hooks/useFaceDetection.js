import { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { loadModels } from '../utils/faceModelLoader.js';

export const useFaceDetection = (videoRef, reportEvent) => {
  const [faceStatus, setFaceStatus] = useState('LOADING'); // LOADING, DETECTING, NO_FACE, MULTIPLE_FACES, GAZE_DEVIATION, TALKING, OK
  const [warningMessage, setWarningMessage] = useState(null);
  
  const timerRef = useRef(null);
  const violationState = useRef({
    gazeDeviations: 0,
    lipsMoving: 0,
  });

  useEffect(() => {
    const init = async () => {
      await loadModels();
      setFaceStatus('DETECTING');
      detectFaces();
    };

    const detectFaces = async () => {
      if (!videoRef.current) return;
      
      // Run every 500ms
      timerRef.current = setInterval(async () => {
        if (videoRef.current && videoRef.current.readyState === 4) {
          const detections = await faceapi.detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 })
          ).withFaceLandmarks();

          if (detections.length === 0) {
            setFaceStatus('NO_FACE');
            setWarningMessage('No person detected in frame.');
            reportEvent({
              type: 'NO_FACE',
              severity: 'HIGH',
              description: 'No face detected in webcam feed',
              timestamp: new Date()
            });
            // Reset counters
            violationState.current.gazeDeviations = 0;
            violationState.current.lipsMoving = 0;
            
          } else if (detections.length > 1) {
            setFaceStatus('MULTIPLE_FACES');
            setWarningMessage('Multiple people detected! Ensure you are alone.');
            reportEvent({
              type: 'MULTIPLE_FACES',
              severity: 'CRITICAL',
              description: 'Multiple faces detected in webcam feed',
              timestamp: new Date()
            });
            violationState.current.gazeDeviations = 0;
            violationState.current.lipsMoving = 0;
            
          } else {
            // Exactly 1 face, let's analyze landmarks
            const landmarks = detections[0].landmarks;
            const jawOutline = landmarks.getJawOutline();
            const nose = landmarks.getNose();
            const mouth = landmarks.getMouth();
            const boxHeight = detections[0].detection.box.height;

            // 1. Check Gaze / Head Pose
            const leftJaw = jawOutline[0];
            const rightJaw = jawOutline[16];
            const noseBase = nose[3]; // Approx tip of nose
            
            const distLeft = Math.abs(noseBase.x - leftJaw.x);
            const distRight = Math.abs(noseBase.x - rightJaw.x);
            // If face is straight, ratio should be around 1.0
            const ratio = distLeft / distRight;
            const isLookingAway = ratio > 2.0 || ratio < 0.5;

            // 2. Check Lips Moving (Talking)
            // Inner mouth is index 12-19 in getMouth array
            // 14 is top inner lip, 18 is bottom inner lip
            const topInnerLip = mouth[14];
            const bottomInnerLip = mouth[18];
            const mouthOpenness = Math.abs(topInnerLip.y - bottomInnerLip.y) / boxHeight;
            const isLipsMoving = mouthOpenness > 0.025; // Threshold for open mouth

            if (isLookingAway) {
              violationState.current.gazeDeviations += 1;
            } else {
              violationState.current.gazeDeviations = Math.max(0, violationState.current.gazeDeviations - 1);
            }

            if (isLipsMoving) {
              violationState.current.lipsMoving += 1;
            } else {
              violationState.current.lipsMoving = Math.max(0, violationState.current.lipsMoving - 1);
            }

            // Trigger warnings if violations persist for > 2 seconds (4 consecutive intervals of 500ms)
            if (violationState.current.gazeDeviations >= 4) {
              setFaceStatus('GAZE_DEVIATION');
              setWarningMessage('Please look straight at the screen.');
              reportEvent({
                type: 'GAZE_DEVIATION',
                severity: 'MEDIUM',
                description: 'User looking away from the screen',
                timestamp: new Date()
              });
              // Reset slightly to avoid spamming
              violationState.current.gazeDeviations = 2;
            } else if (violationState.current.lipsMoving >= 4) {
              setFaceStatus('TALKING');
              setWarningMessage('Talking detected. Please remain silent.');
              reportEvent({
                type: 'NOISE', // Reusing NOISE penalty or we can create TALKING
                severity: 'MEDIUM',
                description: 'Lip movement / talking detected',
                timestamp: new Date()
              });
              violationState.current.lipsMoving = 2;
            } else {
              setFaceStatus('OK');
              setWarningMessage(null);
            }
          }
        }
      }, 500); // Check every 500ms for responsiveness
    };

    init();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [videoRef, reportEvent]);

  return { faceStatus, warningMessage };
};