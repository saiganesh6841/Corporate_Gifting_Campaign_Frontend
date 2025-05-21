import { PieChart, Pie, Tooltip } from "recharts";

function Piechart({ width, height, style, pieChartData }) {
  return (
    <PieChart width={width} height={height} style={style}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={pieChartData}
        outerRadius={100}
      />
      <Tooltip />
    </PieChart>
  );
}
export default Piechart;
