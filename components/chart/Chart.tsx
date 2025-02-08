import { PieChart, BarChart } from "react-native-chart-kit"
import { _Container, _padContainer, _padL, _widthContainer, _widthContainerWithPad, _ContainerWithTitle } from "../ultis";


const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43]
    }
  ]
};

const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 0.5,
  backgroundColor: "white",
  color: (opacity = 1) => `rgba(0, 0, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

export default function Chart() {
  return (
    <_ContainerWithTitle title="Thông số">
      <BarChart
        yAxisSuffix=""
        data={data}
        width={_widthContainerWithPad}
        height={220}
        yAxisLabel="$"
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />
    </_ContainerWithTitle>
  )
}