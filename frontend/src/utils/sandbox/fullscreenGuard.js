export const fullscreenGuard = (onExit) => {
  const enterFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => console.log('Error attempting to enable fullscreen:', err));
    }
  };

  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      onExit({ type: 'FULLSCREEN_EXIT', severity: 'MEDIUM', description: 'User exited fullscreen mode' });
    }
  };

  document.addEventListener('fullscreenchange', handleFullscreenChange);
  
  return {
    enterFullscreen,
    cleanup: () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }
  };
};