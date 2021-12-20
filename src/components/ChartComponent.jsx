
import {
  ComposedChart,
  Area,
  BarChart,
  Bar,
  Cell,
  Pie,
  PieChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const COLORS = ['#8E7DFA', '#D2CBFD'];

const tooltipStyle = {
  backgroundColor: '#28234C',
  color: '#F2F2F4',
  borderRadius: '4px',
}
const CustomTooltip = ({ active, payload, unit }) => {
  // console.log(payload);
  if (active && payload && payload.length) {
    return (
      <div className="rounded bg-primary-dark text-white p-4 space-y-2">
        <p className="text-xs text-gray">{`${payload[0].payload.name}`}</p>
        <p>{`${payload[0].value} ${unit}`}</p>
      </div>
    );
  }

  return null;
};

const Charts = ({ data, children }) => {
    switch (data.type) {
    case "pie":
        return (
          <PieChart width={200} height={200}>
            <Tooltip content={<CustomTooltip unit={data.unit} />} />
            <Pie
              data={data.data}
              cx="50%"
              cy="50%"
              labelLine={false}
              fill="#8884d8"
              dataKey="value"
            >
              {data.data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        );
    case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              layout={data.layout ? data.layout : "horizontal"}
              data={data.data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid
                vertical={data.gridVertical ? data.gridVertical : false}
                horizontal={data.gridHorizontal ? data.gridHorizontal : false}
              />
              {data.XAxis ? (
                <XAxis
                  dataKey={data.XAxis.dataKey}
                  type={data.XAxis.type}
                  tick={{ fill: "#F2F2F4" }}
                />
              ) : (
                <XAxis dataKey="name" tick={{ fill: "#F2F2F4" }} />
              )}

              {data.YAxis.dataKey ? (
                <YAxis
                  dataKey={data.YAxis.dataKey}
                  type={data.YAxis.type}
                  tick={{ fill: "#F2F2F4" }}
                />
              ) : (
                <YAxis tick={{ fill: "#F2F2F4" }} />
              )}
              <Tooltip
                cursor={{
                  fill: "#8E7DFA66",
                }}
                content={<CustomTooltip unit={data.unit} />}
              />
              {children ? (
                children
              ) : (
                <Bar dataKey={data.dataKey} fill="#8E7DFA" />
              )}
            </BarChart>
          </ResponsiveContainer>
        );
    case "multi":
      return <ComposedChart data={data.data} />;
    }
};

function ChartComponent({ data, children }) {

  return (
    <Charts data={data} children={children} />
  )
}

export default ChartComponent;
