import { useEffect, useState } from "react";

const TimelineView = ({ events = [] }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setLogs(events);
  }, [events]);

  return (
    <div className="bg-black text-white p-4 rounded">
      <h2 className="text-lg font-bold">⏱️ Activity Timeline</h2>

      <div className="mt-3 space-y-2">
        {logs.map((log, i) => (
          <div key={i} className="border-l-2 border-red-500 pl-3">
            <p className="text-sm">
              <span className="text-gray-400">{log.time}</span> — {log.event}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineView;