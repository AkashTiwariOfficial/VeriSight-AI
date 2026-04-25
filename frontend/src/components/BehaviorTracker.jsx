import React, { useEffect } from 'react';
import { useExam } from '../context/ExamContext.jsx';
import { preventDevTools } from '../utils/sandbox/preventDevTools.js';
import { preventCopyPaste } from '../utils/sandbox/preventCopyPaste.js';
import { preventMultipleTabs } from '../utils/sandbox/preventMultipleTabs.js';

const BehaviorTracker = () => {
  const { reportEvent } = useExam();

  useEffect(() => {
    // Initialize Sandbox
    const cleanDevTools = preventDevTools();
    const cleanCopyPaste = preventCopyPaste();
    
    const cleanMultipleTabs = preventMultipleTabs((event) => {
      reportEvent(event);
    });

    return () => {
      cleanDevTools();
      cleanCopyPaste();
      cleanMultipleTabs();
    };
  }, [reportEvent]);

  return null; // This is a headless component that just handles behavior monitoring
};

export default BehaviorTracker;