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
import { Container, CustomTooltipContainer } from "./MySafesProgress.styles";
import { IGetTarget } from "../../../../types/IGetTarget";
import { useEffect, useState } from "react";
import {
  CustomTooltip,
  IMySafeProgressChartData,
} from "../../../../types/IMySafeProgressChartData";
import { numberToReal } from "../../../../utils/numberToReal";

interface MySafesProgressProps {
  targets: IGetTarget[] | [];
}

const MySafesProgress = ({ targets }: MySafesProgressProps): JSX.Element => {
  const mobile = isMobile();
  const [chartData, setChartData] = useState<any>([]);

  useEffect((): void => {
    const getChartData = targets.map(
      (target: IGetTarget): IMySafeProgressChartData => {
        return {
          description: target.description,
          totalSaved: Number(target.total_saved),
          leftAmount: Number(target.target_amount) - Number(target.total_saved),
          total: Number(target.target_amount),
        };
      }
    );

    setChartData(getChartData);
  }, [targets]);

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: CustomTooltip): JSX.Element => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
        <CustomTooltipContainer>
          <p>{data.description}</p>
          <p>Total aportado: {numberToReal(data.totalSaved)}</p>
          <p>Restante: {numberToReal(data.leftAmount)}</p>
          <p>Total: {numberToReal(data.total)}</p>
        </CustomTooltipContainer>
      );
    }

    return null;
  };

  return (
    <Container>
      {chartData.length > 0 && (
        <BarChart
          width={mobile ? 300 : 600}
          height={mobile ? 200 : 300}
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="description" />
          <YAxis
            tickCount={mobile ? 5 : 10}
            domain={[0, "auto"]}
            dataKey="total"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey="totalSaved"
            stackId="a"
            name="Total aportado"
            fill="#FA58B6"
          />
          <Bar
            dataKey="leftAmount"
            stackId="a"
            name="Restante"
            fill="#270082"
          />
        </BarChart>
      )}
    </Container>
  );
};

export default MySafesProgress;
