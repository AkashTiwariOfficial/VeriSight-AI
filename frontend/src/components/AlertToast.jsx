const AlertToast = ({ message }) => {
  return (
    <div className="fixed top-4 right-4 bg-red-600 text-white p-3 rounded">
      ⚠️ {message}
    </div>
  );
};

export default AlertToast;