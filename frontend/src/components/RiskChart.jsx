import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RiskChart = ({ data = [] }) => {
  return (
    <div className="bg-black p-4 rounded">
      <h2 className="text-white font-bold">📈 Risk Score Trend</h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="risk" stroke="red" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiskChart;