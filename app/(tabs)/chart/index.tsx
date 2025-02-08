import Chart from "@/components/chart/Chart";
import Scores from "@/components/chart/Scores";
import { _Layout, _Text } from "@/components/ultis";

export default function ChartScreen() {
  return (
    <_Layout>
      <Chart />
      <Scores />
    </_Layout>
  )
}