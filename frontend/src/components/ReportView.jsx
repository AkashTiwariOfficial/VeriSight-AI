import { useExam } from "../context/ExamContext";

const ReportView = () => {
  const { state } = useExam();

  return (
    <div className="p-6 bg-white text-black">
      <h1 className="text-xl font-bold">📄 Final Report</h1>

      <p>🎯 Trust Score: {state.trustScore}</p>
      <p>⚠️ Risk Level: {state.riskLevel}</p>
      <p>📉 Cheating Probability: {state.cheatingProbability}%</p>

      <h3 className="mt-4 font-bold">🚨 Alerts</h3>
      <ul>
        {state.alerts.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>

      <h3 className="mt-4 font-bold">⏱️ Timeline</h3>
      <ul>
        {state.timeline.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReportView;