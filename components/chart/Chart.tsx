import { PieChart, BarChart } from "react-native-chart-kit"
import { _Container, _padContainer, _padL, _widthContainer, _widthContainerWithPad, _ContainerWithTitle, getDataFromStorage } from "../ultis";
import { Emotions, EmotionsStorage } from "../home/EmotionData";


const data = {
  labels: Emotions.map(emotion => emotion.icon),
  datasets: [
    {
      data: (() => {
        const result = [0, 0, 0, 0, 0]
        var emotions: EmotionsStorage[]
        (async () => {
          emotions = (await getDataFromStorage<EmotionsStorage[]>('emotions'))!
          if (emotions) {
            emotions.map((emotion, index) => {
              result[emotion.index] += 1
            })
          }
        })()

        // result = [0, 0, 0, 0, 0]
        // console.log(result)
        return result
      })()
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
  strokeWidth: 5, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional,
  propsForLabels: {
    fontSize: 18, // 👈 Adjust font size here
    fontWeight: "bold"
  },
  decimalPlaces: 0,
  fromZero: true
};

export default function Chart() {
  return (
    <_ContainerWithTitle title="Thông số">
      <BarChart
        yAxisSuffix=""
        yAxisLabel=""
        yLabelsOffset={15}
        // withHorizontalLabels={false}
        data={data}
        width={_widthContainerWithPad}
        height={220}
        chartConfig={chartConfig}
        showValuesOnTopOfBars={true}
      />
    </_ContainerWithTitle>
  )
}