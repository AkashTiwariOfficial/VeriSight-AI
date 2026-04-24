export const captureSnapshot = (videoRef) => {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 480;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(videoRef.current, 0, 0, 640, 480);

  return canvas.toDataURL("image/png");
};