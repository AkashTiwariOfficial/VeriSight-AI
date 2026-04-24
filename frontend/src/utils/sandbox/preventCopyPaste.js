export const preventCopyPaste = () => {
  document.addEventListener("copy", (e) => e.preventDefault());
  document.addEventListener("cut", (e) => e.preventDefault());
  document.addEventListener("paste", (e) => e.preventDefault());

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && ["c", "v", "x"].includes(e.key)) {
      e.preventDefault();
    }
  });
};