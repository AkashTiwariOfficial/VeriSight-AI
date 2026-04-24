export const enableFullscreen = () => {
  const elem = document.documentElement;

  const requestFullscreen =
    elem.requestFullscreen ||
    elem.webkitRequestFullscreen ||
    elem.msRequestFullscreen;

  requestFullscreen.call(elem);
};

export const fullscreenGuard = () => {
  enableFullscreen();

  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
      alert("⚠️ You exited fullscreen. Exam terminated.");
      window.location.reload();
    }
  });
};