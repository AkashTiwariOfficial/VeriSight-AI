export const preventCopyPaste = () => {
  const preventEvent = (e) => {
    e.preventDefault();
  };

  document.addEventListener('copy', preventEvent);
  document.addEventListener('cut', preventEvent);
  document.addEventListener('paste', preventEvent);
  document.addEventListener('selectstart', preventEvent); // Prevent text selection

  return () => {
    document.removeEventListener('copy', preventEvent);
    document.removeEventListener('cut', preventEvent);
    document.removeEventListener('paste', preventEvent);
    document.removeEventListener('selectstart', preventEvent);
  };
};