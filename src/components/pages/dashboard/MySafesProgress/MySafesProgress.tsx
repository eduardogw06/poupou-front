import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { isMobile } from "../../../../utils/isMobile";
import { Container } from "./MySafesProgress.styles";

const MySafesProgress = (): JSX.Element => {
  const mobile = isMobile();
  const data = [
    {
      name: "Celular novo",
      savedAmount: 800,
      leftValue: 1400,
      total: 2400,
    },
    {
      name: "Férias",
      savedAmount: 500,
      leftValue: 1500,
      total: 2000,
    },
    {
      name: "Presente filho",
      savedAmount: 3000,
      leftValue: 4400,
      total: 7400,
    },
    {
      name: "Computador novo",
      savedAmount: 300,
      leftValue: 5000,
      total: 5300,
    },
  ];

  return (
    <Container>
      <BarChart
        width={mobile ? 300 : 600}
        height={mobile ? 200 : 300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          tickCount={mobile ? 5 : 10}
          domain={[0, "auto"]}
          dataKey="total"
        />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="savedAmount"
          stackId="a"
          name="Total aportado"
          fill="#FA58B6"
        />
        <Bar dataKey="leftValue" stackId="a" name="Restante" fill="#270082" />
      </BarChart>
    </Container>
  );
};

export default MySafesProgress;
