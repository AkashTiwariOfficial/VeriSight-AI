const WarningModal = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="bg-white text-black p-6 rounded">
        <h2 className="text-xl font-bold">⚠️ WARNING</h2>
        <p>Suspicious activity detected. Your exam is under review.</p>
      </div>
    </div>
  );
};

export default WarningModal;