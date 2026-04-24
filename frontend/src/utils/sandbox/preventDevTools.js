export const preventDevTools = () => {
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key))
    ) {
      e.preventDefault();
      alert("⚠️ DevTools access is blocked during exam");
    }
  });

  setInterval(() => {
    const devtools = window.outerWidth - window.innerWidth > 160;

    if (devtools) {
      alert("⚠️ DevTools detected!");
      window.location.reload();
    }
  }, 1000);
};