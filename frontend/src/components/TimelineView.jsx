import { useExam } from "../context/ExamContext";

const TimelineView = () => {
  const { state } = useExam();

  return (
    <div className="p-4 text-white bg-gray-900">
      <h2 className="font-bold">⏱️ Timeline</h2>

      {state.timeline.map((t, i) => (
        <p key={i}>• {t}</p>
      ))}
    </div>
  );
};

export default TimelineView;