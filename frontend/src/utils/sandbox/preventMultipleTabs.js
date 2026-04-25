export const preventMultipleTabs = (onViolation) => {
  const handleVisibilityChange = () => {
    if (document.hidden) {
      onViolation({ type: 'TAB_SWITCH', severity: 'HIGH', description: 'Tab switching detected' });
    }
  };

  const handleBlur = () => {
    onViolation({ type: 'TAB_SWITCH', severity: 'HIGH', description: 'Window lost focus' });
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('blur', handleBlur);

  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('blur', handleBlur);
  };
};