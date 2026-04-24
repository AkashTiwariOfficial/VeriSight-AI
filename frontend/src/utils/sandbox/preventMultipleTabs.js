export const preventMultipleTabs = () => {
  const tabId = Date.now();

  localStorage.setItem("exam_tab", tabId);

  window.addEventListener("storage", (e) => {
    if (e.key === "exam_tab") {
      alert("⚠️ Multiple tabs detected!");
      window.location.reload();
    }
  });

  window.addEventListener("beforeunload", () => {
    localStorage.removeItem("exam_tab");
  });
};